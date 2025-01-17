import {
  AfterViewChecked,
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
import {TreeNode} from 'primeng/api';
import {DistrictNameProjection, IdNameProjection, OrgStructure, UserAndRoleProjection,} from '../../../../api/models';
import {auditTime, filter, map, switchMap, take, takeUntil, tap,} from 'rxjs/operators';
import {GroupAction, OrgAction, OrgState, TaskState} from '@core/states';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegxConst} from '@core/constant/RegxConst';
import {Select, Store} from '@ngxs/store';
import {GenericValidators} from '@shared/validators/generic-validators';
import {FormUtils} from '@core/utils/form.utils';
import {IAuthService} from '@core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BrowseGroupsAction} from '../../states/browse-groups.action';
import {TranslationService} from '../../../i18n/translation.service';
import {GroupState} from '@core/states/group/group.state';
import {userType} from '../../../groups-management/group.model';
import {CommonService} from '@core/services/common.service';
import {CenterState} from '@core/states/service-center-area/centers/center.state';
import {CenterAction} from '@core/states/service-center-area/centers/center.action';
import {IncidentLocInfoState} from '@core/states/incident-location-info/incidentLocInfo.state';
import {IncicentLocationInfoAction} from '@core/states/incident-location-info/incidentLocInfo.action';
import {AreaItem, Center, GeometryType, GroupGeometryLocation,} from '../../../groups-management/group-incidents-categroies/center.model';
import {MapViewType} from '@shared/components/map/utils/MapViewType';
import {MapConfig, MapService,} from '@shared/components/map/services/map.service';
import {AppCommonData} from '@core/entities/AppCommonData';
import {MapComponent} from '@shared/sh-components/map/map.component';
import {__await} from 'tslib';
import {PrivilegesService} from '@core/services/privileges.service';
import {Dialog} from 'primeng/dialog';
import {GroupContractRequest} from 'src/app/api/models/group-contract-request';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss'],
})
export class GroupDialogComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  @ViewChild(Dialog) dialog: Dialog;
  commonData: AppCommonData;
  RegxConst = RegxConst;

  opened$: Observable<boolean>;
  @Input()
  activeTab: number = 0;

  @Select(OrgState.orgs)
  orgs$: Observable<OrgStructure[]>;

  @Select(GroupState.groupMapUsers)
  users$: Observable<UserAndRoleProjection[]>;

  @Select(CenterState.centerList)
  public centerList$: Observable<IdNameProjection[]>;

  @Select(CenterState.disrictList)
  public districtList$: Observable<DistrictNameProjection[]>;

  @Select(GroupState.blocking)
  blocking$: Observable<boolean>;

  viewOnly$: Observable<boolean>;
  userTypes = userType;
  @Input()
  orgsTree: TreeNode[];

  @ViewChild('mapContainer', { read: ViewContainerRef })
  mapContainer: ViewContainerRef;
  mapComponent: MapComponent;

  inputOptions = ['MAP', 'SELECT', 'CONTRACT_NO_SEARCH'];
  public incidentCategories$: any[];

  public district: any[] = [];
  public users: any[];

  public previous = 0;
  public previousDistrict = 0;
  public selectedCenterDistricsList: any[] = [];
  public selectedZonesEdit = [];
  public selectedCenter = [];
  public categoryName: string[];
  public displayCenters: Center[] = [];
  public selectedCat = [];
  public categories = [];
  public groupConfig: MapConfig[] = [];
  public isUserActive = true;

  form: FormGroup;
  private defaultFormValue: { [key: string]: any } = {};

  userGroupForm: FormGroup;
  private defaultUserFormValue: { [key: string]: any } = {};

  groupZoneIncidentCategory: FormGroup;
  incidentCategory: FormGroup;

  destroy$ = new Subject();
  private LoadUsers$ = new Subject<string>();
  lang = 'en';
  checkMap = false;

  areaItems: AreaItem[] = [];
  public disabledUsers = [];
  responseFromIncidentLoc: any = [];

  _groupId: number;
  _mode: string;

  get loggedinUserId() {
    return this.auth.getClaim('sub');
  }

  get editMode() {
    return this._groupId !== undefined && this._groupId !== null;
  }

  groupGeometry: GroupGeometryLocation = {
    groupId: 0,
    location: [],
    categoryIds: [],
  };

  contract: GroupContractRequest = {
    contractNo: '',
    groupId: null,
  };
  namedLocations: {
    geometry: string;
    name: string;
    type: string;
    isEditing?: boolean;
  }[] = [];

  public get asDialog() {
    return this.route.component !== GroupDialogComponent;
  }

  @Input()
  set groupId(v: number) {
    this._groupId = v;
    this.buildForm();
    this.mapContainer?.clear();
    this.mapComponent = undefined;
    if (v === undefined || v === null) {
      return;
    }
    this.loadUsers('', true, 'manager');
    this.store
      .dispatch(new GroupAction.GetGroup({ id: v }))
      .pipe(
        switchMap(() => this.store.select(GroupState.group)),
        takeUntil(this.destroy$),
        take(1),
        tap((user) => {
          this.form.patchValue({
            ...user,
            orgStructure: {
              key: user.orgStructure?.id,
              labelAr: user.orgStructure?.nameAr,
              labelEn: user.orgStructure?.nameEn,
              data: user.orgStructure,
            },
          });
          this.isUserActive = user.isActive;
          this.users = user.users;
          this.disabledUsers = user.users;
          this.patchSelectedOrg(user.users);
        })
      )
      .subscribe();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store,
    private formBuilder: FormBuilder,
    private auth: IAuthService,
    private route: ActivatedRoute,
    private translationService: TranslationService,
    private readonly commonService: CommonService,
    protected mapService: MapService,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private privilegesService: PrivilegesService,
    private router: Router
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.groupId = id;
      });
    this.route.queryParams
      .pipe(
        map((params) => params['_mode']),
        takeUntil(this.destroy$)
      )
      .subscribe((mode) => {
        this._mode = mode;
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
    this.lang = this.translationService.getSelectedLanguage();
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
    this.buildForm();
    this.buildUserForm();
    this.buildIncidentCategoryForm();
    this.buildGroupZoneIncidentCategoryForm();
    this.incidentCategories$ = this.getChildrenCategories();
    this.store.dispatch([
      new OrgAction.LoadOrgs({ orgId: this.auth.getClaim('orgId') }),
    ]);
    this.LoadUsers$.pipe(takeUntil(this.destroy$), auditTime(900)).subscribe(
      (name) => {
        this.store.dispatch(
          new GroupAction.LoadGroupMapUserPage({
            name,
            page: 0,
            size: 15,
          })
        );
      }
    );
  }

  isDisabled(user) {
    console.log(user);
    if (this.disabledUsers) {
      this.disabledUsers.findIndex((item) => {
        if (item.user.id === user.id) {
          return false;
        } else {
          return true;
        }
      });
    }
  }

  addNewLocation() {
    this.namedLocations = [
      ...this.namedLocations,
      { geometry: null, name: null, type: null, isEditing: true },
    ];
  }

  removeLocation(i: number) {
    this.namedLocations = this.namedLocations.filter((v, index) => index !== i);
  }

  updateLocation(i: number) {
    const loc = this.namedLocations[i];
    this.openLocationDialoug(i, this.mapStringToCoordinates(loc.geometry));
  }

  mapStringToCoordinates(locationAsString: string): {
    type: string;
    points: number[][];
  } {
    let type = '';
    if (locationAsString.includes('POLYGON')) {
      type = 'POLYGON';
    } else if (locationAsString.includes('POLYLINE')) {
      type = 'POLYLINE';
    }
    let coordinates = locationAsString
      .replace(`${type.toUpperCase()} ((`, '')
      .replace('))', '');
    const coordinatesArr = coordinates.split(',');
    let newCoordinatesArrNumber = [];
    coordinatesArr.forEach((value, i, arr) => {
      value = value.trim();
      if (i !== arr.length - 1) {
        let newCoordinates = value.split(' ');
        newCoordinatesArrNumber.push(newCoordinates.map((v) => +v));
      }
    });
    return { type: type.toLowerCase(), points: newCoordinatesArrNumber };
  }

  viewLocation(i: number) {
    const loc = this.namedLocations[i];
    this.openLocationDialoug(
      i,
      this.mapStringToCoordinates(loc.geometry),
      true
    );
  }

  openLocationDialoug(
    i: number,
    geometry: GeometryType,
    isView: boolean = false
  ) {
    this.mapService
      .openMap({
        mapType: MapViewType.TEAM,
        showLayers: false,
        viewOnly: isView,
        polygonLocation:
          geometry?.type == 'polygon'
            ? {
                type: geometry.type,
                polygonRings: geometry.points,
                Address: this.namedLocations[i].name,
              }
            : null,
        polylineLocation:
          geometry?.type == 'polyline'
            ? {
                type: geometry.type,
                polylinePaths: geometry.points,
                Address: this.namedLocations[i].name,
              }
            : null,
      })
      .subscribe((response) => {
        if (!response) {
          return;
        }
        const { polygonCoordinates, polylineCoordinates, gType } = response;
        const type = gType.split('_')[1].toUpperCase();
        const locationAsString = this.mapCoordinatesToString(
          (type === 'POLYGON'
            ? polygonCoordinates
            : polylineCoordinates) as string[][][],
          type
        );
        this.namedLocations[i].geometry = locationAsString;
        this.namedLocations[i].type = type;
      });
  }

  mapCoordinatesToString(coordinates: string[][][], type: string) {
    let locationString = `${type} ((`;
    let location = coordinates[0];
    location.push(location[0]);
    location.forEach((point: string[], index: number, array: string[][]) => {
      locationString += `${point[0]} ${point[1]}`;
      if (index < array.length - 1) {
        locationString += ',';
      }
    });
    locationString += '))';

    return locationString;
  }

  save(i: number) {
    this.namedLocations[i].isEditing = false;
  }

  loadDistrictList(event?, editModeId?, zone?) {
    if (editModeId) {
      const index = editModeId.index;
      const id = editModeId.id;
      this.store
        .dispatch([new CenterAction.LoadDistrictList({ centerId: id })])
        .pipe(
          map((res) => {
            this.areaItems.forEach((v, index) => {
              if (v.center.id === id) {
                this.areaItems[index].zones =
                  res[0].serviceCenterArea.districtList;
              }
            });
            const tempZone = {
              id: this.areaItems[index].center.id,
              nameAr: this.areaItems[index].center.nameAr,
              nameEn: this.areaItems[index].center.nameEn,
              items: this.areaItems[index].zones,
            };
            tempZone.items.forEach((item) => {
              if (zone.includes(Number(item.zoneId))) {
                this.selectedZonesEdit.push(item);
              }
            });
            this.district.push(tempZone);
            console.log('zone', this.selectedZonesEdit);
            this.groupZoneIncidentCategory
              .get('zoneId')
              .setValue(this.selectedZonesEdit);
            this.onDistrictSelect('', this.selectedZonesEdit);

            this.cdr.detectChanges();
            this.groupZoneIncidentCategory
              .get('zoneId')
              .updateValueAndValidity();
          }),
          takeUntil(this.destroy$),
          auditTime(1000),
          take(1)
        )
        .subscribe((res) => {});
    } else {
      let id;
      let index;
      event.value.forEach((v) => {
        if (v.center.index === event.itemValue.center.index) {
          id = v.center.id;
          index = v.center.index;
        }
      });
      if (event.value.length > this.previous) {
        this.previous = event.value.length;
        this.store
          .dispatch([new CenterAction.LoadDistrictList({ centerId: id })])
          .pipe(
            map((res) => {
              this.areaItems.forEach((v, index) => {
                if (v.center.id === event.itemValue.center.id) {
                  this.areaItems[index].zones =
                    res[0].serviceCenterArea.districtList;
                }
              });
              const tempZone = {
                id: this.areaItems[index].center.id,
                nameAr: this.areaItems[index].center.nameAr,
                nameEn: this.areaItems[index].center.nameEn,
                items: this.areaItems[index].zones,
              };
              this.district.push(tempZone);
              this.cdr.detectChanges();
              this.groupZoneIncidentCategory
                .get('zoneId')
                .updateValueAndValidity();
            }),
            takeUntil(this.destroy$),
            auditTime(1000),
            take(1)
          )
          .subscribe((res) => {});
      } else {
        const removeIndex = event.itemValue.center.index;
        this.previous = event.value.length;
        this.areaItems[removeIndex].zones = [];
        const selectdZones = this.groupZoneIncidentCategory.get('zoneId')
          .value as any[];
        if (selectdZones) {
          selectdZones.forEach((item, index) => {
            if (item.center === event.itemValue.center.id) {
              selectdZones.splice(index, 1);
            }
          });
        }
        this.groupZoneIncidentCategory.get('zoneId').patchValue(selectdZones);
        this.district.forEach((item, index) => {
          if (event.itemValue.center.id === item.id) {
            this.district.splice(index, 1);
          }
        });
        console.log('after remove distric', this.district);
      }
    }
  }

  onDistrictSelect(event?, selectedZones?) {
    if (selectedZones) {
      const centers = [];
      this.district.forEach((v, index) => {
        centers.push({
          incidentCategoryId: null,
          zones: [],
          centerId: v.id,
          allZones: false,
        });
        if (selectedZones) {
          selectedZones.forEach((item) => {
            if (item.center === v.id) {
              centers[index].zones.push(item.zoneId);
            }
          });
        }
      });
      this.selectedCenterDistricsList = centers;
    } else {
      const selectdZones = this.groupZoneIncidentCategory.get('zoneId')
        .value as any[];
      const centers = [];
      if (event.value.length > this.previousDistrict) {
        this.district.forEach((v, index) => {
          centers.push({
            incidentCategoryId: null,
            zones: [],
            centerId: v.id,
            allZones: false,
          });
          if (selectdZones) {
            selectdZones.forEach((item) => {
              if (item.center === v.id) {
                centers[index].zones.push(item.zoneId);
              }
            });
          }
        });
        this.selectedCenterDistricsList = centers;
      } else {
        this.selectedCenterDistricsList.forEach((v) => {
          v.zones.forEach((item, index) => {
            if (item === event.itemValue.zoneId) {
              v.zones.splice(index, 1);
            }
          });
        });
      }
    }
    console.log('alter rem0ve dis', this.selectedCenterDistricsList);
  }

  clearCenterDistrict() {
    const value = this.groupZoneIncidentCategory.get('mapAndList').value;
    const centerControl = this.groupZoneIncidentCategory.get('centerList');
    const zoneControl = this.groupZoneIncidentCategory.get('zoneId');
    this.checkMap = value === 'MAP';
    centerControl.clearValidators();
    zoneControl.clearValidators();
    centerControl.setValue(null);
    zoneControl.setValue(null);
    if (value === 'SELECT') {
      centerControl.setValidators([Validators.required]);
      zoneControl.setValidators([Validators.required]);
    }
    centerControl.setValue(null);
    zoneControl.setValue(null);
    centerControl.updateValueAndValidity();
    zoneControl.updateValueAndValidity();



    /*if (value === 'MAP' || value === 'CONTRACT_NO_SEARCH') {
      this.checkMap = true;
      centerControl.clearValidators();
      zoneControl.clearValidators();
      this.groupZoneIncidentCategory.reset();
    } else if (value === 'SELECT') {
      this.checkMap = false;
      centerControl.setValidators(Validators.required);
      zoneControl.setValidators(Validators.required);
      this.groupZoneIncidentCategory.reset();
    }


    if (value === 'MAP') {
      this.checkMap = true;
      centerControl.clearValidators();
      zoneControl.clearValidators();
    } else if (value === 'SELECT') {
      this.checkMap = false;
      centerControl.setValidators(Validators.required);
      zoneControl.setValidators(Validators.required);
      this.groupZoneIncidentCategory.reset();
    } else {
      this.checkMap = false;
      this.groupZoneIncidentCategory.reset();
      centerControl.clearValidators();
      zoneControl.clearValidators();
    }*/
  }

  getChildrenCategories() {
    const categories: any[] =
      this.commonService.getCommonData().incidentCategories;
    if (categories.length <= 0) {
      return [];
    }

    return categories.filter((item) => item.parent != null);
  }

  loadUsers(name?: string, direct = false, userType?: string) {
    const selectedUser = this.userGroupForm?.get('usersIds').value;
    const selectedManager = this.form?.get('userStructure').value;
    if (direct) {
      this.store.dispatch(
        new GroupAction.LoadGroupMapUserPage({
          name,
          page: 0,
          size: 15,
          selectedUsers: userType === 'manager' ? selectedUser : selectedManager,
          type: userType
        })
      );
      return;
    }
    this.LoadUsers$.next(name);
  }

  patchSelectedOrg(user: any) {
    const manager = user.find((item, index) => {
      if (item.type == userType.MANAGER) {
        return item.user;
      }
    });
    const memberArray: any[] = [];
    const member = user.find((item, index) => {
      if (item.type == userType.MEMBER) {
        memberArray.push(item.user);
        // return item.user;
      }
    });
    this.form.patchValue({
      userStructure: manager?.user,
    });

    console.log(memberArray);
    this.userGroupForm.patchValue({
      usersIds: memberArray,
    });
    console.log(user);
    this.cdr.detectChanges();
  }

  async patchGeometryLocation(locations) {
    if (locations) {
      if (locations.length > 0) {
        this.categories = [];
        this.namedLocations = [];
        // this.groupZoneIncidentCategory.get('mapAndList').setValue('true');
        this.incidentCategories$.map((v) => {
          locations[0].categoryIds.forEach((item) => {
            if (item === v.id) {
              this.categories.push(v);
            }
          });
        });
        this.incidentCategory.get('incidentCategory').setValue(this.categories);
        if (locations[0].location.length) {
          await this.loadGroupGeometryInfo(locations);
          // this.viewLocationOnly();
        }
        this.cdr.detectChanges();
      }
    }
  }

  patchIndentLocInfo(incidentLoc) {
    let centers = [];
    let incidentsCat = [];
    let zones = [];
    if (incidentLoc?.centers?.length > 0) {
      // this.checkMap = false;
      // this.groupZoneIncidentCategory.get('mapAndList').setValue(false);
      incidentLoc.centers.forEach((element) => {
        centers.push(element.centerId);
        incidentsCat.push(element.category.flatMap((v) => v.categoryId));
        zones.push(
          ...new Set(
            element.category?.flatMap((v) =>
              v.zones?.filter((v) => v > 0).flatMap((v) => v)
            )
          )
        );
      });
    }
    let categories = [];
    categories = this.getChildrenCategories();
    this.selectedCat = [];
    incidentsCat = [...new Set(...incidentsCat)];
    this.selectedCat = categories.filter((item) =>
      incidentsCat.includes(item.id)
    );
    console.log(this.selectedCat);
    this.incidentCategory.get('incidentCategory').setValue(this.selectedCat);

    this.selectedCenter = [];
    let selectedZones = [];
    centers = [...new Set(centers)];
    console.log(centers);
    console.log(this.areaItems);
    centers.filter((item) =>
      this.areaItems.forEach((itemArea) => {
        if (itemArea.center.id === item) {
          this.selectedCenter.push(itemArea);
        }
      })
    );
    console.log(this.selectedCenter);
    zones = [...new Set(zones)];
    console.log(zones);
    this.selectedZonesEdit = [];
    this.selectedCenter.forEach((item) => {
      this.loadDistrictList('', item.center, zones);
    });
    this.groupZoneIncidentCategory
      .get('centerList')
      .setValue(this.selectedCenter);
    // zones = zones?.filter((v) => v).map((item) => item?.toString());
    console.log(this.district);
  }

  loadGroupGeometryInfo(data: Array<GroupGeometryLocation>) {
    data
      .flatMap((v) => v.location)
      .forEach((loc) => {
        this.namedLocations.push({ ...loc, type: '', isEditing: false });
      });

    this.namedLocations.forEach((v) => {
      v.geometry = this.removeLastPointFromBackendGeometry(v.geometry);
    });
    console.log('test geo', this.namedLocations);
    this.cdr.detectChanges();
  }

  removeLastPointFromBackendGeometry(locationAsString: string) {
    if (locationAsString) {
      const location = this.mapStringToCoordinates(locationAsString);
      const locationPointsAsString = location.points.map((p) => {
        return p.map((d) => d.toString());
      });
      return this.mapCoordinatesToString(
        [locationPointsAsString],
        location.type.toUpperCase()
      );
    } else {
      return null;
    }
  }
  // GIS MAP contructors
  selectContructor(contract) {
    this.contract.contractNo = contract.CONTRACT_NO;
  }
  showContructorMap(contract) {
    this.mapService
      .openMap({
        mapType: MapViewType.TEAM,
        showLayers: false,
        viewOnly: true,
        showLocInfo : true,
        polygonLocation: {
          type: 'polygon',
          polygonRings: contract.geometry?.rings,
          Address: contract.attributes?.CONTRACT_NO,
        },
      })
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm() {
    this.activeTab = 0;
    const orgId = this.auth.getClaim('orgId');
    this.form = this.formBuilder.group({
      nameEn: [null, [Validators.required, GenericValidators.english]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      descEn: [null, [Validators.required, GenericValidators.english]],
      descAr: [null, [Validators.required, GenericValidators.arabic]],
      isActive: [true],
      shiftSchedule: [null],
      orgStructure: [{ key: orgId }, [Validators.required]],
      userStructure: [undefined, [Validators.required]],
    });
    this.defaultFormValue = {
      ...this.defaultFormValue,
      isActive: true,
      orgId: orgId,
    };
    this.orgs$
      .pipe(
        takeUntil(this.destroy$),
        filter((orgs) => !!orgs),
        take(1),
        tap((orgs) => {
          const o = orgs?.find((o) => o.id === orgId);
          this.defaultFormValue = {
            ...this.defaultFormValue,
            orgStructure: {
              key: o?.id,
              labelAr: o?.nameAr,
              labelEn: o?.nameEn,
              data: o,
            },
          };
          this.form.patchValue({
            orgStructure: this.defaultFormValue.orgStructure,
          });
        })
      )
      .subscribe();
  }

  buildUserForm() {
    this.userGroupForm = this.formBuilder.group({
      usersIds: [undefined, [Validators.required]],
    });
  }

  buildIncidentCategoryForm() {
    this.incidentCategory = this.formBuilder.group({
      incidentCategory: [null, [Validators.required]],
      geometryCategory: [null, [Validators.required]],
    });
  }

  buildGroupZoneIncidentCategoryForm() {
    this.groupZoneIncidentCategory = this.formBuilder.group({
      mapAndList: ['SELECT'],
      centerList: [null, [Validators.required]],
      zoneId: [undefined, [Validators.required]],
    });
  }

  submit() {
    const groupUser = [
      {
        id: 0,
        type: 1,
        user: null,
      },
    ];
    const viewGroup = document.getElementById('viewGroup');
    if (
      !this.form.valid &&
      viewGroup !== null &&
      this.privilegesService.checkActionPrivilege('PRIV_UP_GRP')
    ) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    if (this.form.dirty) {
      const group = {
        ...this.form.getRawValue(),
      };
      group.orgStructure = { id: group.orgStructure?.key };
      const groupUserValue = this.form.get('userStructure').value;
      groupUser[0].user = {
        id: groupUserValue.id,
      };
      if (this.editMode) {
        const manager = {
          id: 0,
          type: 1,
          user: groupUserValue.id,
        };
        group.id = this._groupId;
        this.store
          .dispatch(new BrowseGroupsAction.UpdateGroup(group))
          .pipe(
            takeUntil(this.destroy$),
            tap(() => {
              this.store.dispatch(
                new BrowseGroupsAction.UpdateManager({
                  groupId: this._groupId,
                  user: manager,
                })
              );
            }),
          )
          .subscribe();
      } else {
        this.store
          .dispatch(new BrowseGroupsAction.CreateGroup(group))
          .pipe(
            tap(() => {
              this.store.dispatch(
                new BrowseGroupsAction.CreateUser({
                  user: groupUser,
                })
              );
              this.groupZoneIncidentCategory.reset();
              this.incidentCategory.reset();
              this.userGroupForm.reset();
              console.log('clear bug');
              takeUntil(this.destroy$);
              take(1);
            })
          )
          .subscribe();
      }
    }

    if (this.userGroupForm.dirty) {
      if (!this.userGroupForm.valid) {
        this.userGroupForm.markAllAsTouched();
        FormUtils.ForEach(this.userGroupForm, (fc) => {
          fc.markAsDirty();
        });
        return;
      }
      const groupUserValue = {
        ...this.userGroupForm.getRawValue(),
      };
      groupUserValue.usersIds = groupUserValue.usersIds?.map((r) => r.id);
      console.log(groupUserValue);
      if (groupUserValue.usersIds.length === 1) {
        groupUser[0].type = 2;
        groupUser[0].user = {
          id: groupUserValue.usersIds[0],
        };
      } else {
        groupUserValue.usersIds.forEach((element, index) => {
          groupUser[index] = {
            id: 0,
            type: 2,
            user: {
              id: groupUserValue.usersIds[index],
            },
          };
        });
      }

      if (this._groupId) {
        if (this.editMode) {
          this.store.dispatch(
            new BrowseGroupsAction.UpdateUser({
              groupId: this._groupId,
              user: groupUser,
            })
          );
        } else {
          this.store.dispatch(
            new BrowseGroupsAction.CreateUser({
              groupId: this._groupId,
              user: groupUser,
            })
          );
        }
      }
    }
    /*if (this.groupZoneIncidentCategory.dirty) {
      if (!this.incidentCategory.valid) {
        this.incidentCategory.markAllAsTouched();
        FormUtils.ForEach(this.incidentCategory, (fc) => {
          fc.markAsDirty();
        });
        return;
      }
    }*/
    switch (this.groupZoneIncidentCategory.get('mapAndList').value) {
      case 'CONTRACT_NO_SEARCH': // mapAndList option == CONTRACT GIS SEARCH
        this.contract.groupId = this._groupId;
        this.store.dispatch(new BrowseGroupsAction.AddContract(this.contract));
        break;
      case 'MAP': // mapAndList option == MAP
        const incidentIds = this.incidentCategory.get('incidentCategory');
        if (!incidentIds.valid) {
          incidentIds.markAsTouched();
          incidentIds.markAsDirty();
          return;
        } else {
          const geometryLocation = {
            ...this.groupZoneIncidentCategory.getRawValue(),
          };

          if (this.groupGeometry.location) {
            this.submitGeometryLocations(geometryLocation);
          }
        }
        break;

      default: // default mapAndList value ==SELECT
        if (this._groupId) {
          let center;
          const controls = [
            this.groupZoneIncidentCategory.get('centerList'),
            this.groupZoneIncidentCategory.get('zoneId'),
            this.incidentCategory.get('incidentCategory')
          ];
          let anyInvalid = false;
          for (const control of controls) {
            if (!control.valid) {
              control.markAsTouched();
              control.markAsDirty();
              anyInvalid = true;
            }
          }
          if (anyInvalid) {
            return;
          }

          const selectedIncidentCategories =
            this.incidentCategory.get('incidentCategory').value;
          center = [];
          selectedIncidentCategories.forEach((element) => {
            this.selectedCenterDistricsList.forEach((v, index) => {
              const item = {
                incidentCategoryId: element.id,
                centerId: v.centerId,
                zones: v.zones,
                allZones: false,
              };
              center.push(item);
            });
          });
          const action = this.editMode
            ? new BrowseGroupsAction.UpdateIncidentLocInfo({ groupId: this._groupId, centers: center })
            : new BrowseGroupsAction.AddIncidentLocInfo({ groupId: this._groupId, centers: center });

          this.store.dispatch(action);
        }
        break;
    }
  }

  // mapAndList option == MAP
  submitGeometryLocations(geometryLocationForm) {
    const selectedCategoriesIds = {
      ...this.incidentCategory.getRawValue(),
    };
    this.groupGeometry.groupId = this._groupId;
    this.namedLocations.forEach((loc, i, arr) => {
      if (loc.type.includes('POLYLINE')) {
        loc.geometry = loc.geometry
          .replace('POLYLINE', 'LINESTRING')
          .replace('((', '(')
          .replace('))', ')');
      }
      delete loc.type;
      delete loc.isEditing;
    });
    this.groupGeometry.location = [...this.namedLocations];
    this.groupGeometry.categoryIds = selectedCategoriesIds.incidentCategory.map(
      (v) => v.id
    );

    this.store.dispatch(
      new BrowseGroupsAction.AddGeometryLocation(this.groupGeometry)
    );
  }

  delete() {
    const group = {
      ...this.form.getRawValue(),
    };
    group.id = this._groupId;
    group.isActive = false;
    group.global = null;
    group.orgStructure = { id: group.orgStructure?.key };
    this.store.dispatch(new BrowseGroupsAction.DeletedGroup(group));
  }

  clear() {
    if (this.activeTab === 1) {
      // this.signatureImg = undefined;
      return;
    } else if (this.activeTab === 2) {
      // this.profileImg = undefined;
      return;
    }
    this.form.reset();
    this.groupZoneIncidentCategory.reset();
    this.incidentCategory.reset();
    this.userGroupForm.reset();
    this.form.patchValue(this.defaultFormValue);
    this.cdr.detectChanges();
  }

  close() {
    if (this.asDialog) {
      this.store.dispatch(new BrowseGroupsAction.ToggleDialog({}));
      this.groupZoneIncidentCategory.reset();
      this.incidentCategory.reset();
    } else {
      this.router.navigate(['..'], { relativeTo: this.route });
    }
  }

  loadCenterListCall() {
    this.store.dispatch(new CenterAction.LoadServiceCenterList());
  }

  async tab(index: number) {
    const mode = '';
    const viewGroup = document.getElementById('viewGroup');
    if (viewGroup !== null) {
    } else {
      index = index + 1;
    }
    switch (index) {
      case 1:
        this.loadUsers('', true);
        break;
      case 2:
        this.loadCenterListCall();
        await this.loadGeometry();
        await this.loadIncidentLocation();
        setTimeout(() => {
          if (this._mode && this.checkMap && this.namedLocations.length > 0) {
            this.loadMapComponent();
          }
        }, 2000);
        break;
      default:
        break;
    }
  }

  getCategoryName(id: number[]) {
    this.categoryName = [];
    let categories: any[] = this.commonData['incidentCategories'];
    for (let i = 0; i < id.length; i++) {
      for (let j = 0; j < categories.length; j++) {
        if (categories[j].id === id[i]) {
          this.categoryName.push(
            this.lang == 'en' ? categories[j].nameEn : categories[j].nameAr
          );
          break;
        }
      }
    }
  }

  async loadGeometry() {
    this.store
      .dispatch([
        new GroupAction.GetGeometryLocation({ id: this._groupId }),
        new BrowseGroupsAction.GetContract({
          groupId: this._groupId,
        }),
      ])
      .pipe(
        switchMap(() => this.store.select(GroupState.geometryResponse)),
        takeUntil(this.destroy$),
        take(1),
        tap((geometryLocation) => {
          // console.log('geo good ', geometryLocation);
          if ((geometryLocation as any).length > 0) {
            this.checkMap = true;
            this.groupZoneIncidentCategory.get('mapAndList').setValue('MAP');
            this.cdr.detectChanges();
            __await(this.patchGeometryLocation(geometryLocation));
          } else {
            this.checkMap = false;
            this.groupZoneIncidentCategory.get('mapAndList').setValue('SELECT');
            this.incidentCategory.reset();
            this.namedLocations = [];
            this.categories = [];
          }
        })
      )
      .subscribe();
  }

  async loadIncidentLocation() {
    this.store
      .dispatch(
        new IncicentLocationInfoAction.GetIncidentLocationInfo({
          id: this._groupId,
        })
      )
      .pipe(
        switchMap(() =>
          this.store.select(IncidentLocInfoState.getIncidentLocInfo)
        ),
        takeUntil(this.destroy$),
        take(1),
        switchMap((incidentLocInfo) => {
          return this.centerList$.pipe(
            filter((value) => !!value),
            tap((data) => {
              this.areaItems = [];
              this.district = [];
              if (data) {
                data.forEach((element) => {
                  this.areaItems.push(new AreaItem(element));
                });
              }
            }),
            map(() => incidentLocInfo)
          );
        }),
        takeUntil(this.destroy$),
        take(1),
        tap((incidentLocInfo) => {
          if (incidentLocInfo) {
            this.checkMap = false;
            this.groupZoneIncidentCategory.get('mapAndList').setValue('SELECT');
            this.cdr.detectChanges();
            this.patchIndentLocInfo(incidentLocInfo);
          } else {
            this.selectedCat = [];
            this.selectedCenter = [];
          }
        })
      )
      .subscribe();
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

    const task = this.store.selectSnapshot(TaskState.task);
    this.groupConfig = [];
    for (let i = 0; i < this.namedLocations.length; i++) {
      const loc = this.namedLocations[i];
      const geometry = this.mapStringToCoordinates(loc.geometry);
      const Config: MapConfig = {
        mapType: MapViewType.TEAM,
        showLayers: false,
        viewOnly: true,
        polygonLocation:
          geometry?.type == 'polygon'
            ? {
                type: geometry.type,
                polygonRings: geometry.points,
                Address: this.namedLocations[i].name,
              }
            : null,
        polylineLocation:
          geometry?.type == 'polyline'
            ? {
                type: geometry.type,
                polylinePaths: geometry.points,
                Address: this.namedLocations[i].name,
              }
            : null,
      };
      this.groupConfig.push(Config);
    }
    instance.config = this.groupConfig as any;
    instance.smallSize = true;
    this.mapComponent = instance;
    cdr.detectChanges();
  }

  ngAfterViewChecked() {
    const checkUpdateGroup =
      this.privilegesService.checkActionPrivilege('PRIV_UP_GRP');
    if (!checkUpdateGroup) {
      this.form.disable();
    }
    const checkUpdateUser =
      this.privilegesService.checkActionPrivilege('PRIV_ED_USR_GRP');
    if (!checkUpdateUser) {
      this.userGroupForm.disable();
    }
    const checkUpdateLocation = this.privilegesService.checkActionPrivilege(
      'PRIV_ED_LOC_INC_GRP'
    );
    if (!checkUpdateLocation) {
      this.incidentCategory.disable();
      this.groupZoneIncidentCategory.disable();
    }
  }
  enableForm() {
    this.form.enable();
  }
  removeChip(chip: any, event: MouseEvent) {
    const selectedUser = this.userGroupForm.get('usersIds').value;
    selectedUser.forEach((element, index) => {
      if (element.id === chip.id) {
        selectedUser.splice(index, 1);
      }
    });
    this.userGroupForm.patchValue({
      usersIds: selectedUser,
    });
  }
}
