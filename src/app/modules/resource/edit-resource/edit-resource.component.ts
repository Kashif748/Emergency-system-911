import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IStorageService } from '@core/services/storage.service';
import { RoleService } from '@core/api/services/role.service';

import { Observable, Subscription } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { OrgService } from '@core/api/services/org.service';
import { AssetsService } from 'src/app/_metronic/core/services/sources.service';

import { EventsManagementService } from '../../events-management/events-management.service';
import { TranslationService } from '../../i18n/translation.service';
import { CategoryService } from './../../../_metronic/core/services/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditResourceFormField } from '../resource.model';
import { Direction, Directionality } from '@angular/cdk/bidi';
import * as _ from 'lodash';
import { MapViewType } from '@shared/components/map/utils/MapViewType';
import { MapActionType } from '@shared/components/map/utils/MapActionType';
import { MapService } from '@shared/components/map/services/map.service';
import { AddressSearchResultModel } from '@shared/components/map/utils/map.models';
import { FilesListComponent } from '@shared/attachments-list/files-list/files-list.component';
import {AlertsService} from "../../../_metronic/core/services/alerts.service";

export interface AssetCategory {
  color?: string;
  icon?: string;
  id: number;
  isActive?: boolean;
  nameAr: string;
  nameEn: string;
  organization?: { id: number };
  assetsMainCategory?: AssetMainCategory;
}

export interface AssetMainCategory {
  id: number;
  nameAr: string;
  nameEn: string;
  isActive: boolean;
  children?: AssetCategory[];
}

export interface Resource {
  assetGroup: any;
  availableQuantity: number;
  category: any;
  createdDate: string;
  description: string;
  location: string;
  id: number;
  lastUpdateDate: string;
  measuringType: string;
  nameAr: string;
  nameEn: string;
  organization: any;
  quantity: number;
  serialNo: number;
}
@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.scss'],
})
export class EditResourceComponent implements OnInit, OnDestroy {
  // UI
  @ViewChild('filesList') filesList: FilesListComponent;
  appearancetype = 'outline';
  loading = false;
  form: FormGroup;
  lang: string;
  categories$: Observable<any[]>;
  public orgs$: Observable<any>;
  assets$: Observable<any[]>;
  currentOrg: any;
  currentItem: any;
  id: any;
  EditResourceFormFields = EditResourceFormField;
  subscriptions: Subscription[] = [];
  types = [
    { nameAr: 'عدد', nameEn: 'count', id: 1 },
    { nameAr: 'أوزان', nameEn: 'weight', id: 2 },
    { nameAr: 'حجم', nameEn: 'size', id: 3 },
  ];
  assetMainCategories: AssetMainCategory[] = [];
  addressPointLocation: AddressSearchResultModel = null;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private translationService: TranslationService,
    private assetsService: AssetsService,
    private catService: CategoryService,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private storageService: IStorageService,
    private _service: EventsManagementService,
    private snackBar: MatSnackBar,
    private mapService: MapService,
    private cd: ChangeDetectorRef,
    public dir: Directionality,
    public alert: AlertsService,
    private organizationService: OrgService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();

    this.categories$ = this.catService.categories();
    this.currentOrg =
      this.storageService.getItem('commonData')?.currentOrgDetails;
    this.orgs$ = this.roleService
      .getOrgById(this.currentOrg?.id)
      .pipe(map((r) => r.result));

    this.assets$ = this._service
      .getResourseGroup()
      .pipe(map((data) => data.result.content));
    const assetCategories = this.storageService.getItem('commonData')
      ?.assetsCategory as AssetCategory[];
    this.assetMainCategories = _.uniqBy(
      assetCategories.map((v) => v.assetsMainCategory),
      'id'
    ) as AssetMainCategory[];
/*    this.assetMainCategories.forEach((v) => {
      v.children = assetCategories
        .filter(
          (vChild) => vChild.assetsMainCategory.id == v.id && vChild.isActive
        )
        .map((v) => {
          return { id: v.id, nameAr: v.nameAr, nameEn: v.nameEn };
        });
    });*/
    this.id = this.route.snapshot.params.id;
    if (this.id == undefined) {
      this.id = 0;
    }
    if (this.id) {
      this.currentItem = this.assetsService.getSourceItemLocal(this.id);
      this.assetMainCategories.forEach((v) => {
        v.children = [];
        if (v.id === this.currentItem.category?.assetsMainCategory?.id) {
          v.children = assetCategories
            .filter(
              (vChild) => vChild.assetsMainCategory.id == v.id && vChild.isActive
            )
            .map((v) => {
              return { id: v.id, nameAr: v.nameAr, nameEn: v.nameEn };
            });
        }
      });
      if (this.currentItem) {
        let obj = {
          category: this.currentItem.category?.id,
          main_category: this.currentItem.category?.assetsMainCategory?.id,
          nameEn: this.currentItem.nameEn,
          nameAr: this.currentItem.nameAr,
          quantity: this.currentItem.quantity,
          measuringType: this.currentItem.assetMeasuringType.nameEn,
          description: this.currentItem.description,
          id: this.currentItem?.id,
          serialNo: this.currentItem?.serialNo,
          organization: { id: this.currentItem.organization?.id },
          assetsGroup: { id: this.currentItem?.asset?.id },
          isSameOrgLocation: this.currentItem.isSameOrgLocation,
          location: this.currentItem?.location
            ? this.extractLocation(this.currentItem)
            : null,
        };
        if (obj.location) {
          this.form
            .get(EditResourceFormField.LOCATION)
            .patchValue(obj?.location);
          this.form
            .get(EditResourceFormField.IS_LOCATION_SELECTED)
            .patchValue(true);
          // this.form
          //   .get(EditResourceFormField.HAS_SAME_ORGANIZATION_LOCATION)
          //   .patchValue(false);
        }
        this.form.patchValue(obj);
      }
    }

    // this.onChangeOrganization();
    this.subscriptions.push(
      this.form
        .get(EditResourceFormField.HAS_SAME_ORGANIZATION_LOCATION)
        .valueChanges.subscribe((value) => {
          if (!value) {
            this.form
              .get(EditResourceFormField.LOCATION)
              .setValidators(Validators.required);
          } else {
            this.form.get(EditResourceFormField.LOCATION).clearValidators();
          }
          this.form
            .get(EditResourceFormField.LOCATION)
            .updateValueAndValidity();
          this.form.updateValueAndValidity();
        })
    );
  }

  mainOrgChange(value) {
    const assetCategories = this.storageService.getItem('commonData')
      ?.assetsCategory as AssetCategory[];
    const id = this.form.get(this.EditResourceFormFields.MAIN_CATEGORY).value;
    this.assetMainCategories.forEach((v) => {
      v.children = [];
      if (v.id === id) {
        v.children = assetCategories
          .filter(
            (vChild) => vChild.assetsMainCategory.id == v.id && vChild.isActive
          )
          .map((v) => {
            return { id: v.id, nameAr: v.nameAr, nameEn: v.nameEn };
          });
      }
    });
  }

  createForm() {
    this.form = this.fb.group({
      [EditResourceFormField.CATEGORY]: [null, Validators.required],
      [EditResourceFormField.MAIN_CATEGORY]: [null, Validators.required],
      [EditResourceFormField.NAME_EN]: [null, Validators.required],
      [EditResourceFormField.NAME_AR]: [null, Validators.required],
      [EditResourceFormField.SERIAL_NUMBER]: [null],
      [EditResourceFormField.QUANTITY]: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      ],
      [EditResourceFormField.MEASURING_TYPE]: [null, Validators.required],
      [EditResourceFormField.DESCRIPTION]: [null, Validators.required],
      [EditResourceFormField.ID]: [
        null,
        [Validators.pattern('^[A-Za-z0-9]+$')],
      ],
      [EditResourceFormField.ORGANIZATION]: this.fb.group({
        [EditResourceFormField.ID]: [null, Validators.required],
      }),
      [EditResourceFormField.ASSETS_GROUP]: this.fb.group({
        [EditResourceFormField.ID]: [null],
      }),
      [EditResourceFormField.HAS_SAME_ORGANIZATION_LOCATION]: [true],
      [EditResourceFormField.LOCATION]: [null],
      [EditResourceFormField.IS_LOCATION_SELECTED]: [false],
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  onChangeOrganization() {
    let s = this.form
      .get(EditResourceFormField.ORGANIZATION)
      .valueChanges.pipe(
        tap((v) => console.log('org id', v)),
        mergeMap((v) => this.organizationService.getById(v?.id))
      )
      .subscribe((org) => {
        if (org?.location) {
          const [latitude, longitude] = org?.location['text']
            .replace('POINT (', '')
            .replace(')', '')
            .split(' ');
          const location = `POINT(${latitude} ${longitude})`;
          this.form.get(EditResourceFormField.LOCATION).patchValue(location);
          this.addressPointLocation.Lat = latitude;
          this.addressPointLocation.Lng = longitude;
        }
      });
    this.subscriptions.push(s);
  }

  extractLocation(item: any) {
    const [latitude, longitude] = item?.location['text']
      .replace('POINT (', '')
      .replace(')', '')
      .split(' ');
    const location = `POINT(${latitude} ${longitude})`;
    this.addressPointLocation = { Lat: latitude, Lng: longitude, Address: '' };
    return location;
  }

  editCheckBox(value) {
    if (!value.checked) {
      this.alert.customWarningSnackBar(this.lang === 'en' ? 'Please choose a new location' : 'الرجاء اختيار موقع جديد' );
    }
  }

  onSubmit() {
    this.form
      .get(EditResourceFormField.CATEGORY)
      .patchValue({ id: this.form.value.category });
    // const orgLocation = this.currentOrg.location;
    // if (
    //   this.form.get(EditResourceFormField.HAS_SAME_ORGANIZATION_LOCATION).value
    // ) {
    //   this.form
    //     .get(EditResourceFormField.LOCATION)
    //     .patchValue(orgLocation?.text);
    // }
    // let measure = { nameEn: this.form.value.measuringType };
    // this.form.value.measuringType = measure;

    this.form.value?.assetsGroup?.id
      ? this.form.value?.assetsGroup?.id
      : (this.form.value.assetsGroup = null);
    let resource = this.form.value as Resource;

    delete resource[EditResourceFormField.IS_LOCATION_SELECTED];
    resource['geometryLocation'] = resource.location;
    delete resource['location'];
    this.loading = true;

    if (!this.id) {
      this.assetsService.create(resource).subscribe(async (x) => {
        await this.filesList?.upload(x?.id ,true);
        this.loading = false;
        this.location.back();
      });
    } else {
      this.assetsService.update(resource).subscribe(async (x) => {
        await this.filesList?.upload(this.id ,false);
        this.loading = false;
        this.location.back();
      });
    }
  }

  backClicked() {
    this.location.back();
  }

  onNewLocationChange(event) {
    this.subscriptions.push(
      this.mapService
        .openMap({
          mapType: MapViewType.ASSET,
          zoomModel: {
            referenceId: this.id,
            featureName: MapActionType.ASSET_POINT,
          },
          showLayers: false,
          showLocInfo: true,
          viewOnly: false,
          pointLocation: this.addressPointLocation,
        })
        .subscribe((response) => {
          const location = `POINT(${response.pointCoordinates.latitude} ${response.pointCoordinates.longitude})`;
          this.form.get(EditResourceFormField.LOCATION).patchValue(location);

          if (response) {
            this.form
              .get(EditResourceFormField.IS_LOCATION_SELECTED)
              .patchValue(true);
          }
          this.cd.detectChanges();
        })
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptions?.length)
      this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
