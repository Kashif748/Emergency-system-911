import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentsService } from '../../../../../_metronic/core/services/incidents.service';
import { GenericValidators } from '@shared/validators/generic-validators';
import { Dialog } from 'primeng/dialog';
import { ActivatedRoute } from '@angular/router';
import { MapComponent } from '@shared/sh-components/map/map.component';
import { MapViewType } from '@shared/components/map/utils/MapViewType';
import { LocationTypeAction, LocationTypeState } from '@core/states';
import { Select, Store } from '@ngxs/store';
import { FormUtils } from '@core/utils';
import { Observable, Subject } from 'rxjs';
import { BcLocationTypes } from 'src/app/api/models';
import { BrowseLocationsAction } from '../../states/browse-locations.action';
import {
  auditTime,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { LocationsState } from '@core/states/bc-setup/locations/locations.state';
import { IAuthService } from '@core/services/auth.service';
import { AddressSearchResultModel } from '@shared/sh-components/map/utils/map.models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.scss'],
})
export class LocationDialogComponent implements OnInit, OnDestroy {
  @Input() asDialog: boolean = true;

  @Select(LocationTypeState.page)
  public locationTypes$: Observable<BcLocationTypes[]>;

  viewOnly$: Observable<boolean>;

  @Select(LocationsState.blocking)
  blocking$: Observable<boolean>;

  @ViewChild(Dialog) dialog: Dialog;

  private defaultFormValue: { [key: string]: any } = {};
  private auditLoadTypes$ = new Subject<string>();

  @ViewChild('mapContainer', { read: ViewContainerRef })
  mapContainer: ViewContainerRef;
  mapComponent: MapComponent;

  opened$: Observable<boolean>;

  // variable
  public display = false;
  form: FormGroup;

  _locationId: number;

  destroy$ = new Subject();

  get editMode() {
    return this._locationId !== undefined && this._locationId !== null;
  }

  get loggedinUserId() {
    return this.auth.getClaim('orgId');
  }
  @Input()
  set locationId(v: number) {
    this._locationId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      this.defaultFormValue = null;
      return;
    }
    this.store
      .dispatch(new BrowseLocationsAction.GetLocation({ id: v }))
      .pipe(
        switchMap(() => this.store.select(LocationsState.location)),
        takeUntil(this.destroy$),
        take(1),
        tap((location) => {
          this.form.patchValue({
            ...location,
          });
          this.defaultFormValue = location;
        })
      )
      .subscribe();
  }
  constructor(
    private formBuilder: FormBuilder,
    protected cdr: ChangeDetectorRef,
    protected incidentService: IncidentsService,
    private route: ActivatedRoute,
    private injector: Injector,
    private store: Store,
    private cfr: ComponentFactoryResolver,
    private auth: IAuthService,
    private translate: TranslateService
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.locationId = id;
      });
    this.viewOnly$ = this.route.queryParams.pipe(
      map((params) => params['_mode'] === 'viewonly'),
      tap((v) => {
        if (this.form) {
          try {
            if (v) {
              this.form.disable();
            } else {
              this.form.enable();
            }
          } catch {}
        }
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(new LocationTypeAction.LoadPage({ page: 0, size: 50 }));
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
    this.buildForm();
    if (!this.dialog) {
      this.initMap();
    }

    this.auditLoadTypes$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((searchText) => {
        this.store.dispatch(
          new LocationTypeAction.LoadPage({
            filters: { searchText },
            page: 0,
            size: 50,
          })
        );
      });
  }

  loadTypes(searchText?: string, direct = false, id?: number) {
    if (direct) {
      this.store.dispatch(
        new LocationTypeAction.LoadPage({
          filters: { searchText },
          page: 0,
          size: 50,
        })
      );
      return;
    }
    this.auditLoadTypes$.next(searchText);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  openDialog(id?: number) {
    this.store.dispatch(
      new BrowseLocationsAction.ToggleDialog({ locationId: id })
    );
  }

  initMap() {
    setTimeout(() => {
      this.mapContainer?.clear();
      this.mapComponent = undefined;
      this.loadMapComponent();
    }, 500);
  }
  buildForm() {
    this.form = this.formBuilder.group({
      nameEn: [null, [Validators.required, GenericValidators.english]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      locationType: [null, [Validators.required]],
      zone: [null, [Validators.required]],
      sector: [null, [Validators.required]],
      district: [],
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      isActive: true,
    });
  }
  close() {
    this.store.dispatch(new BrowseLocationsAction.ToggleDialog({}));
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const location = {
      ...this.form.getRawValue(),
      orgStructure: {
        id: this.loggedinUserId,
      },
      district: null,
    };

    if (this.editMode) {
      location.id = this._locationId;
      this.store.dispatch(new BrowseLocationsAction.UpdateLocation(location));
    } else {
      this.store.dispatch(new BrowseLocationsAction.CreateLocation(location));
    }
  }

  async loadMapComponent() {
    if (this.mapComponent) return;

    this.mapContainer?.clear();
    const { MapComponent } = await import(
      '@shared/sh-components/map/map.component'
    );
    const factory = this.cfr.resolveComponentFactory(MapComponent);

    const { instance, changeDetectorRef: cdr } =
      this.mapContainer.createComponent(factory, null, this.injector);

    const locationObj = this.store.selectSnapshot(LocationsState.location);
    let addressPointLocation: AddressSearchResultModel = null;
    // const taskLocation = task.featureName;
    if (this.editMode && locationObj) {
      addressPointLocation = {
        Lat: parseFloat(locationObj.latitude),
        Lng: parseFloat(locationObj.longitude),
        Address: '',
      };
    }
    (instance.title = this.translate.instant('LOCATIONS.LOCATION_TITLE')),
      (instance.config = {
        mapType: MapViewType.REPORTER,
        showSaveButton: false,
        viewOnly: this.editMode,
        pointLocation: addressPointLocation,
        // zoomModel: {
        //   referenceId: locationObj?.id,
        //   featureName: MapActionType.ASSET_POINT,
        // },
        showLayers: false,
      });

    instance.OnSaveMap.subscribe((response) => {
      if (response) {
        this.form.patchValue({
          ...this.form.value,
          longitude: response?.pointCoordinates?.longitude,
          latitude: response?.pointCoordinates?.latitude,
          sector: response?.locationInfo.COMMUNITYID,
          zone: response?.locationInfo.DISTRICTID,
          district:
            this.translate.currentLang == 'ar'
              ? response?.locationInfo.DISTRICTARA
              : response?.locationInfo.DISTRICTNAMEENG,
        });
      }
      cdr.detectChanges();
    });

    this.mapComponent = instance;
    cdr.detectChanges();
  }

  clear() {
    this.initMap();
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    this.cdr.detectChanges();
  }
}
