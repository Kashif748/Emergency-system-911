import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ILangFacade } from '@core/facades/lang.facade';
import { Observable, of, Subject } from 'rxjs';
import {
  filter,
  map,
  pairwise,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { MapComponent } from '../map.component';
import { MapService } from '../services/map.service';
import {
  AddressSearchResultModel,
  DZSP_ID_COMMUNITY,
  DZSP_ID_DISTRICT,
  DZSP_ID_MUNICIPALITY,
  DZSP_ID_PLOT,
  DZSP_SEARCH_URL,
} from '../utils/map.models';
import { SelectItem } from 'primeng/api';
import { OrgMapGisLayer } from 'src/app/api/models/org-map-gis-layer';
import { Select, Store } from '@ngxs/store';
import { GisState } from '@core/states/gis/gis.state';
import { GisAction } from '@core/states/gis/gis.action';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  /**
   *
   */
  constructor(
    @Inject(forwardRef(() => MapComponent)) public map: MapComponent,
    private mapService: MapService,
    private cdr: ChangeDetectorRef,
    private langFacade: ILangFacade,
    private store: Store
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  public lang = 'en';
  searchControl = new FormControl();
  selectedLayer = new FormControl(null);

  public optionsM: SelectItem[] = [
    { value: 'ADM', label: 'SHARED.ADM' },
    { value: 'AAM', label: 'SHARED.AAM' },
    { value: 'WRM', label: 'SHARED.DRM' },
  ];
  public optionsD = [];
  public optionsS = [];
  public optionsP = [];
  public optionsR = [];

  public selectedM: SelectItem;
  public selectedD: { name: string; DISTRICTID: string; NAMEENGLISH: string };
  public selectedS: {
    name: string;
    COMMUNITYID: string;
    COMMUNITYNAMEENG: string;
  };
  public selectedR: string;
  public selectedP: { PLOTNUMBER: string };

  filteredOptions: Observable<AddressSearchResultModel[]>;
  @Select(GisState.layersPage)
  public layersPage$: Observable<OrgMapGisLayer[]>;

  ngOnInit() {
    this.lang = this.langFacade.stateSanpshot?.ActiveLang?.key;
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      tap((v: AddressSearchResultModel) => {
        if (!!v && typeof v === 'object') {
          this.map.zoomToAddress(v);
        }
      }),
      filter((v) => (v as any)?.length > 2),
      switchMap((value) => this._filter(value as any))
    );

    this.store.dispatch([
      new GisAction.LoadLayers({
        page: 0,
        size: 10,
      }),
    ]);
    this.selectedLayer.valueChanges
      .pipe(
        startWith([]),
        takeUntil(this.destroy$),
        map((value) => value as [OrgMapGisLayer]),
        pairwise(),
        map(([oldValue, newValue]) => {
          if (newValue.length > oldValue.length) {
            newValue.forEach((layer) => {
              if (oldValue.indexOf(layer) == -1) {
                const layerFeature = {
                  url: `${layer.url}/${layer.layerId}`,
                  id: layer.nameEn.replace(/ /g, '_').toUpperCase(),
                  layerId: layer.layerId,
                };
                this.map.addLayer(layerFeature);
              }
            });
          } else {
            oldValue.forEach((layer) => {
              if (newValue.indexOf(layer) == -1)
                this.map.removeLayer(
                  layer.nameEn.replace(/ /g, '_').toUpperCase()
                );
            });
          }
        })
      )
      .subscribe();
  }

  private _filter(value: string): Observable<AddressSearchResultModel[]> {
    if (typeof value !== 'string') {
      return of([value]);
    }
    const filterValue = value.toLowerCase();

    return this.mapService
      .addressSearch(filterValue)
      .pipe(map((r) => r as AddressSearchResultModel[]));
  }

  async selectM(municipality) {
    this.selectedD = null;
    this.selectedS = null;
    this.selectedP = null;
    this.optionsD = [];
    this.optionsS = [];
    this.optionsR = [];
    this.optionsP = [];
    if (municipality) {
      // ----------------------- zoom to municiplity --------------------------------------------
      this.map.DZSP_GRAPHICS_LAYER.removeAll();
      try {
        const mQueryTask = this.map.createQueryTask(
          DZSP_SEARCH_URL + DZSP_ID_MUNICIPALITY
        );
        const mQuery = this.map.createQuery();
        mQuery.where = `MUNICIPALITYNAME='${municipality}'`;
        mQuery.returnGeometry = true;
        const mResult = await mQueryTask.execute(mQuery);
        this.map.DZSP_GRAPHICS_LAYER.addMany(
          mResult.features.map((f) => {
            f.symbol = {
              type: 'simple-fill',
              style: 'diagonal-cross',
              color: [0, 0, 0, 0.1],
              outline: { color: [0, 255, 0], width: 1 },
            } as any;
            return f;
          })
        );
        this.map.mapView
          .goTo(mResult.features, { animate: true, duration: 1000 })
          .then(() => {
            this.map.mapView.goTo(this.map.mapView.extent.expand(0.7));
          });
      } catch {}
      // ----------------------- load next cascading dropdown options ---------------------------
      const queryTask = this.map.createQueryTask(
        DZSP_SEARCH_URL + DZSP_ID_DISTRICT
      );
      const query = this.map.createQuery();
      query.where = `MUNICIPALITYNAME='${municipality}'`;
      query.outFields = ['OBJECTID', 'DISTRICTID', 'NAMEENGLISH', 'NAMEARABIC'];
      query.returnGeometry = false;
      query.orderByFields = [
        municipality != 'AAM' ? 'NAMEENGLISH' : 'DISTRICTID',
      ];
      const result = await queryTask.execute(query);
      this.optionsD = result.features.map((f) => {
        return {
          ...f.attributes,
          name:
            (this.lang == 'en'
              ? f.attributes['NAMEENGLISH']
              : f.attributes['NAMEARABIC']) ?? '',
        };
      });
      this.cdr.detectChanges();
    }
  }

  async selectD(district) {
    this.selectedS = null;
    this.selectedP = null;

    this.optionsS = [];
    this.optionsR = [];
    this.optionsP = [];
    if (district) {
      // ----------------------- zoom to district --------------------------------------------
      this.map.DZSP_GRAPHICS_LAYER.removeAll();
      const dQueryTask = this.map.createQueryTask(
        DZSP_SEARCH_URL + DZSP_ID_DISTRICT
      );
      const dQuery = this.map.createQuery();
      dQuery.where = `UPPER(NAMEENGLISH) = '${district
        ?.replace("'", "''")
        .toUpperCase()}'`;
      dQuery.returnGeometry = true;
      const dResult = await dQueryTask.execute(dQuery);
      this.map.DZSP_GRAPHICS_LAYER.addMany(
        dResult.features.map((f) => {
          f.symbol = {
            type: 'simple-fill',
            style: 'diagonal-cross',
            color: [0, 0, 0, 0.1] as any,
            outline: { color: [0, 255, 0], width: 1 },
          } as any;
          return f;
        })
      );
      this.map.mapView
        .goTo(dResult.features, { animate: true, duration: 1000 })
        .then(() => {
          this.map.mapView.goTo(this.map.mapView.extent.expand(0.7));
        });

      // ----------------------- load next cascading dropdown options ---------------------------
      const queryTask = this.map.createQueryTask(
        DZSP_SEARCH_URL + DZSP_ID_COMMUNITY
      );
      const query = this.map.createQuery();
      query.where = `DISTRICTNAMEENG='${district}'`;
      query.outFields = [
        'OBJECTID',
        'COMMUNITYID',
        'COMMUNITYNAMEENG',
        'COMMUNITYNAMEARA',
      ];
      query.returnGeometry = false;
      query.orderByFields = [
        this.selectedM?.value == 'AAM' ? 'COMMUNITYID' : 'COMMUNITYNAMEENG',
      ];
      const result = await queryTask.execute(query);
      this.optionsS = result.features.map((f) => {
        return {
          ...f.attributes,
          name:
            (this.lang == 'en'
              ? f.attributes['COMMUNITYNAMEENG']
              : f.attributes['COMMUNITYNAMEARA']) ?? '',
        };
      });
      this.cdr.detectChanges();
    }
  }

  async selectS(sector: string) {
    const isAAM = this.selectedM?.value == 'AAM';
    this.selectedP = null;
    this.selectedR = null;

    this.optionsR = [];
    this.optionsP = [];
    if (sector) {
      // ----------------------- zoom to sector --------------------------------------------

      this.map.DZSP_GRAPHICS_LAYER.removeAll();
      const sQueryTask = this.map.createQueryTask(
        DZSP_SEARCH_URL + DZSP_ID_COMMUNITY
      );
      const sQuery = this.map.createQuery();
      sQuery.where = `COMMUNITYNAMEENG = '${sector}'`;
      sQuery.returnGeometry = true;
      const sResult = await sQueryTask.execute(sQuery);
      this.map.DZSP_GRAPHICS_LAYER.addMany(
        sResult.features.map((f) => {
          f.symbol = {
            type: 'simple-fill',
            style: 'diagonal-cross',
            color: [0, 0, 0, 0.1] as any,
            outline: { color: [0, 255, 0], width: 1 },
          } as any;
          return f;
        })
      );
      this.map.mapView
        .goTo(sResult.features, { animate: true, duration: 1000 })
        .then(() => {
          this.map.mapView.goTo(this.map.mapView.extent.expand(0.7));
        });
      // ----------------------- load next cascading dropdown options ---------------------------
      const queryTask = this.map.createQueryTask(
        DZSP_SEARCH_URL + DZSP_ID_PLOT
      );
      const query = this.map.createQuery();

      query.where = `MUNICIPALITYENG = '${
        this.selectedM?.value
      }' AND UPPER(DISTRICTENG) = '${
        this.selectedD?.NAMEENGLISH
      }' AND UPPER(COMMUNITYENG) = '${sector.toUpperCase()}' ${
        isAAM ? '' : 'AND ROADID = 0'
      }`;
      query.outFields = isAAM
        ? ['ROADID']
        : ['OBJECTID', 'PLOTNUMBER', 'FLAT_ID'];
      query.returnGeometry = false;
      query.orderByFields = isAAM ? ['ROADID'] : ['PLOTNUMBER', 'FLAT_ID'];
      query.returnDistinctValues = true;
      const result = await queryTask.execute(query);
      if (isAAM) {
        this.optionsR = result.features.map((f) => f.attributes['ROADID']);
      } else {
        this.optionsP = result.features.map((f) => {
          return {
            ...f.attributes,
            name:
              (this.lang == 'en'
                ? f.attributes['COMMUNITYNAMEENG']
                : f.attributes['COMMUNITYNAMEARA']) ?? '',
          };
        });
      }
      this.cdr.detectChanges();
    }
  }

  async selectR(road) {
    this.selectedP = null;
    this.optionsP = [];
    if (road) {
      // ----------------------- load next cascading dropdown options ---------------------------
      const queryTask = this.map.createQueryTask(
        DZSP_SEARCH_URL + DZSP_ID_PLOT
      );
      const query = this.map.createQuery();
      query.where = `MUNICIPALITYENG = '${
        this.selectedM?.value
      }' AND UPPER(DISTRICTENG) = '${
        this.selectedD?.NAMEENGLISH
      }' AND UPPER(COMMUNITYENG) = '${this.selectedS?.COMMUNITYNAMEENG?.toUpperCase()}' AND ROADID = ${road}`;
      query.outFields = ['OBJECTID', 'PLOTNUMBER', 'FLAT_ID'];
      query.returnGeometry = false;
      query.orderByFields = ['PLOTNUMBER', 'FLAT_ID'];
      query.returnDistinctValues = true;
      const result = await queryTask.execute(query);
      this.optionsP = result.features.map((f) => {
        return {
          ...f.attributes,
          name:
            (this.lang == 'en'
              ? f.attributes['COMMUNITYNAMEENG']
              : f.attributes['COMMUNITYNAMEARA']) ?? '',
        };
      });
      this.cdr.detectChanges();
    }
  }

  async selectP(plot: string) {
    const isAAM = this.selectedM?.value == 'AAM';

    if (plot) {
      // ----------------------- zoom to plot --------------------------------------------
      this.map.DZSP_GRAPHICS_LAYER.removeAll();
      const pQueryTask = this.map.createQueryTask(
        DZSP_SEARCH_URL + DZSP_ID_PLOT
      );
      const pQuery = this.map.createQuery();
      pQuery.where = `MUNICIPALITYENG = '${
        this.selectedM?.value
      }' AND UPPER(DISTRICTENG) = '${
        this.selectedD?.NAMEENGLISH
      }' AND UPPER(COMMUNITYENG) = '${this.selectedS?.COMMUNITYNAMEENG?.toUpperCase()}' ${
        isAAM ? 'AND ROADID = ' + this.selectedR : ''
      } AND UPPER(PLOTNUMBER) = '${plot.toUpperCase()}'`;
      pQuery.orderByFields = ['PLOTNUMBER', 'FLAT_ID'];
      pQuery.outFields = ['OBJECTID', 'PLOTNUMBER', 'FLAT_ID'];

      pQuery.returnGeometry = true;
      const pResult = await pQueryTask.execute(pQuery);
      this.map.DZSP_GRAPHICS_LAYER.addMany(
        pResult.features.map((f) => {
          f.symbol = {
            type: 'simple-fill',
            style: 'none' as any,
            color: [0, 0, 0, 0.1] as any,
            outline: { color: [0, 255, 0], width: 1 },
          } as any;
          return f;
        })
      );
      this.map.mapView
        .goTo(pResult.features, { animate: true, duration: 1000 })
        .then(() => {
          this.map.mapView.goTo(this.map.mapView.extent.expand(0.7));
        });
    }
  }

  clearSearch() {
    this.searchControl.reset();
    this.selectedD = null;
    this.selectedM = null;
    this.selectedS = null;
    this.selectedP = null;
    this.selectedR = null;
    this.map.initializeMap();
  }
}
