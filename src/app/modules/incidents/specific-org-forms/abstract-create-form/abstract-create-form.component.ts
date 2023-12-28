import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  UrlSegment,
} from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { GroupService } from '@core/api/services/group.service';
import { UserService } from '@core/api/services/user.service';
import { OrgService } from '@core/api/services/org.service';
import { FilesListComponent } from '@shared/attachments-list/files-list/files-list.component';
import { CustomDatePipe } from '@shared/pipes/custom-date.pipe';
import * as _ from 'lodash';
import { combineLatest, forkJoin, Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  mergeMap,
  tap,
  throttleTime,
} from 'rxjs/operators';
import * as moment from 'moment';
import { MapService } from '@shared/components/map/services/map.service';
import { CommonService } from 'src/app/core/services/common.service';
import { Incident } from '../incident.modal';
import { CreateIncident } from '../../report-incident/createIncident.modal';
import { TranslationService } from '../../../i18n/translation.service';
import { AlertsService } from '../../../../_metronic/core/services/alerts.service';
import { IncidentsService } from '../../../../_metronic/core/services/incidents.service';
import { OrgsService } from '../../../../_metronic/core/services/orgs.service';
import { PushNotificationsService } from '../../../../_metronic/core/services/push.notifications.service';
import { MapViewType } from '@shared/components/map/utils/MapViewType';
import { TaskIncidentGisData } from '@shared/components/map/utils/TaskIncidentGisData';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import { MapActionType } from '@shared/components/map/utils/MapActionType';
import {
  AddressSearchResultModel,
  LocationInfoModel,
} from '@shared/components/map/utils/map.models';
import { RegxConst } from '@core/constant/RegxConst';
import { DialogService } from '@core/services/dialog.service';
import { AppCommonDataService } from '@core/services/app-common-data.service';
import { AppCommonData } from '@core/entities/AppCommonData';
import { Directionality } from '@angular/cdk/bidi';
import { LocationUtil } from './LocationUtil';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { StringValueToken } from 'html2canvas/dist/types/css/syntax/tokenizer';
import { IncidentDashboardStateModel } from '../../new-incidents-view/store/incidents-dashboard.reducer';
import { MatSelectChange } from '@angular/material/select';
import { ShareLocationService } from '../../../share-location/shareLocation.service';
import { MatDialog } from '@angular/material/dialog';
import { SimilarPopupComponent } from '../similar-popup/similar-popup.component';
import { MatTableDataSource } from '@angular/material/table';

const utmObj = require('utm-latlng');
const utm = new utmObj();

@Component({
  selector: 'app-abstract-create-form',
  templateUrl: './abstract-create-form.component.html',
})
export abstract class AbstractCreateFormComponent implements OnInit, OnDestroy {
  // UI
  @ViewChild('filesList') filesList: FilesListComponent;
  formGroup: FormGroup;
  // Variables
  incidentCategories: any;
  incSubCategories: any = [];
  priorities: any[];
  reportingVia: any[] = [];
  emergencyLevels: any[];
  incidentGroups: any[];
  organizations: any[] = [];
  cities: any[];
  users: any[];
  groups: any[] = [];
  cells: any;
  categoryId: any;
  incDistricts: any;
  incCommunity: any = [];
  selectedFiles: FileList;
  selectedFiles1: any = [];
  fileInfos: any[];
  incidentId: any;
  commonData: AppCommonData;
  kpis: any[] = [];
  canEdit = false;
  isAddMode: boolean;
  id: string;
  interimId: string;
  incidentStatus: any;
  status: any[];
  centerCat: any;
  incSubCategoriesCenter: any[];
  tags: any[];
  Porg: any[] = [];
  incidents: any;
  stas: any;
  isCenter = false;
  showSimilarAlert = false;
  similarIncidentDataSource = new MatTableDataSource<any>([]);

  displayAttachments: boolean;
  currentDate: any;
  filteredOptions: Observable<any[]>;
  // For timer
  incidentDurationFormatted;
  incidentStartTime;
  incidentDurationInSeconds = 0;
  lang = 'en';
  loading: boolean;
  destroy$: Subject<boolean> = new Subject();
  private community: LocationInfoModel;
  public isInquiry = false;
  redirectUrl: string;
  // Functions
  public addLocationToMapFunc: (ref: TaskIncidentGisData) => void;
  addressPointLocation: AddressSearchResultModel = null;
  pointInXY: string;
  contractsNo: string;

  protected constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected incidentService: IncidentsService,
    protected groupService: GroupService,
    protected userService: UserService,
    protected orgService: OrgService,
    protected commonService: CommonService,
    protected translationService: TranslationService,
    protected alertService: AlertsService,
    protected location: Location,
    protected notificationsService: PushNotificationsService,
    protected cdr: ChangeDetectorRef,
    protected mapService: MapService,
    protected orgsService: OrgsService,
    protected datePipe: DatePipe,
    protected customDatePipe: CustomDatePipe,
    protected appCommonDataService: AppCommonDataService,
    protected dialogService: DialogService,
    protected directionality: Directionality,
    protected store: Store,
    protected shareLocationService: ShareLocationService,
    public dialog: MatDialog
  ) {
    this.currentDate = new Date();
    this.notificationsService.requestPermission();
  }

  ngOnInit() {
    // prevent load incident data if id related to inquiry component.
    this.lang = this.translationService.getSelectedLanguage();
    this.commonData = this.appCommonDataService.getCommonData();
    this.tags = this.commonData?.tags;
    // get data from url
    this.incidentId = this.route.snapshot.params['id'];
    this.interimId = this.route.snapshot.params['interimId'];
    this.isAddMode = !this.incidentId && !this.interimId;
    this.isInquiry = this.route.snapshot.queryParams['isInquiry'] ?? false;
    if (this.isInquiry) {
      return;
    }
    this.createForm();
    this.getDropDownData();

    if (this.isAddMode) {
      this.startTimer();
    }

    if (!this.isAddMode) {
      // edit incident.
      this.currentDate = new Date();
      this.loading = true;
      const segment = new UrlSegment('report-interim', {});
      if (this.route.snapshot.url.find((s) => s.path == segment.path)) {
        if (this.interimId) {
          this.currentDate = new Date();
          this.incidentService.viewInterimIncidents(this.interimId).subscribe(
            (data) => {
              if (data) {
                this.incidents = data.result;
                const rMobile = '+' + data.result?.reporterContact;
                this.formGroup.patchValue({
                  reportedByName: this.translationService.get(
                    'INCIDENTS.REPORTER_NAME_VALUE'
                  ),
                  subject: this.translationService.get(
                    'INCIDENTS.INCIDENT_TITLE_VALUE'
                  ),
                  reportingVia: data.result.reportingVia.id,
                  description: data.result.description,
                  city: data.result.city.id,
                  incidentDate: this.customDatePipe.transform(
                    data.result?.createdOn
                  ),
                  reportedByMobile: rMobile,
                  locationUrl: this.incidents.location,
                  tags: data.result.tags.map((tagObj) => tagObj.tag.id),
                });

                if (this.incidents.org) {
                  this.loadNonGlobalGroups(this.incidents.org.id);
                }

                this.incidentService
                  .getIncidentCategory(this.incidents?.category?.id)
                  .pipe(
                    tap((data) => {
                      this.incSubCategories.push(data.result);
                      this.categoryId = data.id;
                      let subCategoryString;
                      if (this.lang == 'en') {
                        subCategoryString = data.result.nameEn;
                      }
                      if (this.lang == 'ar') {
                        subCategoryString = data.result.nameAr;
                      }
                      this.formGroup.patchValue({
                        incidentCategory: data.result?.id,
                        subject: this.translationService
                          .get('INCIDENTS.INCIDENT_TITLE_VALUE')
                          .concat(this.interimId)
                          .concat('-')
                          .concat(subCategoryString),
                      });
                    }),
                    mergeMap((data) =>
                      this.incidentService.getIncidentCategory(
                        data.result?.parent?.id
                      )
                    )
                  )
                  .subscribe((data) => {
                    this.formGroup.patchValue(
                      {
                        incidentParentCategory: data.result?.id,
                      },
                      { emitEvent: false }
                    );
                    this.loading = false;
                  });
              }
            },
            (error) => {},
            () => (this.loading = false)
          );

          this.incidentService
            .getInterimIncidentFiles(this.interimId)
            .subscribe(
              (data) => {
                if (data) {
                  this.fileInfos = [...data.result];
                  this.displayAttachments = true;
                  this.cdr.markForCheck();
                }
              },
              (error) => {}
            );
        }
      } else {
        this.incidentService.viewIncidents(this.incidentId).subscribe(
          (data) => {
            if (data) {
              this.incidents = data.result;
              if (data.result.getLocationFromReporter) {
                this.loadReporterLocation();
              }
              this.inputLoadedDistricts();
              this.formGroup.patchValue({
                getLocationFromReporter: data.result.getLocationFromReporter,
                incidentTags: data.result.incidentTags.map(
                  (tagObj) => tagObj.tag.id
                ),
              });
              const obj = new Incident(data.result);

              this.getOrgName();
              this.categoryId =
                this.incidents?.incidentParentCategory?.id || null;
              this.centerCat = this.incidents?.centerCategory?.id || null;
              this.incidentStatus = this.incidents?.status?.id || null;
              this.stas = this.incidents?.status?.id || null;

              if (this.categoryId) {
                this.getSubCat();
              }

              if (this.centerCat) {
                this.getSubCatCenter();
              }

              this.formGroup.patchValue({
                ...obj,
                incidentDate: this.customDatePipe.transform(obj.incidentDate),
                closedDate: this.customDatePipe.transform(obj.closedDate),
              });
              if (this.incidents?.incidentCategory?.id) {
                this.getKpis();
              }
              if (obj.locationReachedDate) {
                this.formGroup.patchValue({
                  locationReachedDate: this.customDatePipe.transform(
                    obj.locationReachedDate
                  ),
                });
              }
              if (obj.containedDate) {
                this.formGroup.patchValue({
                  containedDate: this.customDatePipe.transform(
                    obj.containedDate
                  ),
                });
              }

              if (obj.notifyReporter != null) {
                this.formGroup
                  .get('dontNotifyReporter')
                  .setValue(!obj.notifyReporter);
              }

              if (this.incidents.responsibleOrg) {
                this.loadNonGlobalGroups(this.incidents.responsibleOrg.id);
              }

              this.getGP(this.incidentId);
              this.canEditResponsible();
              this.isCenterOrg();
            }
            this.loading = false;
            this.cdr.detectChanges();
          },
          (error) => {
            this.loading = false;
            this.cdr.detectChanges();
            this.alertService.openFailureSnackBar();
          }
        );

        this.incidentService.getIncidentFiles(this.incidentId).subscribe(
          (data) => {
            if (data) {
              this.fileInfos = [...data.result];
              this.displayAttachments = true;
              this.cdr.markForCheck();
            }
          },
          (error) => {}
        );

        this.getGP(this.incidentId);
        this.checkStatus();
      }
    } else {
      // add mode.
      const org = this.commonData.currentOrgDetails;
      this.loadNonGlobalGroups(org.id);
    }

    this.store
      .select(
        (state: { incidentDashboard: IncidentDashboardStateModel }) =>
          state?.incidentDashboard?.lastRouterUrl
      )
      .subscribe((data) => (this.redirectUrl = data));
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  private loadReporterLocation() {
    forkJoin({
      reportLocationRequest: this.shareLocationService.getReporterLocation(
        this.incidentId
      ),
    }).subscribe(
      ({ reportLocationRequest }) => {
        if (reportLocationRequest['result']) {
          if (reportLocationRequest['result']['location']) {
            const [latitude, longitude] = reportLocationRequest['result'][
              'location'
            ]['text']
              .replace('POINT (', '')
              .replace(')', '')
              .split(' ');
            this.addressPointLocation = {
              Lat: latitude ?? '',
              Lng: longitude ?? '',
              Address: '',
            };
          }
        }
      },
      (error) => {}
    );
  }

  reportingChanging(value) {
    if (value !== 2 && value !== 4 && value !== 7) {
      this.formGroup.get('getLocationFromReporter').setValue(false);
    }
  }

  onNewLocation(closeMapAuto: boolean = false) {
    this.mapService
      .openMap({
        mapType: MapViewType.INCIDENT,
        zoomModel: {
          referenceId: this.incidentId || this.interimId,
          featureName: this.incidents?.featureName,
        },
        showLayers: false,
        pointLocation: this.addressPointLocation,
        closeMapAuto,
      })
      .subscribe((response) => {
        console.log(response);

        if (!response) {
          return;
        }
        const selectedCity = this.cities.find(
          (city) => city.id == this.formGroup.get('city').value
        );

        if (
          !['ADM', 'AAM', 'DRM'].includes(
            this.commonData.currentOrgDetails.code
          ) ||
          (response['locationInfo']['MUNICIPALITY'] == 'ADM' &&
            selectedCity.id == 1) ||
          (response['locationInfo']['MUNICIPALITY'] == 'WRM' &&
            selectedCity.id == 3) ||
          (response['locationInfo']['MUNICIPALITY'] == 'AAM' &&
            selectedCity.id == 2)
        ) {
          const { latitude, longitude, x, y } = response?.pointCoordinates;
          this.pointInXY = `POINT(${latitude} ${longitude})`;
          if (response.locationInfo?.contractors) {
            let contractsNos = response.locationInfo?.contractors?.map(
              (contract) => contract?.CONTRACT_NO
            );
            this.contractsNo = contractsNos.join(',');
            console.log(this.contractsNo);
          }

          // this.groupService
          //   .checkPointIntersection(
          //     location,
          //     this.formGroup.value.incidentCategory
          //   )
          //   .pipe(map((res) => res.result as any[]))
          //   .subscribe((data) => {
          //     const groupIds = data.map((v) => v.id);
          //     this.formGroup.get('incidentGroups').setValue(groupIds);
          //   });
          this.formGroup
            .get('locationUrl')
            .patchValue(LocationUtil.buildGoogleMapUrl(+latitude, +longitude), {
              emitEvent: false,
            });
          this.addLocationToMapFunc = response?.ff;
          this.formGroup.get('featureName').patchValue(response?.gType);

          this.community = response?.locationInfo;

          const dist = this.getDistrictByNameEn(
            this.community?.DISTRICTNAMEENG
          );
          this.formGroup.patchValue({ incidentDistrict: dist });
          this.onChangeDist(this.community?.DISTRICTNAMEENG);

          this.cdr.detectChanges();
        } else {
          this.addLocationToMapFunc = null;
          this.formGroup.get('featureName').patchValue(null);
          this.formGroup.patchValue({ incidentDistrict: null });
          this.alertService.openFailureSnackBarWithMsg(
            this.translationService.getWithArgs('COMMON.SELECT_VALID_POINT', {
              city:
                this.lang == 'ar' ? selectedCity.nameAr : selectedCity.nameEn,
            })
          );
        }
      });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      subject: [null, [Validators.required]],
      other: [null],
      kpi: [null],
      kpiperiod: [null],
      city: [null, Validators.required],
      isInternal: [null],
      dontNotifyReporter: [false],
      reportedByEmail: [
        '',
        Validators.compose([Validators.pattern(RegxConst.EMAIL_REGEX)]),
      ],
      reportedByMobile: [
        '',
        [
          Validators.required,
          Validators.pattern(RegxConst.PHONE_REGEX),
          Validators.maxLength(13),
        ],
      ],
      reportedByName: [null, Validators.required],
      emergencyLevel: [null],
      incidentParentCategory: [null, [Validators.required]],
      incidentCategory: [null, [Validators.required]],
      incidentEnvironmentImpact: [null],
      priority: [null, [Validators.required]],
      incidentsChallengesReqs: [null],
      requmendations: [null],
      incidentGroups: [null],
      incidentDistrict: [null, [Validators.required]],
      incidentCommunity: [null],
      incidentCells: [null],
      incidentTags: [],
      incidentHospitals: [null],
      primaryOrg: [null, [Validators.required]],
      incidentReasons: [null],
      reportingVia: [null, [Validators.required]],
      generalPosition: [null],
      incidentDate: [this.currentDate, [Validators.required]],
      closedDate: [null],
      locationReachedDate: [null],
      containedDate: [null],
      description: [null],
      status: [1, [Validators.required]],
      zone: [null],
      sector: [null],
      plot: [null],
      street: [null],
      featureName: [null],
      specialized: [],
      locationUrl: [''],
      locationInDegrees: [''],
      getLocationFromReporter: [false],
    });
    if (this.commonData.currentUserDetails.id) {
      this.formGroup.patchValue({
        specialized: this.commonData.currentUserDetails.id,
      });
    }

    if (this.commonData.currentOrgDetails.id) {
      console.log(this.commonData.currentOrgDetails);
      this.formGroup.patchValue({});
    }
    this.formGroup.get('incidentGroups').valueChanges.subscribe((value) => {
      console.log(value);

      this.onChange(value);
    });

    this.checkReportingViewValidation();
    this.formGroup.get('kpi').valueChanges.subscribe((kpiId) => {
      if (kpiId) {
        this.formGroup.get('kpiperiod').setValue(this.getKpiPriorityPeriod());
      }
    });

    this.formGroup
      .get('getLocationFromReporter')
      .valueChanges.subscribe((askReporter) => {
        if (askReporter) {
          this.formGroup.get('incidentDistrict').clearValidators();
        } else {
          this.formGroup
            .get('incidentDistrict')
            .setValidators(Validators.required);
        }
        this.formGroup.get('incidentDistrict').updateValueAndValidity();
        this.formGroup.updateValueAndValidity();
      });

    // listen to location url change.
    this.formGroup
      .get('locationUrl')
      .valueChanges.pipe(
        filter((value) => {
          return !!value;
        }),
        debounceTime(1000)
      )
      .subscribe((locationUrl) => {
        if (!locationUrl.includes('google.com')) {
          // un shorten url
          this.incidentService.unShortenUrl(locationUrl).subscribe(
            (res) => {
              if (res.status === 'SUCCESS') {
                this.formGroup.get('locationUrl').setValue(res.data.url);
              } else {
                this.alertService.openFailureSnackBar();
              }
            },
            (e) => {
              this.alertService.openFailureSnackBar();
            }
          );
        } else {
          this.extractPointCoordinatesFromUrl(locationUrl);

          this.calculateUtmfromCoordinates(
            this.addressPointLocation.Lat,
            this.addressPointLocation.Lng
          )
            .pipe(mergeMap((v) => this.incidentService.getDistrictByUTM(v)))
            .subscribe(
              (res) => {
                this.onNewLocation(false);
                if (res != null && res.features.length > 0) {
                  const feature = res.features[0];
                  const district = this.getDistrictByNameEn(
                    feature.attributes.DISTRICTNAMEENG
                  );
                  this.addressPointLocation.Address =
                    feature.attributes.DISTRICTNAMEENG;
                  this.formGroup.patchValue({ incidentDistrict: district });
                  this.loadDistrictFeatureCommunities(feature);
                }
              },
              (e) => {
                console.log('error', e);
                this.alertService.openFailureSnackBar();
              },
              () => {}
            );
        }
      });
    this.formGroup
      .get('locationInDegrees')
      .valueChanges.pipe(debounceTime(1000))
      .subscribe((value) => {
        const degreesObj = this.extractDegreesFromString(value);
        const LatInRadians = this.convertFromDegreesToRadians(
          degreesObj.latitude
        );
        const LongInRadians = this.convertFromDegreesToRadians(
          degreesObj.longitude
        );
        this.addressPointLocation = {
          Lat: LatInRadians,
          Lng: LongInRadians,
          Address: '',
        };

        this.calculateUtmfromCoordinates(
          this.addressPointLocation.Lat,
          this.addressPointLocation.Lng
        )
          .pipe(mergeMap((v) => this.incidentService.getDistrictByUTM(v)))
          .subscribe(
            (res) => {
              this.onNewLocation(false);
              if (res != null && res.features.length > 0) {
                const feature = res.features[0];
                const district = this.getDistrictByNameEn(
                  feature.attributes.DISTRICTNAMEENG
                );
                this.addressPointLocation.Address =
                  feature.attributes.DISTRICTNAMEENG;
                this.formGroup.patchValue({ incidentDistrict: district });
                this.loadDistrictFeatureCommunities(feature);
              }
            },
            (e) => {
              console.log('error', e);
              this.alertService.openFailureSnackBar();
            },
            () => {}
          );
      });

    // check similar popups
    combineLatest([
      this.formGroup.get('incidentCommunity').valueChanges,
      this.formGroup.get('incidentDistrict').valueChanges,
      this.formGroup.get('incidentCategory').valueChanges,
    ]).subscribe(([sector, zone, category]) => {
      console.log([sector, zone, category]);
      this.incidentService
        .getSimilarIncidents({
          sector: sector?.sectorId,
          zone: zone?.zoneId,
          incidentCategory: category,
        })
        .subscribe((data) => {
          console.log(data);
          if (data?.length > 0) {
            this.similarIncidentDataSource.data = data;
            this.showSimilarAlert = true;
          }
        });
    });
  }

  calculateUtmfromCoordinates(lat: number, long: number): Observable<any> {
    const utmObj = utm.convertLatLngToUtm(
      this.addressPointLocation.Lat,
      this.addressPointLocation.Lng,
      5
    );
    console.log(utmObj);
    return of({
      easting: Math.round(utmObj.Easting),
      northing: Math.round(utmObj.Northing),
      letter: utmObj.ZoneLetter,
      zone: utmObj.ZoneNumber,
    });
  }

  extractPointCoordinatesFromUrl(url: string) {
    if (url.includes('N+')) {
      const degreesObj = this.extractDegreeFromUrl(url);
      const LatInRadians = this.convertFromDegreesToRadians(
        degreesObj.latitude
      );
      const LongInRadians = this.convertFromDegreesToRadians(
        degreesObj.longitude
      );
      this.addressPointLocation = {
        Lat: LatInRadians,
        Lng: LongInRadians,
        Address: '',
      };
    } else if (url.includes('z')) {
      const coordinates = url.split('@')[1];
      const [latitude, longitude] = coordinates.split('z')[0].split(',');
      this.addressPointLocation = {
        Lat: +latitude,
        Lng: +longitude,
        Address: '',
      };
    } else if (url.includes('maps')) {
      const coordinates = this.extractCoordinatesFromGoogleUrl(
        this.incidents.location
      );
      this.addressPointLocation = {
        Address: '',
        Lat: +coordinates.latitude,
        Lng: +coordinates.longitude,
      };
    } else {
      this.alertService.openFailureSnackBarWithMsg('this url is not valid');
    }
  }

  extractDegreeFromUrl(url: string): { latitude: string; longitude: string } {
    const extractedDegreePart = url
      .split('E')[0]
      .split('place/')[1]
      .split('N+');
    let [newLatInDegree, newLongInDegree] = extractedDegreePart;
    newLatInDegree = newLatInDegree
      .replace('%C2%B0', '&')
      .replace('%22', '')
      .replace("'", '&');
    newLongInDegree = newLongInDegree
      .replace('%C2%B0', '&')
      .replace('%22', '')
      .replace("'", '&');
    return { latitude: newLatInDegree, longitude: newLongInDegree };
  }

  extractCoordinatesFromGoogleUrl(url: string): {
    latitude: string;
    longitude: string;
  } {
    const [latitiude, longitude] = url.split('=')[1].split(',');
    return { latitude: latitiude, longitude: longitude };
  }

  extractDegreesFromString(fullDegree: string): {
    latitude: string;
    longitude: string;
  } {
    const ss = fullDegree.replace('"N', '').replace('"E', '').split(' ');
    console.log(ss);
    let [newLatInDegree, newLongInDegree] = ss;
    newLatInDegree = newLatInDegree.replace('°', '&').replace("'", '&');
    newLongInDegree = newLongInDegree.replace('°', '&').replace("'", '&');
    return { latitude: newLatInDegree, longitude: newLongInDegree };
  }

  checkReportingViewValidation() {
    this.formGroup.get('reportingVia').valueChanges.subscribe((data) => {
      const item = this.reportingVia.find((item) => item.id === data);
      const dontReportNotifier = this.formGroup.get('dontNotifyReporter').value;
      if ([2, 4, 7].includes(item?.id)) {
        // report by phone
        if (dontReportNotifier) {
          this.formGroup
            .get('reportedByMobile')
            .setValidators([
              Validators.pattern(RegxConst.PHONE_REGEX),
              Validators.maxLength(13),
            ]);
        } else {
          this.formGroup
            .get('reportedByMobile')
            .setValidators([
              Validators.required,
              Validators.pattern(RegxConst.PHONE_REGEX),
              Validators.maxLength(13),
            ]);
        }
        this.formGroup
          .get('reportedByEmail')
          .setValidators(
            Validators.compose([Validators.pattern(RegxConst.EMAIL_REGEX)])
          );
      } else {
        // email
        this.formGroup
          .get('reportedByEmail')
          .setValidators(
            Validators.compose([
              Validators.required,
              Validators.pattern(RegxConst.EMAIL_REGEX),
            ])
          );
        this.formGroup.get('dontNotifyReporter').setValue(false);
        this.formGroup
          .get('reportedByMobile')
          .setValidators([
            Validators.pattern(RegxConst.PHONE_REGEX),
            Validators.maxLength(13),
          ]);
      }
      this.formGroup.get('reportedByEmail').updateValueAndValidity();
      this.formGroup.get('reportedByMobile').updateValueAndValidity();
    });
  }

  convertFromDegreesToRadians(degrees: string) {
    const [degree, minutes, seconds] = degrees.split('&');
    const minutesNumber = +minutes / 60;
    const secondsNumber = +seconds / 3600;
    return +degree + minutesNumber + secondsNumber;
  }

  getIsRequiredForControl(control) {
    const controller = this.formGroup.get(control);
    if (controller?.validator) {
      const validator = controller.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }

  getErrorMobile() {
    // if (this.formGroup.get('reportedByMobile')?.hasError('required')) {
    //   return this.translationService.get('VALIDATION_MSG.REQUIRED');
    // }

    if (this.formGroup.get('reportedByMobile')?.hasError('pattern')) {
      return this.translationService.get('VALIDATION_MSG.MOBILE.INVALID');
    }
  }

  getErrorEmail() {
    if (this.formGroup.get('reportedByEmail')?.hasError('required')) {
      return this.translationService.get('VALIDATION_MSG.REQUIRED');
    }

    if (this.formGroup.get('reportedByEmail')?.hasError('pattern')) {
      return this.translationService.get('VALIDATION_MSG.EMAIL.INVALID');
    }
  }

  getSubCat() {
    this.incidentService.getIncidentSubCategories(this.categoryId).subscribe(
      (data) => {
        if (data) {
          this.incSubCategories = data.result;
        }
      },
      (error) => {}
    );
    this.cdr.detectChanges();
  }

  getDropDownData() {
    this.incidentService.getIncidentCategories().subscribe(
      (data) => {
        if (data) {
          this.incidentCategories = data.result;
        }
      },
      (error) => {}
    );

    this.incidentService.getEmergencyLevels().subscribe(
      (data) => {
        if (data) {
          this.emergencyLevels = data.result.content;
        }
      },
      (error) => {}
    );

    this.incidentService.getCells().subscribe(
      (data) => {
        if (data) {
          this.cells = data.result.content;
        }
      },
      (error) => {}
    );

    this.incidentService.getPriorities().subscribe(
      (data) => {
        if (data) {
          this.priorities = data.result.content;
        }
      },
      (error) => {}
    );

    this.incidentService.getReportingVia().subscribe(
      (data) => {
        if (data) {
          this.reportingVia = data.result.content;
        }
      },
      (error) => {}
    );

    this.commonService.getCities().subscribe(
      (data) => {
        if (data) {
          this.cities = data.result.content;
          const selectedCity = this.cities.find(
            (city) =>
              city.municipalityAr == this.commonData.currentOrgDetails.nameAr
          );
          if (selectedCity) {
            this.formGroup.get('city').patchValue(selectedCity.id);
          }
        }
      },
      (error) => {}
    );

    this.userService
      .getAll()
      .pipe(
        map((result) => {
          const usersList = result.result.content ?? result.result;
          usersList.map((item) => {
            item.nameAr = item.nameAr.replace('null', '');
            item.nameEn = item.nameEn.replace('null', '');
            return item;
          });
          return usersList;
        })
      )
      .subscribe(
        (data) => {
          if (data) {
            this.users = data;
          }
        },
        (error) => {}
      );

    this.orgsService
      .getOrgs()
      .pipe(
        map((orgs) => {
          return orgs;
        })
      )
      .subscribe((data: any) => {
        this.organizations = data;
      });

    this.incidentService.getIncidentStatus().subscribe(
      (data) => {
        if (data) {
          this.status = data.result.content;
        }
      },
      (error) => {}
    );
  }

  getCommunityByNameEn(nameEn) {
    return this.incCommunity.find(
      (item) => item.nameEn?.toUpperCase() === nameEn?.toUpperCase()
    );
  }

  getDistrictByNameEn(nameEn) {
    return this.incDistricts.find(
      (item) => item.nameEn?.toUpperCase() === nameEn?.toUpperCase()
    );
  }

  isCenterOrg() {
    const loggedINUser = this.commonData?.currentOrgDetails?.id;
    const createdUser = this.incidents?.createdBy?.orgStructure?.id;

    loggedINUser === createdUser
      ? (this.isCenter = false)
      : (this.isCenter = true);
  }

  onSelect(event) {
    //  this.changGroups(event?.id);
  }

  public onCategoryChange(event): void {
    this.categoryId = event.source.value;
    this.getSubCat();

    this.formGroup.get('kpi').patchValue(null);
    this.formGroup.get('incidentCategory').patchValue(null);
    this.kpis = null;
  }

  public onSubCategoryChange(event): void {
    this.formGroup.get('kpi').patchValue(null);
    this.kpis = null;
    this.getKpis();
    this.loadGroupsForCategoryAndZone();
  }

  public onStatusChange(event) {
    this.stas = event?.value;
    this.stas == '2'
      ? this.formGroup.get('closedDate').setValue(new Date().toString())
      : this.formGroup.get('closedDate').setValue(null);
  }

  public checkStatus(): boolean {
    return this.incidentStatus != 1 && !this.isAddMode && !this.loading;
  }

  public disableSubmitButton() {
    return this.incidentStatus == '2' || this.loading;
  }

  openSimilarPopup() {
    const dialogRef = this.dialog.open(SimilarPopupComponent, {
      data: this.similarIncidentDataSource,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  public onChangeDist(event): void {
    this.cdr.detectChanges();
    const name = event?.nameEn ? event.nameEn : event;
    this.incidentService.getCommunity(name).subscribe(
      (data) => {
        if (data) {
          this.incCommunity = data.result;
          if (this.community?.COMMUNITYNAMEENG) {
            const comm = this.getCommunityByNameEn(
              this.community.COMMUNITYNAMEENG
            );
            this.formGroup.patchValue({
              incidentCommunity: comm,
            });
          }
        }
      },
      (error) => {}
    );
    this.loadGroupsForCategoryAndZone();
  }

  public loadDistrictFeatureCommunities(feature: any) {
    this.incidentService
      .getCommunity(feature.attributes.DISTRICTNAMEENG)
      .subscribe(
        (data) => {
          if (data) {
            this.incCommunity = data.result;
            const comm = this.getCommunityByNameEn(
              feature.attributes.COMMPOPNAMEENG
            );
            this.formGroup.patchValue({
              incidentCommunity: comm,
            });
          }
        },
        (error) => {}
      );
    this.loadGroupsForCategoryAndZone();
  }

  public getKpis(): void {
    if (
      this.formGroup.value.incidentCategory &&
      this.formGroup.value.priority
    ) {
      this.loadKpis();
    }
  }

  onSubmit() {
    this.formGroup.get('status').setValue(1);
    this.formGroup.get('incidentDistrict').setValidators(Validators.required);
    this.formGroup.get('incidentDistrict').updateValueAndValidity();
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.alertService.customFailureSnackBar(
        this.translationService.get('INCIDENTS.INVALID_FORM')
      );
      this.loading = false;
      return;
    }
    // check if teams selected or not and notify reporter about team selection
    const isTeamsSelected = this.isTeamsSelected();
    if (isTeamsSelected) {
      this.sendIncidentDataToServer();
    } else {
      // show warning dialog.
      this.dialogService.noTeamsSelectedConfirmDialog().subscribe((approve) => {
        if (approve) {
          this.sendIncidentDataToServer();
        }
      });
    }
  }
  saveAsDraft() {
    let controlers = [
      'primaryOrg',
      'incidentDistrict',
      'zone',
      'incidentGroups',
    ];
    controlers.forEach((element) => {
      this.formGroup.get(element).setValidators([]);
      this.formGroup.get(element).updateValueAndValidity();
    });
    this.formGroup.get('status').setValue(5);
    this.formGroup.get('dontNotifyReporter').setValue(true);
    this.formGroup.get('getLocationFromReporter').setValue(true);
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.alertService.customFailureSnackBar(
        this.translationService.get('INCIDENTS.INVALID_FORM')
      );
      this.loading = false;
      return;
    }
    this.sendIncidentDataToServer();
  }

  private sendIncidentDataToServer() {
    this.loading = true;
    if (this.isAddMode || (!this.isAddMode && this.interimId)) {
      this.createIncident();
    } else {
      this.updateIncident();
    }
  }

  createIncident() {
    const formData = this.formGroup.value;
    formData.notifyReporter = !formData.dontNotifyReporter;
    const res = new CreateIncident(formData, 0);
    console.log(res);

    // timer for create only

    res.processingTime = moment
      .duration(this.incidentDurationFormatted)
      .asSeconds();

    res.zone = this.getZone();
    res.sector = this.getSector();

    this.interimId
      ? (res.interimIncident = Number(this.interimId))
      : (res.interimIncident = null);

    this.incidentService.createIncident(res).subscribe(
      async (data) => {
        if (data) {
          this.incidentId = data.result.id;
          const commonData = JSON.parse(localStorage.getItem('commonData'));
          const currentOrg = commonData['currentOrgDetails'];

          const category = this.incidentCategories.find(
            (c) => c.id == res?.incidentParentCategory?.id
          );

          if (this.addLocationToMapFunc) {
            const priority = this.priorities.find(
              (p) => p.id == res?.priority?.id
            );
            const cityString = this.cities.find((c) => c.id == res?.city?.id);

            await this.addLocationToMapFunc({
              refId: this.incidentId || this.interimId,
              title: res.subject,
              orgName: currentOrg?.code,
              levelId: res?.emergencyLevel?.id,
              inc_category: `${category?.nameAr ?? ''} / ${
                category?.nameEn ?? ''
              }`,
              priorityId: `${priority?.nameAr ?? ''} / ${
                priority?.nameEn ?? ''
              }`,
              city: `${cityString?.municipalityAr ?? ''} / ${
                cityString?.municipalityEn ?? ''
              }`,
              dueDate: DateTimeUtil.getDateInUTCFormat(res.incidentDate),
              creation_date: DateTimeUtil.getDateInUTCFormat(res.createdOn),
            });
          }
          if (!_.isEmpty(this.selectedFiles)) {
            this.uploadFiles(this.incidentId);
          }

          clearInterval(this.incidentStartTime);
          await this.filesList?.upload(this.incidentId);
          this.alertService.openSuccessSnackBar();
          await this.router.navigate([this.redirectUrl]);
        }

        this.loading = false;
      },
      (error) => {
        this.alertService.openFailureSnackBar();
        this.loading = false;
        this.cdr.detectChanges();
      }
    );
  }

  onChange(ids: any[]) {
    const groupIds = ids;
    if (groupIds?.length == 0) {
      this.formGroup.get('primaryOrg').reset([]);
      return;
    }
    const selectedGroups = this.groups.filter((group) =>
      groupIds.includes(group?.id)
    );
    // notic every will return true if array empty
    const sameParent = selectedGroups.every(
      (val, i, arr) => val?.orgStructure?.id === arr[0]?.orgStructure?.id
    );
    if (sameParent && this.formGroup.get('primaryOrg').invalid) {
      this.formGroup
        .get('primaryOrg')
        .setValue([selectedGroups[0]?.orgStructure?.id]);
      this.cdr.detectChanges();
    }
    if (!sameParent) {
      this.formGroup.get('primaryOrg').reset([]);
    }
  }

  updateIncident() {
    const formData = this.formGroup.value;
    formData.notifyReporter = !formData.dontNotifyReporter;
    const prepareObj = new CreateIncident(formData, this.incidentId);
    const commonData = JSON.parse(localStorage.getItem('commonData'));
    const currentOrg = commonData['currentOrgDetails'];

    prepareObj.zone = this.getZone();
    prepareObj.sector = this.getSector();

    this.incidentService.updateIncident(prepareObj).subscribe(
      async (data) => {
        if (data) {
          if (!_.isEmpty(this.selectedFiles)) {
            this.uploadFiles(this.incidentId);
          }
          if (this.addLocationToMapFunc) {
            const category = this.incidentCategories.find(
              (c) => c.id == prepareObj?.incidentParentCategory?.id
            );
            const priority = this.priorities.find(
              (p) => p.id == prepareObj?.priority?.id
            );
            await this.addLocationToMapFunc({
              refId: this.incidentId,
              title: prepareObj.subject,
              orgName: currentOrg?.code,
              levelId: prepareObj?.emergencyLevel?.id,
              priorityId: `${priority?.nameAr ?? ''} / ${
                priority?.nameEn ?? ''
              }`,
              inc_category: `${category?.nameAr ?? ''} / ${
                category?.nameEn ?? ''
              }`,
              dueDate: DateTimeUtil.getDateInUTCFormat(prepareObj.incidentDate),
            });
          } else {
            let layer;

            switch (this.incidents?.featureName) {
              case MapActionType.INCIDENT_POINT:
                layer = await this.mapService.getIncidentPointLayer();
                break;
              case MapActionType.INCIDENT_POLYLINE:
                layer = await this.mapService.getIncidentLineLayer();
                break;
              case MapActionType.INCIDENT_POLYGON:
                layer = await this.mapService.getIncidentPolygonLayer();
                break;
            }
            if (!prepareObj?.featureName) {
              if (this.incidents?.featureName) {
                // clear incident locations from incident layers
                if (layer) {
                  const featureSet = await this.mapService.queryGraphic(
                    layer,
                    'incident',
                    this.id
                  );
                  await this.mapService.applyEdits(
                    featureSet.features,
                    layer,
                    'deleteFeatures'
                  );
                } else {
                  const layers = [
                    await this.mapService.getIncidentPointLayer(),
                    await this.mapService.getIncidentLineLayer(),
                    await this.mapService.getIncidentPolygonLayer(),
                  ];
                  for (const l of layers) {
                    const featureSet = await this.mapService.queryGraphic(
                      l,
                      'incident',
                      this.id
                    );
                    await this.mapService.applyEdits(
                      featureSet.features,
                      l,
                      'deleteFeatures'
                    );
                  }
                }
              }
            } else if (layer) {
              try {
                const featureSet = await this.mapService.queryGraphic(
                  layer,
                  'incident',
                  this.incidentId
                );
                const graphics = featureSet?.features?.map((g) => {
                  g.setAttribute('NAME', prepareObj.subject);

                  const priority = this.priorities.find(
                    (p) => p.id == prepareObj?.priority?.id
                  );
                  g.setAttribute(
                    'PRIORITY',
                    `${priority?.nameAr ?? ''} / ${priority?.nameEn ?? ''}`
                  );

                  g.setAttribute(
                    'LEVELID',
                    prepareObj?.emergencyLevel?.id?.toString()
                  );

                  const category = this.incidentCategories.find(
                    (c) => c.id == prepareObj?.incidentParentCategory?.id
                  );

                  g.setAttribute(
                    'INC_CATEGORY',
                    `${category?.nameAr ?? ''} / ${category?.nameEn ?? ''}`
                  );
                  return g;
                });
                await this.mapService.applyEdits(
                  graphics,
                  layer,
                  'updateFeatures'
                );
              } catch (error) {}
            }
          }
          await this.filesList?.upload(this.incidentId, false);
          this.alertService.openSuccessSnackBar();

          await this.router.navigate([this.redirectUrl]);
        }
      },
      (error) => {
        this.alertService.openFailureSnackBarWithMsg(
          this.translationService.translateAWord(
            'INCIDENTS.ATTACHMENTS_WERE_NOT_SAVED_CORRECTLY'
          )
        );
        this.loading = false;
        this.cdr.detectChanges();
      }
    );
  }

  addFiles(files: FileList) {
    this.selectedFiles = files;
  }

  uploadFiles(IcId) {
    if (this.selectedFiles) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const files: File = this.selectedFiles[i];
        const formData: FormData = new FormData();
        formData.append('file', files);

        this.incidentService.uploadIncidentFiles(IcId, formData).subscribe(
          (data) => {
            if (data) {
              this.alertService.openSuccessSnackBar();
            }
          },
          (error) => {
            this.alertService.customFailureSnackBar(error['message_En']);
          }
        );
      }
    }
  }

  uploadFiles1(IcId) {
    if (this.selectedFiles1) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.selectedFiles1.length; i++) {
        const files: File = this.selectedFiles1[i];
        const formData: FormData = new FormData();
        formData.append('file', files);

        this.incidentService.uploadIncidentFiles(IcId, formData).subscribe(
          (data) => {
            if (data) {
              this.alertService.openSuccessSnackBar();
            }
          },
          (error) => {
            this.alertService.customFailureSnackBar(error['message_En']);
          }
        );
      }
    }
  }

  notify() {
    const data = [];
    data.push({
      title: 'Approval',
      alertContent: 'This is First Notification Alert ',
    });
    this.notificationsService.generateNotification(data);
  }

  changGroups(id) {
    this.loadNonGlobalGroups(id);
  }

  loadNonGlobalGroups(id) {
    this.groupService.getListNonGlobalGroupsByOrgId(id).subscribe(
      (data) => {
        if (data) {
          this.groups = data.result;
        }
        this.cdr.detectChanges();
      },
      (error) => {}
    );
  }

  getSubCatCenter() {
    this.incidentService.getIncidentSubCategories(this.centerCat).subscribe(
      (data) => {
        if (data) {
          this.incSubCategoriesCenter = data.result;
          this.cdr.markForCheck();
        }
      },
      (error) => {}
    );
  }

  getOrgName() {
    this.incidents['incidentOrgs'].forEach((element) => {
      if (element.isMain === false) {
        this.lang === 'en'
          ? this.Porg.push(element.orgStructure.nameEn)
          : this.Porg.push(element.orgStructure.nameAr);
      }
    });
  }

  getGP(id) {
    this.incidentService.getGeneralPosition(id).subscribe(
      (data) => {
        if (data) {
          this.formGroup.get('generalPosition').setValue(data);
          this.formGroup.get('generalPosition').updateValueAndValidity();
        }
      },
      (error) => {}
    );
  }

  canEditResponsible() {
    this.canEdit =
      this.incidents?.responsibleOrg?.id ===
      this.commonData?.currentOrgDetails?.id;
    this.cdr.detectChanges();
  }

  startTimer() {
    this.incidentStartTime = moment().startOf('day');
    setInterval(() => {
      this.incidentStartTime.add(1, 'second');
      this.incidentDurationInSeconds += 1;
      this.incidentDurationFormatted =
        this.incidentStartTime.format('HH:mm:ss');
      this.cdr.detectChanges();
    }, 1000);
  }

  back() {
    this.location.back();
  }

  getZone() {
    const distName = this.formGroup.value.incidentDistrict?.nameEn
      ? this.formGroup.value.incidentDistrict?.nameEn
      : this.formGroup.value.incidentDistrict;
    const zoneID = _.find(this.incDistricts, (item) => {
      return item.nameEn.toLowerCase() === distName?.toString().toLowerCase();
    });

    return zoneID ? zoneID.zoneId : '';
  }

  getSector() {
    const commName = this.formGroup.value.incidentCommunity?.nameEn
      ? this.formGroup.value.incidentCommunity?.nameEn
      : this.formGroup.value.incidentCommunity;

    const commID = _.find(this.incCommunity, (item) => {
      return item.nameEn.toLowerCase() === commName?.toString().toLowerCase();
    });

    return commID ? commID.sectorId : '';
  }

  getDistrictByZone(zoneId) {
    if (zoneId) {
      const District = _.find(this.incDistricts, (item) => {
        return item.zoneId === zoneId.toString();
      });

      if (District) {
        this.formGroup.patchValue({ incidentDistrict: District });
        this.getCommunityBySector(this.incidents.sector, District.nameEn);
      } else {
        this.formGroup.patchValue({
          incidentDistrict: null,
          incidentCommunity: null,
        });
      }
      this.cdr.detectChanges();
    }
  }

  getCommunityBySector(sectorId, dist) {
    if (sectorId) {
      this.incidentService.getCommunity(dist).subscribe((data) => {
        if (data) {
          this.incCommunity = data.result;
          const Community = _.find(this.incCommunity, (item) => {
            return item.sectorId === sectorId.toString();
          });

          if (Community) {
            this.formGroup.patchValue({
              incidentCommunity: Community,
            });
          } else {
            this.formGroup.patchValue({
              incidentCommunity: null,
            });
          }
          this.cdr.detectChanges();
        }
      });
    }
  }

  private loadKpis() {
    this.incidentService
      .getKpis(
        this.formGroup.value.incidentCategory,
        this.formGroup.value.priority
      )
      .subscribe(
        (data) => {
          if (data && !_.isEmpty(data.result)) {
            this.kpis = data.result;
            // select first kpi if add else select user selected kpi.
            if (this.incidents) {
              // edit.
              this.formGroup.get('kpi').patchValue(this.kpis[0].kpi.id);
            } else {
              // add
              this.formGroup.get('kpi').patchValue(this.kpis[0].kpi['id']);
            }
            this.cdr.detectChanges();
          }
        },
        (error) => {}
      );
  }

  private loadGroupsForCategoryAndZone() {
    if (
      this.formGroup.value.incidentCategory &&
      this.formGroup.value.incidentDistrict
    ) {
      this.groupService
        .getCategoryZoneGroups(
          this.formGroup.value.incidentCategory,
          this.formGroup.value.incidentDistrict.zoneId,
          this.pointInXY,
          this.contractsNo
        )
        .subscribe((value) => {
          if (value) {
            const previousSelectedGroupsIds =
              this.formGroup.get('incidentGroups').value;
            const selectedGroupsIds = value.result.map((g) => g.id);
            const ids = _.union(previousSelectedGroupsIds, selectedGroupsIds);
            this.formGroup.get('incidentGroups').setValue(selectedGroupsIds);
          }
        });
    }
  }

  getKpiPriorityPeriod() {
    const kpiId = this.formGroup.get('kpi').value;
    if (!kpiId) {
      return '';
    }
    const kpi = this.kpis.find((k) => k.kpi.id === kpiId);
    if (!kpi) {
      return '';
    }
    const priorityId = this.formGroup.get('priority').value;
    const period = (kpi.kpiPriorities as any[]).find(
      (p) => p.priority?.id === priorityId
    );
    return period.period;
  }

  getIncidentGroupName(index: number) {
    const group = this.groups[index];
    if (this.lang === 'en') {
      return group.nameEn;
    } else {
      return group.nameAr;
    }
  }

  getIncidentGroupOrg(index: number) {
    const group = this.groups[index];
    const orgStructure = group.orgStructure;
    if (this.lang === 'en') {
      return orgStructure?.nameEn;
    } else {
      return orgStructure?.nameAr;
    }
  }

  private isTeamsSelected() {
    const selectedTeams = this.formGroup.get('incidentGroups').value;
    return selectedTeams && (selectedTeams as number[]).length > 0;
  }

  getTitle() {
    if (this.isInquiry) {
      // add edit inquiry
      return this.isAddMode
        ? 'INCIDENTS.ADD_NEW_INQUIRY'
        : 'INCIDENTS.EDIT_INQUIRY';
    } else {
      // add edit incident.
      return this.isAddMode
        ? 'INCIDENTS.ADD_NEW_INCIDENT'
        : 'INCIDENTS.EDIT_INCIDENT';
    }
  }

  changeIncidentType($event: MatSlideToggleChange) {
    this.isInquiry = $event.checked;
    this.cdr.detectChanges();
  }

  inputLoadedDistricts($event?: any) {
    if ($event) {
      this.incDistricts = $event;
    }
    if (this.incidents) {
      this.getDistrictByZone(this.incidents.zone);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
    clearInterval(this.incidentStartTime);
  }
}
