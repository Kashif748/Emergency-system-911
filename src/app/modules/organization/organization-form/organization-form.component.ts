import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IStorageService } from '@core/services/storage.service';
import { CommonService } from '@core/services/common.service';
import { Observable, Subscription } from 'rxjs';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { ModulesService } from 'src/app/_metronic/core/services/modules.service';
import { TradeLicenseService } from 'src/app/_metronic/core/services/trade-license.service';
import { EventsManagementService } from '../../events-management/events-management.service';
import { OrganizationsService } from '../organizations.service';
import { IentityType } from '../models/entityType.interface';
import { JGeometryType, Organization } from '../models/organization.model';
import { EntityTypesService } from '../services/entity-types.service';
import { TranslationService } from '../../i18n/translation.service';
import { catchError, finalize, map, take, tap } from 'rxjs/operators';
import { DefaultCenterAndDivisionModuls, OrgModule } from './data';
import {
  ENTITIY_TYPES_CODES,
  OrganizationFormFields,
} from './organization-form.enum';
import { Directionality } from '@angular/cdk/bidi';
import { ORGANIZATION_DATA_CONSTANTS } from './constants';
import { MapService } from '@shared/components/map/services/map.service';
import { MapViewType } from '@shared/components/map/utils/MapViewType';
import { TaskIncidentGisData } from '@shared/components/map/utils/TaskIncidentGisData';
import { MapActionType } from '@shared/components/map/utils/MapActionType';
import { RegxConst } from '@core/constant/RegxConst';
import { AddressSearchResultModel } from '@shared/components/map/utils/map.models';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss'],
})
export class OrganizationFormComponent implements OnInit {
  // UI
  companyInfo: FormControl;

  // Variables
  uaeMobilePattern = RegxConst.PHONE_REGEX;
  id: number;
  lang: string;
  parentId: number;
  isAddMode: boolean;
  display: boolean;
  form: FormGroup;
  signatureImgUUID: string;
  entityTypes$: Observable<IentityType[]>;
  organizations: Organization[] = [];
  organizationFormConstants = ORGANIZATION_DATA_CONSTANTS;
  areas: Observable<any[]>;
  classifications: Observable<any[]>;
  classificationsData: [] = [];
  centerClassifications: [] = [];
  unitClassifications: [] = [];
  classificationsFinalData: [] = [];
  sectors: Observable<any[]>;
  tempImage: string;
  tradeLicense: string;
  commonData: any;
  org: any;
  useParentLogo = true;
  public tabIndex = 0;
  disabledModulesTab: boolean;
  files: FileList;
  imageUrl: any = null;
  public loading = true;
  public mgmtForm: FormGroup;
  public addLocationToMapFunc: (ref: TaskIncidentGisData) => Promise<void>;
  codeUsed = false;
  organizationFormFields = OrganizationFormFields;
  centerList$: Observable<{ id: number; nameAr: string; nameEn: string }[]>;
  subscriptions: Subscription[] = [];
  entityTypes: { [key: number]: IentityType } = {};
  addressPointLocation: AddressSearchResultModel = null;
  entityTypesCodes = ENTITIY_TYPES_CODES;

  constructor(
    private alertsService: AlertsService,
    private tradeLicenseService: TradeLicenseService,
    private entityTypesService: EntityTypesService,
    private translationService: TranslationService,
    private organizationsService: OrganizationsService,
    private storageService: IStorageService,
    public dialogRef: MatDialogRef<OrganizationFormComponent>,
    public cd: ChangeDetectorRef,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private moduleService: ModulesService,
    public direction: Directionality,
    private eventManagementService: EventsManagementService,
    private mapService: MapService,
    @Inject(MAT_DIALOG_DATA)
    public data: { nodeId: number; type: 'add' | 'edit'; parentId: number }
  ) {}

  buildMgmtForm() {
    return this.formBuilder.group({
      managerId: '2',
      specialistId: '',
    });
  }

  ngOnInit() {
    this.mgmtForm = this.buildMgmtForm();
    this.companyInfo = new FormControl(null, [
      Validators.maxLength(10),
      Validators.minLength(1),
    ]);
    this.commonData = this.commonService.getCommonData();

    this.org = this.commonData?.currentOrgDetails;
    if (this.id != this.org?.id) {
      this.organizationsService.organizationsChanged$.subscribe((data) => {
        this.organizations = data;
      });
    }

    this.areas = this.organizationsService.getAreas();
    this.classifications = this.organizationsService.getClassifications();
    this.sectors = this.organizationsService.getSectors();

    this.entityTypes$ = this.entityTypesService.getAll<IentityType[]>().pipe(
      take(1),
      tap((types) => {
        types.forEach((t) => {
          this.entityTypes[t.id] = t;
        });
      })
    );

    this.centerList$ = this.eventManagementService
      .getCenters()
      .pipe(map((v) => v.result));

    // classification
    this.subscriptions.push(
      this.organizationsService
        .getClassifications()
        .subscribe((data: never) => {
          this.classificationsData = data;

          const centerClass = ['A', 'B', 'C'];
          const unitClass = ['D', 'E', 'F'];

          this.classificationsData.forEach((cls) => {
            if (centerClass.includes(cls[OrganizationFormFields.NAME_EN])) {
              this.centerClassifications.push(cls);
            } else if (
              unitClass.includes(cls[OrganizationFormFields.NAME_EN])
            ) {
              this.unitClassifications.push(cls);
            }
          });
        })
    );

    this.createForm();
    this.disableFields(OrganizationFormFields.INTERNAL);

    if (!this.form.get(OrganizationFormFields.INTERNAL).value) {
      if (this.org?.code != 'ADCDA') {
        this.form
          .get(OrganizationFormFields.OFFICIAL_EMAIL)
          .setValidators([Validators.required, Validators.email]);
        this.disableFields(OrganizationFormFields.INTERNAL);
      } else {
        this.form
          .get(OrganizationFormFields.OFFICIAL_EMAIL)
          .setValidators([Validators.email]);
        this.disableFields(OrganizationFormFields.INTERNAL);
      }
    }
    this.subscriptions.push(
      this.form
        .get(OrganizationFormFields.INTERNAL)
        .valueChanges.subscribe((value) => {
          if (!value) {
            if (this.org?.code != 'ADCDA') {
              this.form
                .get(OrganizationFormFields.OFFICIAL_EMAIL)
                .setValidators([Validators.required, Validators.email]);
              this.disableFields(OrganizationFormFields.INTERNAL);
            } else {
              this.form
                .get(OrganizationFormFields.OFFICIAL_EMAIL)
                .setValidators([Validators.email]);
              this.disableFields(OrganizationFormFields.INTERNAL);
            }
          } else {
            this.form
              .get(OrganizationFormFields.OFFICIAL_EMAIL)
              .setValidators([Validators.email]);
            this.enableFields();
          }
          this.form
            .get(OrganizationFormFields.OFFICIAL_EMAIL)
            .updateValueAndValidity();
        })
    );

    this.subscriptions.push(
      this.form
        .get(OrganizationFormFields.SYSTEM_USER)
        .valueChanges.subscribe((value) => {
          if (value) {
            this.form.get(OrganizationFormFields.LDAP_USER).setValue(false);
          }
        })
    );

    this.subscriptions.push(
      this.form
        .get(OrganizationFormFields.LDAP_USER)
        .valueChanges.subscribe((value) => {
          if (value) {
            this.form.get(OrganizationFormFields.SYSTEM_USER).setValue(false);
          }
        })
    );

    this.lang = (
      this.translationService.getSelectedLanguage() || 'en'
    ).toLowerCase();
    if (this.data.type === 'add') {
      this.isAddMode = this.display = true;
      this.parentId = this.data.nodeId || null;
      this.setParentId(this.parentId);

      this.organizationsService
        .organizationFiles<any>(this.parentId)
        .subscribe((data) => {
          this.signatureImgUUID = data[0]?.uuid || data['uuid'];
        });
    } else {
      this.disabledModulesTab = false;
      this.id = this.data.nodeId;
      this.disableFields('edit');

      this.subscriptions.push(
        this.organizationsService
          .organizationFiles<any>(this.id)
          .subscribe((data) => {
            this.signatureImgUUID = data[0]?.uuid || data['uuid'];
          })
      );

      this.getObj();
    }

    this.subscriptions.push(
      this.form
        .get(OrganizationFormFields.ENTITY_TYPE)
        .valueChanges.subscribe((value) => {
          if (value == ORGANIZATION_DATA_CONSTANTS.CENTER_ID) {
            this.classificationsFinalData = this.centerClassifications;
          } else if (
            value == ORGANIZATION_DATA_CONSTANTS.UNIT_ID ||
            value == ORGANIZATION_DATA_CONSTANTS.POINT_ID
          ) {
            this.classificationsFinalData = this.unitClassifications;
          } else {
            this.classificationsFinalData = this.classificationsData;
          }
          this.cd.detectChanges();
        })
    );

    if (this.id == this.org?.id) {
      this.organizationsService
        .get<Organization>(this.org?.parent?.id)
        .subscribe((v) => {
          this.organizations = [v];
        });

      this.cd.detectChanges();
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      [OrganizationFormFields.TYPE]: [null],
      [OrganizationFormFields.CODE]: [null, [Validators.required]],
      [OrganizationFormFields.NAME_AR]: [
        null,
        [Validators.required, Validators.minLength(2)],
      ],
      [OrganizationFormFields.NAME_EN]: [
        null,
        [Validators.required, Validators.minLength(2)],
      ],
      [OrganizationFormFields.PARENT_ORG]: new FormControl(null, [
        Validators.required,
      ]),
      [OrganizationFormFields.ENTITY_TYPE]: new FormControl(null, [
        Validators.required,
      ]),
      [OrganizationFormFields.LOGO]: [null],
      [OrganizationFormFields.IS_ACTIVE]: [true],
      [OrganizationFormFields.OFFICIAL_EMAIL]: [
        null,
        [Validators.required, Validators.email],
      ],
      [OrganizationFormFields.MOBILE_NO]: [
        '',
        [Validators.pattern(this.uaeMobilePattern)],
      ],
      [OrganizationFormFields.AREA]: [0],
      [OrganizationFormFields.ADCDA_CLASSIFICATION]: [0],
      [OrganizationFormFields.SECTOR]: [0],
      [OrganizationFormFields.ADCDA_PRIMARY]: [false],
      [OrganizationFormFields.INTERNAL]: [false],
      [OrganizationFormFields.USE_PARENT_LOGO]: [true],
      [OrganizationFormFields.LOGIN_UAE_PASS]: [false],
      [OrganizationFormFields.SYSTEM_USER]: [false],
      [OrganizationFormFields.LDAP_USER]: [false],
      [OrganizationFormFields.LDAP_ORG_ID]: [''],
      [OrganizationFormFields.LOGIN_OTP]: [false],
      [OrganizationFormFields.LOGIN_CAPTCHA]: [false],
      [OrganizationFormFields.CONTRACTOR_CONTRACT_NO]: [''],
      [OrganizationFormFields.CONTRACTOR_EXPIRE_DATE]: [''],
      [OrganizationFormFields.ORGANIZATION_CENTER]: [''],
      // [OrganizationFormFields.FEATURE_NAME]: [''],
      [OrganizationFormFields.IS_LOCATION_SELECTED]: [false],
      [OrganizationFormFields.LOCATION]: [null],
    });
  }

  onNewLocationChange(event) {
    this.mapService
      .openMap({
        mapType: MapViewType.ORGANIZATION,
        zoomModel: {
          referenceId: this.org?.id,
          featureName: MapActionType.ORGRANIZATION_POINT,
        },
        showLayers: false,
        showLocInfo: true,
        viewOnly: false,
        pointLocation: this.addressPointLocation,
      })
      .subscribe((response) => {
        const location = `POINT(${response.pointCoordinates.latitude} ${response.pointCoordinates.longitude})`;
        this.form.get(OrganizationFormFields.LOCATION).patchValue(location);
        if (response) {
          this.form
            .get(OrganizationFormFields.IS_LOCATION_SELECTED)
            .patchValue(true);
        }
        this.cd.detectChanges();
      });
  }

  compareEntityTypes(o1: any, o2: any) {
    return o1 == o2?.id;
  }

  compareCenters(o1: any, o2: any) {
    return o1 == o2;
  }

  get validator() {
    const validator = this.form
      .get(OrganizationFormFields.OFFICIAL_EMAIL)
      .validator({} as AbstractControl);

    if (validator && validator.required) {
      return true;
    }
  }

  disableFields(mode: string) {
    let feilds = [
      OrganizationFormFields.SYSTEM_USER,
      OrganizationFormFields.LDAP_USER,
      OrganizationFormFields.SYSTEM_USER,
    ];
    if (mode == OrganizationFormFields.INTERNAL) {
      feilds = [
        ...feilds,
        OrganizationFormFields.LOGIN_CAPTCHA,
        OrganizationFormFields.LOGIN_OTP,
        OrganizationFormFields.LOGIN_UAE_PASS,
      ];
    }
    feilds.forEach((element) => {
      if (this.data.type == 'add') {
        this.form.get(element).reset(false);
      }
      this.form.get(element).disable();
    });
  }

  enableFields() {
    this.form.get(OrganizationFormFields.LOGIN_CAPTCHA).enable();
    this.form.get(OrganizationFormFields.LOGIN_OTP).enable();
    this.form.get(OrganizationFormFields.LOGIN_UAE_PASS).enable();
    if (this.data.type == 'add') {
      this.form.get(OrganizationFormFields.SYSTEM_USER).enable();
      this.form.get(OrganizationFormFields.LDAP_USER).enable();
      this.form.get(OrganizationFormFields.SYSTEM_USER).setValue(true);
      this.form.get(OrganizationFormFields.LDAP_ORG_ID).enable();
    }
  }

  setParentId(id: number) {
    this.form.get(OrganizationFormFields.PARENT_ORG).setValue(id);
    this.form.updateValueAndValidity();
  }

  getObj() {
    this.organizationsService.getOrg(this.id).then((org) => {
      this.pathValues(org);
    });
  }

  pathValues(org: Organization) {
    if (org[OrganizationFormFields.MOBILE_NO]) {
      org[OrganizationFormFields.MOBILE_NO] = org[
        OrganizationFormFields.MOBILE_NO
      ].replace('971', '');
    }
    this.form.patchValue({
      ...org,
      entityType: org.entityType,
      area: org.area?.id || 0,
      adcdaClassifcation: org.adcdaClassifcation?.id || 0,
      sector: org.sector?.id || 0,
      center: org.center,
    });
    this.mgmtForm.patchValue({
      managerId: org?.managerId,
      specialistId: org?.specialistId,
    });

    if (org[OrganizationFormFields.LDAP_ORG_ID]) {
      this.form.get(OrganizationFormFields.SYSTEM_USER).setValue(false);
      this.form.get(OrganizationFormFields.LDAP_USER).setValue(true);
    }

    if (org[OrganizationFormFields.LOCATION]) {
      const [latitude, longitude] = org[OrganizationFormFields.LOCATION]['text']
        .replace('POINT (', '')
        .replace(')', '')
        .split(' ');
      const location = `POINT(${latitude} ${longitude})`;
      this.form.get(OrganizationFormFields.LOCATION).patchValue(location);
      this.form
        .get(OrganizationFormFields.IS_LOCATION_SELECTED)
        .patchValue(true);
      this.addressPointLocation = {
        Lat: latitude ?? '',
        Lng: longitude ?? '',
        Address: '',
      };
    }
    //this.loading = false;
    this.display = true;
    this.cd.detectChanges();
  }

  pickFile(files: FileList) {
    this.files = files;
    if (this.isAddMode) {
      this.signatureImgUUID = '';
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        this.imageUrl = reader.result.toString();
        this.cd.detectChanges();
      };
    } else {
      this.uploadImage();
    }
  }

  uploadImage() {
    if (this.files?.length > 0) {
      this.organizationsService.uploadLogo(this.files[0], this.id, 22).then(
        (res: any) => {
          this.signatureImgUUID = res.result?.uuid;
        },
        (err) => {
          this.alertsService.openFailureSnackBar();
        }
      );
    }
  }

  getCompanyInfo() {
    if (!this.companyInfo.value || this.companyInfo.value === '') {
      return;
    }

    this.display = false;

    this.tradeLicenseService
      .getLicenseDetails(this.companyInfo.value)
      .subscribe(
        (data) => {
          this.setCompanyInfo(data.result);
        },
        (err) => {
          this.display = true;
          this.alertsService.customFailureSnackBar(
            this.translationService.translateAWord('ORGANIZATIONS.ERROR')
          );
        }
      );
  }

  setCompanyInfo(info: any) {
    this.tradeLicense = info;

    const nameEnControl = this.form.get(OrganizationFormFields.NAME_EN);
    nameEnControl.setValue(info.nameEn);
    nameEnControl.disable();

    const nameArControl = this.form.get(OrganizationFormFields.NAME_AR);
    nameArControl.setValue(info.nameAr);
    nameArControl.disable();

    nameArControl.updateValueAndValidity();
    nameEnControl.updateValueAndValidity();

    this.display = true;
  }

  onSubmit() {
    const dataToSend = this.prepareToSend();

    this.display = false;

    if (this.isAddMode) {
      this.create(dataToSend);
    } else {
      this.update(dataToSend);
    }
  }

  sendModules(orgId) {
    let modulesSelection: OrgModule[] = [];
    const selectedEntityType =
      this.entityTypes[this.form.get(OrganizationFormFields.ENTITY_TYPE).value]
        ?.entityType;
    const contractorModules = [
      'MAIN',
      'TASK',
      'INC',
      'LIB',
      'USR',
      'GRP',
      'HOME',
      'INMNG',
      'OLINK',
      'ADMIN',
    ];

    this.moduleService.getFlatModules().subscribe((availableModules) => {
      switch (selectedEntityType) {
        case ENTITIY_TYPES_CODES.CONTRACTOR:
          let contractorMods = availableModules.filter(
            (item) => contractorModules.includes(item?.code) && item.active
          );
          modulesSelection = contractorMods.map((m) => {
            return {
              allowToFollow: false,
              modifiable: false,
              enabled: true,
              id: 0,
              module: { id: m.id },
              orgStructure: { id: orgId },
            };
          });
          break;
        case ENTITIY_TYPES_CODES.Division:
        case ENTITIY_TYPES_CODES.Municipality_Center:
          modulesSelection = DefaultCenterAndDivisionModuls;

          modulesSelection.forEach((module) => {
            module.modified = false;
            module.orgStructure.id = orgId;
          });
          break;
        default:
          break;
      }

      let moduleIDs = DefaultCenterAndDivisionModuls.map((m) => m.module.id);
      let names = availableModules
        .filter((m) => moduleIDs.find((v) => v == m.id))
        .map((v) => v.nameEn);
      console.log('mul center modules', moduleIDs);
      console.log('mul cender module names', names);
      modulesSelection = modulesSelection.filter(
        (m) => !!availableModules.find((am) => am.id == m.module?.id)
      );
      if (modulesSelection && modulesSelection?.length) {
        this.organizationsService
          .updateModules(modulesSelection)
          .pipe(
            finalize(() => {
              this.closeDialog();
            })
          )
          .subscribe(
            () => {
              this.alertsService.openSuccessSnackBar();
            },
            (err) => {
              this.alertsService.openFailureSnackBar();
            }
          );
      }
    });
  }

  create(data: any) {
    this.organizationsService.createOrg(data).subscribe(
      (res) => {
        this.id = res['id'];
        this.uploadImage();
        this.alertsService.openSuccessSnackBar();
        if (
          [
            ENTITIY_TYPES_CODES.CONTRACTOR.toString(),
            ENTITIY_TYPES_CODES.Division.toString(),
            ENTITIY_TYPES_CODES.Municipality_Center.toString(),
          ].includes(
            this.entityTypes[
              this.form.get(OrganizationFormFields.ENTITY_TYPE).value
            ]?.entityType
          )
        ) {
          this.sendModules(this.id);
          this.closeDialog();
          return;
        }
        this.disabledModulesTab = false;
        this.data = {
          nodeId: res['id'],
          type: 'edit',
          parentId: this.data.nodeId,
        };
        this.tabIndex = 1;
        this.isAddMode = false;
        this.ngOnInit();
        this.display = true;
      },
      (err) => {
        const errObj = err['error']['error'];
        if (errObj && errObj[OrganizationFormFields.CODE] == 'DUP_ORG_CODE') {
          this.codeUsed = true;
        }
        this.alertsService.openFailureSnackBar();
        this.display = true;
      }
    );
  }

  update(data: any) {
    this.organizationsService.updateOrg(this.id, data).subscribe(
      async (res) => {
        this.alertsService.openSuccessSnackBar();
        this.display = true;
        this.dialogRef.close();
      },
      (err) => {
        if (this.lang === 'en') {
          this.alertsService.customFailureSnackBar(
            err?.error?.error?.message_En
          );
        } else {
          this.alertsService.customFailureSnackBar(
            err?.error?.error?.message_Ar
          );
        }

        this.display = true;
      }
    );
  }

  resolveValue(value: any) {
    if (typeof value == 'object') {
      return value?.id;
    } else if (typeof value == 'number') {
      return value;
    }
    return null;
  }

  prepareToSend() {
    const parent = this.organizations.find(
      (item) =>
        item.id == this.form.get(OrganizationFormFields.PARENT_ORG).value
    );
    const dataToSend = this.form.getRawValue();
    const mgmtData = this.mgmtForm.getRawValue();
    const copyData = {
      ...this.form.getRawValue(),
      ...this.mgmtForm.getRawValue(),
    };
    dataToSend['managerId'] = this.resolveValue(mgmtData['managerId']);
    dataToSend['specialistId'] = this.resolveValue(mgmtData['specialistId']);

    if (
      ['CON', 'DIV', 'MUCENTER'].includes(
        this.entityTypes[
          this.form.get(OrganizationFormFields.ENTITY_TYPE).value
        ]?.entityType
      )
    ) {
      dataToSend[OrganizationFormFields.LOGIN_UAE_PASS] =
        parent[OrganizationFormFields.LOGIN_UAE_PASS];
      dataToSend[OrganizationFormFields.SYSTEM_USER] =
        parent[OrganizationFormFields.SYSTEM_USER];
      dataToSend[OrganizationFormFields.LDAP_USER] =
        parent[OrganizationFormFields.LDAP_USER];
      dataToSend[OrganizationFormFields.LOGIN_OTP] =
        parent[OrganizationFormFields.LOGIN_OTP];
      dataToSend[OrganizationFormFields.LOGIN_CAPTCHA] =
        parent[OrganizationFormFields.LOGIN_CAPTCHA];
      dataToSend['logoImage'] = parent['logoImage'];
    }
    dataToSend['id'] = this.id || 0;
    dataToSend['tradeLicense'] = this.tradeLicense || null;
    if (dataToSend[OrganizationFormFields.MOBILE_NO]) {
      const mobileNumber = dataToSend[
        OrganizationFormFields.MOBILE_NO
      ] as string;
      dataToSend[OrganizationFormFields.MOBILE_NO] = mobileNumber.slice(
        1,
        mobileNumber.length
      );
    }

    dataToSend[OrganizationFormFields.TYPE] = dataToSend.ldapOrgId
      ? 'ldap'
      : 'inapp';

    delete dataToSend[OrganizationFormFields.LOGO];

    if (!dataToSend[OrganizationFormFields.AREA]) {
      dataToSend[OrganizationFormFields.AREA] = this.org.area;
      dataToSend[OrganizationFormFields.ADCDA_CLASSIFICATION] =
        this.org.adcdaClassifcation;
      dataToSend[OrganizationFormFields.SECTOR] = this.org.sector;
    } else {
      dataToSend[OrganizationFormFields.AREA] = {
        id: dataToSend[OrganizationFormFields.AREA],
      };
      dataToSend[OrganizationFormFields.ADCDA_CLASSIFICATION] = {
        id: dataToSend[OrganizationFormFields.ADCDA_CLASSIFICATION],
      };
      dataToSend[OrganizationFormFields.SECTOR] = {
        id: dataToSend[OrganizationFormFields.SECTOR],
      };
    }

    if (dataToSend[OrganizationFormFields.ADCDA_CLASSIFICATION]?.id == 0) {
      delete dataToSend[OrganizationFormFields.ADCDA_CLASSIFICATION];
    }
    if (dataToSend[OrganizationFormFields.SECTOR]?.id == 0) {
      delete dataToSend[OrganizationFormFields.SECTOR];
    }

    return dataToSend;
  }

  closeDialog(e?) {
    this.dialogRef.close(true);
  }

  //
  checkIfParentADCDA(): boolean {
    const parent = this.organizations.find(
      (item) =>
        item.id == this.form.get(OrganizationFormFields.PARENT_ORG).value
    );
    return parent ? this.getNodePecursion(parent) : false;
  }

  getNodePecursion(node: Organization) {
    if (!node) {
      return;
    }
    // this.getclassification(node);
    if ((node?.code && node?.code == 'ADCDA') || this.org?.code == 'ADCDA') {
      return true;
    }
    if (node?.parentOrg || node?.parent) {
      const index = this.organizations.findIndex(
        (item) => item.id == node?.parentOrg || item.id == node?.parent
      );

      if (index) {
        return this.getNodePecursion(this.organizations[index]);
      }
    }
  }
}
