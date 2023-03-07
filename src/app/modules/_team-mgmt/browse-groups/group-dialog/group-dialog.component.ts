import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TreeNode} from "primeng/api";
import {DistrictNameProjection, IdNameProjection, OrgStructure, UserAndRoleProjection} from "../../../../api/models";
import {auditTime, catchError, distinctUntilChanged, filter, finalize, map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {GroupAction, OrgAction, OrgState, RoleAction, RoleState, UserAction, UserState} from "@core/states";
import {EMPTY, Observable, Subject} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegxConst} from "@core/constant/RegxConst";
import {Select, Store} from "@ngxs/store";
import {CroppedEvent} from "@shared/sh-components/photo-editor";
import {GenericValidators} from "@shared/validators/generic-validators";
import {FormUtils} from "@core/utils/form.utils";
import {IAuthService} from "@core/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {BrowseGroupsAction} from "../../states/browse-groups.action";
import {TranslationService} from "../../../i18n/translation.service";
import {GroupState} from "@core/states/group/group.state";
import {userType} from "../../../groups-management/group.model";
import {CommonService} from "@core/services/common.service";
import {CenterState} from "@core/states/service-center-area/centers/center.state";
import {CenterAction} from "@core/states/service-center-area/centers/center.action";
import {IncidentLocInfoState} from "@core/states/incident-location-info/incidentLocInfo.state";
import {IncicentLocationInfoAction} from "@core/states/incident-location-info/incidentLocInfo.action";
import {AreaItem, GeometryType, GroupGeometryLocation} from "../../../groups-management/group-incidents-categroies/center.model";
import {MapViewType} from "@shared/components/map/utils/MapViewType";
import {MapService} from "@shared/components/map/services/map.service";

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit, OnDestroy {

  RegxConst = RegxConst;

  opened$: Observable<boolean>;
  @Input()
  activeTab: number = 0;

  @Select(OrgState.orgs)
  orgs$: Observable<OrgStructure[]>;

  @Select(UserState.groupMapUsers)
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

  public incidentCategories$: any[];

  public district: any[] = [];
  public users: any[];

  public previous = 0;
  public previousDistrict = 0;
  public selectedCenterDistricsList: any[] = [];

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
  disabledUsers = [];
  responseFromIncidentLoc: any = [];

  _userId: number;
  get loggedinUserId() {
    return this.auth.getClaim('sub');
  }
  get editMode() {
    return this._userId !== undefined && this._userId !== null;
  }
  groupGeometry: GroupGeometryLocation = {
    groupId: 0,
    location: [],
    categoryIds: [],
  };

  namedLocations: {
    geometry: string;
    name: string;
    type: string;
    isEditing?: boolean;
  }[] = [];

  @Input()
  set userId(v: number) {
    this._userId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.loadUsers('', true);
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
          this.users = user.users;
          this.disabledUsers = user.users;
          this.patchSelectedOrg(user.users);
        }),
      )
      .subscribe();
    this.store.dispatch(new GroupAction.GetGeometryLocation({id: v}))
      .pipe(
        switchMap(() => this.store.select(GroupState.geometryResponse)),
        takeUntil(this.destroy$),
        take(1),
        tap((geometryLocation) => {
          this.patchGeometryLocation(geometryLocation);
        }),
      ).subscribe();
    this.store.dispatch(new IncicentLocationInfoAction.GetIncidentLocationInfo({id: v}))
      .pipe(
        switchMap(() => this.store.select(IncidentLocInfoState.getIncidentLocInfo)),
        takeUntil(this.destroy$),
        take(1),
        tap((incidentLocInfo) => {
          this.responseFromIncidentLoc = incidentLocInfo;
        }),
      ).subscribe();
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
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.userId = id;
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

/*    this.districtList$.pipe(
      tap((v) => {
        console.log(v);
      })
    ).subscribe();

    this.centerList$.pipe(
      tap((v) => {
        console.log(v);
      })
    ).subscribe();*/
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
      new CenterAction.LoadServiceCenterList()
    ]);
    this.LoadUsers$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((name) => {
        this.store.dispatch(
          new UserAction.LoadGroupMapUserPage({
            name,
            page: 0,
            size: 15,
          })
        );
      });
    this.centerList$.pipe(takeUntil(this.destroy$), auditTime(1000), take(2)).subscribe((data) => {
      if (data) {
        data.forEach((element) => {
          this.areaItems.push(new AreaItem(element));
        });
      }
      this.patchIndentLocInfo(this.responseFromIncidentLoc);
    });
  }

  isDisabled(id) {
    console.log(id)
    if (this.disabledUsers) {
      this.disabledUsers.findIndex((item) => {
        if (item.user.id === id) {
          return true;
        } else {
          return false;
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
        // this.groupGeometry.locations.push(locationAsString);
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

  loadDistrictList(event) {
    let id;
    let index;
    event.value.forEach(v => {
      if (v.center.index === event.itemValue.center.index) {
        id = v.center.id;
        index = v.center.index;
      }
    });
    if (event.value.length > this.previous) {
      this.previous = event.value.length;
      this.store.dispatch([
        new CenterAction.LoadDistrictList({centerId: id})
      ]).pipe(
        map((res) => {
          this.areaItems.forEach((v, index) => {
            if (v.center.id === event.itemValue.center.id) {
              this.areaItems[index].zones = res[0].serviceCenterArea.districtList;
            }
          });
          const tempZone = {
            id : this.areaItems[index].center.id,
            nameAr: this.areaItems[index].center.nameAr,
            nameEn: this.areaItems[index].center.nameEn,
            items: this.areaItems[index].zones
          };
          this.district.push(tempZone);
          this.cdr.detectChanges();
          this.groupZoneIncidentCategory.get('zoneId').updateValueAndValidity();

        }),
        takeUntil(this.destroy$), auditTime(1000), take(1)).subscribe((res) => {
      });
    } else {
      const removeIndex = event.itemValue.center.index;
      this.previous = event.value.length;
      this.areaItems[removeIndex].zones = [];
      const selectdZones = this.groupZoneIncidentCategory.get('zoneId').value as any[];
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

  onDistrictSelect(event) {
    // const incidentCategories = this.groupZoneIncidentCategory.get('incidentCategory').value;
    const selectdZones = this.groupZoneIncidentCategory.get('zoneId').value as any[];
    const centers = [];
    if (event.value.length > this.previousDistrict) {
      this.district.forEach((v, index) => {
        centers.push({
          incidentCategoryId : null,
          zones: [],
          centerId: v.id,
          allZones: false
        });
        if (selectdZones) {
          selectdZones.forEach((item) => {
            if (item.center === v.id) {
              centers[index].zones.push(item.zoneId);
            }
          });
        }
      });
      console.log(centers);
      this.selectedCenterDistricsList = centers;
    } else {
      this.selectedCenterDistricsList.forEach((v) => {
        v.zones.forEach((item, index) => {
          if (item === event.itemValue.zoneId) {
            v.zones.splice(index, 1);
          }
        })
      });
    }
    console.log('alter rem0ve dis', this.selectedCenterDistricsList)

  }

  /*selectedDistrict(event) {
    const centerList = this.groupZoneIncidentCategory.get('centerList').value;
    const incidentCategories = this.groupZoneIncidentCategory.get('incidentCategory').value;
    const centers = [];
    if (event.value.length > this.previousDistrict) {
      this.previousDistrict = event.value.length;
      centerList.forEach((v, index) => {
        centers.push({
          incidentCategoryId : incidentCategories,
          zones: [],
          centerId: v.id,
          allZones: false
        });
        event.value.forEach((i) => {
          if (v.id === event.itemValue.center) {
            centers[index].zones.push(i.zoneId);
          }
        });
      });
      console.log(centers);
    }

  }*/

  getChildrenCategories() {
    const categories: any[] =
      this.commonService.getCommonData().incidentCategories;
    if (categories.length <= 0) {
      return [];
    }

    return categories.filter((item) => item.parent != null);
  }

  loadUsers(name?: string, direct = false) {
    if (direct) {
      this.store.dispatch(
        new UserAction.LoadGroupMapUserPage({
          name,
          page: 0,
          size: 15,
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
      userStructure: manager?.user
    });

    console.log(memberArray);
    this.userGroupForm.patchValue({
      usersIds: memberArray
    });
    console.log(user);
    this.cdr.detectChanges();
  }

  patchGeometryLocation(locations) {
    if (locations.length > 0) {
      const categories = [];
      this.namedLocations = [];
      this.groupZoneIncidentCategory.get('mapAndList').setValue('true');
      this.checkMap = true;
      this.incidentCategories$.map((v) => {
        locations[0].categoryIds.forEach((item) => {
          if (item === v.id) {
            categories.push(v);
          }
        });
      });
      this.incidentCategory.get('incidentCategory').setValue(categories);
      if (locations[0].location.length) {
        this.loadGroupGeometryInfo(locations);
      }
      this.cdr.detectChanges();
    }
  }

  patchIndentLocInfo(incidentLoc) {
    console.log('incident', incidentLoc);
    let centers = [];
    let incidentsCat = [];
    let zones = [];
    if (incidentLoc.centers.length > 0) {
      this.checkMap = false;
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
    let selectedCat = [];
    incidentsCat = [...new Set(...incidentsCat)];
    selectedCat = categories.filter((item) =>
      incidentsCat.includes(item.id)
    );
    console.log(selectedCat);
    this.incidentCategory.get('incidentCategory').setValue(selectedCat);
    console.log(centers);
    console.log(zones);
    let selectedCenter = [];
    centers = [...new Set(centers)];
    console.log(this.areaItems);
    // selectedCenter = this.areaItems.filter((item) => item.center.filter((center) => centers.includes(center.id)))
    this.groupZoneIncidentCategory.get('centerList').setValue([...new Set(centers)]);
    zones = zones?.filter((v) => v).map((item) => item?.toString());
    this.groupZoneIncidentCategory.get('zoneId').setValue([...new Set(zones)]);
    this.cdr.detectChanges();
  }

  loadGroupGeometryInfo(data: Array<GroupGeometryLocation>) {
    data
      .flatMap((v) => v.location)
      .forEach((loc) => {
        this.namedLocations.push({ ...loc, type: '', isEditing: false });
      })

    this.namedLocations.forEach((v) => {
      v.geometry = this.removeLastPointFromBackendGeometry(v.geometry);
    });
    console.log('test geo', this.namedLocations)
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
      shiftSchedule: [null, [Validators.required]],
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

    // this.addPassword();

/*    this.form
      .get('orgStructure')
      .valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((org: TreeNode) => {
        this.store.dispatch(
          new RoleAction.LoadRoles({ orgId: org?.key as any })
        );
      });*/
  }

  buildUserForm() {
    this.userGroupForm = this.formBuilder.group({
      usersIds: [undefined, [Validators.required]],
    });
  }

  buildIncidentCategoryForm() {
    this.incidentCategory = this.formBuilder.group({
      incidentCategory: [null, [Validators.required]],
    });
  }

  buildGroupZoneIncidentCategoryForm() {
    this.groupZoneIncidentCategory = this.formBuilder.group({
      mapAndList: [false],
      centerList: [null, [Validators.required]],
      zoneId: [undefined, [Validators.required]]
    });
    }


  submit() {
    const groupUser = [{
      id: 0,
      type: 1,
      user: null
    }];

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    if (this.form.dirty) {
      // Check validation for group
      // group value
      const group = {
        ...this.form.getRawValue(),
      };
      group.orgStructure = {id: group.orgStructure?.key };
      const groupUserValue = this.form.get('userStructure').value;
      groupUser[0].user = {
        id : groupUserValue.id
      };
      if (this.editMode) {
        const manager = {
          id: 0,
          type: 1,
          user: groupUserValue.id
        }
        group.id = this._userId;
        this.store.dispatch(new BrowseGroupsAction.UpdateGroup(group)).pipe(
           tap(() => {
             this.store.dispatch(new BrowseGroupsAction.UpdateManager({
               groupId: this._userId,
               user: manager
             }));
             takeUntil(this.destroy$);
             take(1);
           }),
         ).subscribe();
      } else {
        this.store.dispatch(new BrowseGroupsAction.CreateGroup(group)).pipe(
          tap(() => {
            this.store.dispatch(new BrowseGroupsAction.CreateUser({
              user: groupUser
            }));
            takeUntil(this.destroy$);
            take(1);
          }),
        ).subscribe();
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
          id : groupUserValue.usersIds[0]
        };
      } else {
        groupUserValue.usersIds.forEach((element, index) => {
          groupUser[index] = {
            id: 0,
            type: 2,
            user: {
              id: groupUserValue.usersIds[index]
            }
          };
        });
      }

      if (this._userId) {
        if (this.editMode) {
          this.store.dispatch(new BrowseGroupsAction.UpdateUser({groupId: this._userId, user: groupUser}));
        } else {
         this.store.dispatch(new BrowseGroupsAction.CreateUser({groupId: this._userId, user: groupUser}));
        }
      }
    }

    // For map

    if (this.groupZoneIncidentCategory.get('mapAndList').value) {
      const geometryLocation = {
        ...this.groupZoneIncidentCategory.getRawValue(),
      };
      if (this.groupGeometry.location.length > 0) {
        this.submitGeometryLocations(geometryLocation);
      }
    } else {
      const centerList = this.groupZoneIncidentCategory.get('centerList');
      const zoneId = this.groupZoneIncidentCategory.get('zoneId');
      const incidentIds = this.incidentCategory.get('incidentCategory');
      if (!centerList.valid) {
        centerList.markAsTouched();
        centerList.markAsDirty();
        return;
      }
      if (!zoneId.valid) {
        zoneId.markAsTouched();
        zoneId.markAsDirty();
        return;
      }
      if (!incidentIds.valid) {
        incidentIds.markAsTouched();
        incidentIds.markAsDirty();
        return;
      }
      const selectedIncidentCategories = this.incidentCategory.get('incidentCategory').value;
      const center = []
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
      console.log('centers', center);
      if (this._userId) {
        if (this.editMode) {
          this.store.dispatch(new IncicentLocationInfoAction.UpdateIncidentLocationInfo({
            groupId: this._userId, centers: center}));
        } else {
          this.store.dispatch(new IncicentLocationInfoAction.IncidentLocationInfo({
            groupId: this._userId, centers: center}));
        }
      }
    }


    if (this.groupZoneIncidentCategory.dirty) {
      if (!this.incidentCategory.valid) {
        this.incidentCategory.markAllAsTouched();
        FormUtils.ForEach(this.incidentCategory, (fc) => {
          fc.markAsDirty();
        });
        return;
      }


    /*  if (this.groupZoneIncidentCategory.get('mapAndList').value === true) {
        const incidentCategoriesIds = [];
        selectedIncidentCategories.forEach((v) => {
          incidentCategoriesIds.push(v.id);
        });
        const geometryLocation = {
          ...this.groupZoneIncidentCategory.getRawValue(),
        };
        this.submitGeometryLocations(geometryLocation);
      } else {

        const groupZone = {
          ...this.groupZoneIncidentCategory.getRawValue(),
        };

      }*/

      /*if (this._userId) {
        if (this.editMode) {}
        this.store.dispatch(new BrowseGroupsAction.CreateUser({groupId: this._userId, user: groupUser}));
      }*/

    }

    if (this.activeTab === 0) {
      return;
    } else if (this.activeTab === 2) {
      // this.profileImg = undefined;
      return;
    }
  }

  submitGeometryLocations(geometryLocationForm) {
    const selectedCategoriesIds = {
      ...this.incidentCategory.getRawValue(),
    };
    this.groupGeometry.groupId = this._userId;
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
    this.groupGeometry.categoryIds = selectedCategoriesIds.incidentCategory.map((v) => v.id);

    this.store.dispatch(new BrowseGroupsAction.AddGeometryLocation(this.groupGeometry));

   /* if (this.isAddMode) {
      this.groupsServices
        .createGroupGeometryLocation(this.groupGeometry)
        .subscribe((res) => {
          this.loading = false;
          this.alertService.openSuccessSnackBar();
          this.dialogRef.close();
        });
    } else {
      this.groupsServices
        .updateGroupGeometryLocation(this.groupGeometry)
        .subscribe((res) => {
          this.loading = false;
          this.alertService.openSuccessSnackBar();
          this.dialogRef.close();
        });
    }*/
  }

  delete() {
    const group = {
      ...this.form.getRawValue(),
    };
    group.id = this._userId;
    group.isActive = false;
    group.global = null;
    group.orgStructure = {id: group.orgStructure?.key };
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
    // this.store.dispatch(new UserAction.GetUser({}));
    // this.patchMobile([]);
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    this.cdr.detectChanges();
  }

  close() {
    this.store.dispatch(new BrowseGroupsAction.ToggleDialog({}));
  }

}
