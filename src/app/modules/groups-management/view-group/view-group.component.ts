import { Location } from '@angular/common';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GroupModel, userType } from '../group.model';
import { GroupsManagementService } from '../groups-management.service';
import { TranslationService } from '../../i18n/translation.service';
import {catchError, concatMap, map, pluck, reduce, tap} from 'rxjs/operators';
import { IncidentsService } from '@core/api/services/incident.service';
import {
  AreaItem,
  Center,
  GeometryType,
  GroupGeometryLocation,
  IncidentGroupViewsEnum,
  Zone
} from '../group-incidents-categroies/center.model';
import { C, P } from '@angular/cdk/keycodes';
import { AppCommonData, IncidentCategory2 } from '@core/entities/AppCommonData';
import { CommonService } from '@core/services/common.service';
import {EMPTY, forkJoin} from 'rxjs';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {MatDrawer} from "@angular/material/sidenav";
import {HttpErrorResponse} from "@angular/common/http";
import {MapViewType} from "@shared/components/map/utils/MapViewType";
import {MapConfig, MapService} from "@shared/components/map/services/map.service";

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss'],
})
export class ViewGroupComponent implements OnInit {
  toList: any[] = [];
  toUsersList: any[] = [];
  lang = 'en';
  id: number;
  public group: any;
  centers: Center[] = [];
  commonData: AppCommonData;
  public users: any[] = [];
  groupIncidentLocationInfo: {
    groupId: number;
    centers: {
      category: [
        {
          categoryObj: IncidentCategory2;
          categoryId: number;
          zones: Number[];
          zonesObj: Zone[];
        }
        ];

      centerId: number;
      Center?: Center;
    }[];
  };
  namedLocations: {
    geometry: string;
    name: string;
    type: string;
    isEditing?: boolean;
  }[] = [];
  userTypes = userType;
  // variable
  currentTab = 0;
  isMobileView = true;
  showMapLocation = true;
  incidentId: any;
  incidentDetails: any;
  @ViewChild('drawer', { static: true }) drawer: MatDrawer;
  //areaItems: AreaItem[] = [];
  loading = true;
  isAddMode = true;
  selectedApproach = IncidentGroupViewsEnum.MAP;
  public groupConfig: MapConfig[];
  public categoryName: string[];

  tabs = [
    {
      key: 'GROUP.GROUP_INFO',
      icon: 'Code/Info-circle',
      index: 0,
    },
    {
      key: 'GROUP.CATEGORIES_LOCATIONS',
      icon: 'Code/Git4',
      index: 1,
    }
  ];
  config = {
    mapType: 'incident',
    zoomModel: {
      referenceId: "12345",
      featureName: "Ploygon"
    },
    viewOnly: true,
    showLayers: false,
    showLocInfo: false
  }
  constructor(
    private route: ActivatedRoute,
    private groupManagementservice: GroupsManagementService,
    private translationService: TranslationService,
    private _location: Location,
    private cdr: ChangeDetectorRef,
    private incidentsService: IncidentsService,
    public matDialog: MatDialog,
    private commonService: CommonService,
    private groupsServices: GroupsManagementService,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
    protected mapService: MapService,
  ) {
    this.incidentId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.lang = this.translationService.getSelectedLanguage();
    this.id = +this.route.snapshot.params['id'];
    this.commonData = this.commonService.getCommonData();
    const groupRequest = this.groupManagementservice.getGroupById(this.id);
    const groupUserRequest = this.groupManagementservice.getGroupsUsers(
      this.id
    );

    forkJoin({
      group: groupRequest,
      groupUsers: groupUserRequest,
    }).subscribe(({group, groupUsers}) => {
      this.users = groupUsers;
      this.users = this.swapArrayElements(this.users);
      console.log(this.users);
      this.group = group;
    });

    const centersRequest = this.incidentsService.getCentersForCurrentOrg().pipe(
      pluck('result'),
      reduce((acc: any[], curr) => [...acc, curr])
    );

    forkJoin({
      centers: centersRequest,
      incidentLocationInfo: this.groupsServices.getIncidentsLocationInfo(
        this.id,
        true
      ),
    }).subscribe(({centers, incidentLocationInfo}) => {
      this.centers = centers;
      this.groupIncidentLocationInfo = incidentLocationInfo;
      const centersMap: Map<number, Center> = new Map<number, Center>();
      this.centers.forEach((center) => centersMap.set(center.id, center));
      if (this.groupIncidentLocationInfo) {
        this.groupIncidentLocationInfo.centers.forEach((center) => {
          center.Center = centersMap.get(center.centerId);
          center.category.forEach((cat) => {
            cat.categoryObj = this.commonData.incidentCategories.find(
              (v) => v.id == cat.categoryId
            );
          });
          this.groupsServices
            .getCenterZones(center.centerId)
            .pipe(pluck('result'))
            .subscribe((data: Zone[]) => {
              const zones: Map<Number, Zone> = new Map();
              center.category
                .flatMap((cat) => cat.zones)
                .forEach((z) => zones.set(z, null));
              data = data.filter((z: Zone) => zones.has(+z.zoneId));
              center.category.forEach((cat) => {
                cat.zonesObj = data;
              });
              this.cdr.detectChanges();
            });
        });
      }
    });
    // process  view  and  responsive
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.isMobileView = state.matches;
        this.isMobileView ? this.drawer.close() : this.drawer.open();
        this.cd.detectChanges();
      });
    this.checkIfEditMode();
  }

  swapArrayElements(user: any[]): any[] {
    if (user.length > 0) {
      if (user[0].type === 1){
        return user;
      } else {
        for (let i = 0; i < user.length ; i++) {
          const temp = user[0];
          if (user[i].type === 1) {
            user[0] = user[i];
            user[i] = temp;
          }
        }
        return user;
      }
    }
  }
  getCategoryName(id: number[]) {
    this.categoryName = [];
    let categories: any[] = this.commonData['incidentCategories'];
    for (let i = 0 ; i < id.length; i++) {
      for (let j = 0; j < categories.length; j++){
        if (categories[j].id === id[i]) {
          this.categoryName.push(this.lang == 'en' ? categories[j].nameEn : categories[j].nameAr);
          break;
        }
      }
    }
  }

  backClicked() {
    this._location.back();
  }

  changeCurrentTab(tab) {
    this.currentTab = tab.index;
    if (this.currentTab === 1) {
     // this.viewLocation();
    }
  }

  showShareMapLocation(event) {
    this.showMapLocation = event;
  }

  checkIfEditMode() {
    forkJoin({
      geometryLocationInfo: this.groupsServices.getGroupGeometryLocation(
        +this.id
      ),
    })
      .pipe(
        catchError((errResponse, caught) => {
          this.loading = false;
          // The  handle error  to  decide if  we  are  on edit mode or not
          if (errResponse instanceof HttpErrorResponse) {
            const errorObj = errResponse.error;
            if (
              errorObj['error'] &&
              errorObj['error']['code'] == 'INVALID_GROUP'
            ) {
              this.isAddMode = true;
            }
          }
          return EMPTY;
        })
      )
      .subscribe(({geometryLocationInfo}) => {
        this.isAddMode = false;
        const location = (geometryLocationInfo['result'] as any[]).flatMap(
          (v) => v.location
        );
        const categoryID = (geometryLocationInfo['result'] as any[]).flatMap(
          (v) => v.categoryIds
        );
        if (location.length) {
          this.selectedApproach = IncidentGroupViewsEnum.MAP;
          geometryLocationInfo &&
          this.loadGroupGeometryInfo(geometryLocationInfo['result']);
          this.viewLocation();
        }
        if (categoryID.length) {
          this.getCategoryName(categoryID);
        }
        this.loading = false;
      });
  }

  loadGroupGeometryInfo(data: Array<GroupGeometryLocation>) {
    data
      .flatMap((v) => v.location)
      .forEach((loc) => {
        this.namedLocations.push({...loc, type: '', isEditing: false});
      });
    this.namedLocations.forEach((v) => {
      v.geometry = this.removeLastPointFromBackendGeometry(v.geometry);
    });
  }
  removeLastPointFromBackendGeometry(locationAsString: string) {
    if (locationAsString) {
      let location = this.mapStringToCoordinates(locationAsString);
      let locationPointsAsString = location.points.map((p) => {
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
    let coordinatesArr = coordinates.split(',');
    let newCoordinatesArrNumber = [];
    coordinatesArr.forEach((value, i, arr) => {
      value = value.trim();
      if (i !== arr.length - 1) {
        let newCoordinates = value.split(' ');
        newCoordinatesArrNumber.push(newCoordinates.map((v) => +v));
      }
    });
    return {type: type.toLowerCase(), points: newCoordinatesArrNumber};
  }

   viewLocation() {
    this.groupConfig = [];
    for (let i = 0; i < this.namedLocations.length; i++) {
      const loc = this.namedLocations[i];
      const geometry = this.mapStringToCoordinates(loc.geometry)
      const Config = {
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
   // this.openLocationDialoug(this.groupConfig);
  }


  /*openLocationDialoug(config: Array<MapConfig>) {
    this.mapService
      .openMapViewGroup(config)
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
        //this.namedLocations[i].geometry = locationAsString;
        //this.namedLocations[i].type = type;
      });
  }*/
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
}
