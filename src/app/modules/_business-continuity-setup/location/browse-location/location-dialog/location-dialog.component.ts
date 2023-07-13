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
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { LocationsState } from '@core/states/bc-setup/locations/locations.state';
import { IAuthService } from '@core/services/auth.service';
import { AddressSearchResultModel } from '@shared/sh-components/map/utils/map.models';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.scss'],
})
export class LocationDialogComponent implements OnInit, OnDestroy {
  @Select(LocationTypeState.page)
  public locationTypes$: Observable<BcLocationTypes[]>;

  @ViewChild(Dialog) dialog: Dialog;
  public get asDialog() {
    return this.route.component !== LocationDialogComponent;
  }
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
    private auth: IAuthService
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.locationId = id;
      });
  }

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
    this.buildForm();

    this.store.dispatch(
      new LocationTypeAction.LoadPage({
        page: 0,
        size: 40,
      })
    );
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
    console.log(this.mapContainer);

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
    console.log(this.form.value);

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
    };

    console.log(location);

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

    instance.config = {
      mapType: MapViewType.REPORTER,
      showSaveButton: false,
      viewOnly: false,
      pointLocation: addressPointLocation,
      // zoomModel: {
      //   referenceId: locationObj?.id,
      //   featureName: MapActionType.ASSET_POINT,
      // },
      showLayers: false,
    };

    instance.OnSaveMap.subscribe((response) => {
      console.log(response);

      if (response) {
        this.form.patchValue({
          ...this.form.value,
          longitude: response?.pointCoordinates?.longitude,
          latitude: response?.pointCoordinates?.latitude,
          sector: response?.locationInfo.COMMUNITYID,
          zone: response?.locationInfo.DISTRICTID,
          district: response?.locationInfo.DISTRICTARA,
        });
      }
      cdr.detectChanges();
    });

    this.mapComponent = instance;
    cdr.detectChanges();
  }
}
