import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ILangFacade } from '@core/facades/lang.facade';
import { GisAction } from '@core/states/gis/gis.action';
import { GisState } from '@core/states/gis/gis.state';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import {
  filter,
  first,
  map,
  pairwise,
  skip,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { OrgMapGisLayer } from 'src/app/api/models/org-map-gis-layer';
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

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  @Select(GisState.layersPage)
  public layersPage$: Observable<OrgMapGisLayer[]>;
  selectedLayer = new FormControl(null);
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
  public lang = 'en';
  searchControl = new FormControl();
  selectMControl = new FormControl('');
  selectDControl = new FormControl('');
  selectSControl = new FormControl('');
  selectRControl = new FormControl('');
  selectPControl = new FormControl('');

  filteredOptions: Observable<AddressSearchResultModel[]>;

  ngOnInit() {
    this.lang = this.langFacade.stateSanpshot?.ActiveLang?.key;
    this.filteredOptions = this.searchControl.valueChanges.pipe(
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
        map((value) => value as [OrgMapGisLayer]),
        pairwise(),
        map(([oldValue, newValue]) => {
          if (newValue.length > oldValue.length) {
            newValue.forEach((layer) => {
              if (oldValue.indexOf(layer) == -1) {
                const layerFeature = {
                  url: `${layer.url}/${layer.layerId}`,
                  id: layer.id,
                  layerId: layer.layerId,
                };
                this.map.addLayer(layerFeature);
              }
            });
          } else {
            oldValue.forEach((layer) => {
              if (newValue.indexOf(layer) == -1)
                this.map.removeLayer(layer?.id);
            });
          }
        })
      )
      .subscribe();
  }
  displayWith(value) {
    return value?.Address;
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

  public optionsD = [];
  async selectM(municipality) {
    this.selectDControl.setValue('');
    this.selectSControl.setValue('');
    this.selectPControl.setValue('');
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

  public optionsS = [];
  async selectD(district) {
    this.selectSControl.setValue('');
    this.selectPControl.setValue('');

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
        this.selectMControl.value == 'AAM' ? 'COMMUNITYID' : 'COMMUNITYNAMEENG',
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

  public optionsP = [];
  async selectS(sector: string) {
    const isAAM = this.selectMControl.value == 'AAM';

    this.selectPControl.setValue('');
    this.selectRControl.setValue('');

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
        this.selectMControl.value
      }' AND UPPER(DISTRICTENG) = '${
        this.selectDControl.value
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

  public optionsR = [];
  async selectR(road) {
    this.optionsP = [];
    this.selectPControl.setValue('');
    if (road) {
      // ----------------------- load next cascading dropdown options ---------------------------
      const queryTask = this.map.createQueryTask(
        DZSP_SEARCH_URL + DZSP_ID_PLOT
      );
      const query = this.map.createQuery();
      query.where = `MUNICIPALITYENG = '${
        this.selectMControl.value
      }' AND UPPER(DISTRICTENG) = '${
        this.selectDControl.value
      }' AND UPPER(COMMUNITYENG) = '${this.selectSControl.value.toUpperCase()}' AND ROADID = ${road}`;
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
    const isAAM = this.selectMControl.value == 'AAM';

    if (plot) {
      // ----------------------- zoom to plot --------------------------------------------
      this.map.DZSP_GRAPHICS_LAYER.removeAll();
      const pQueryTask = this.map.createQueryTask(
        DZSP_SEARCH_URL + DZSP_ID_PLOT
      );
      const pQuery = this.map.createQuery();
      pQuery.where = `MUNICIPALITYENG = '${
        this.selectMControl.value
      }' AND UPPER(DISTRICTENG) = '${
        this.selectDControl.value
      }' AND UPPER(COMMUNITYENG) = '${this.selectSControl.value.toUpperCase()}' ${
        isAAM ? 'AND ROADID = ' + this.selectRControl.value : ''
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
    this.selectDControl.reset();
    this.selectMControl.reset();
    this.selectPControl.reset();
    this.selectRControl.reset();
    this.selectSControl.reset();
    this.ngOnInit();
    // center: [53.8248, 24.0088],
    // zoom: 8,
    //24.2159697,54.0221061
    this.map.initializeMap();
  }
}
