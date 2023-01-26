import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IStorageService } from '@core/services/storage.service';
import { EventsManagementService } from '../../events-management/events-management.service';
import { TranslationService } from '../../i18n/translation.service';
import * as _ from 'lodash';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { catchError, map, startWith, filter } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { EMPTY, forkJoin, Observable } from 'rxjs';
import { GroupsManagementService } from '../groups-management.service';
import {
  AreaItem,
  GeometryType,
  GroupGeometryLocation,
  IncidentGroupViewsEnum,
} from './center.model';
import { MatOptionSelectionChange } from '@angular/material/core';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GroupModel } from '../group.model';
import { AppCommonData } from '@core/entities/AppCommonData';
import { AppCommonDataService } from '@core/services/app-common-data.service';
import { IncidentsService } from '@core/api/services/incident.service';
import { Directionality } from '@angular/cdk/bidi';
import { MapService } from '@shared/components/map/services/map.service';
import { MapViewType } from '@shared/components/map/utils/MapViewType';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-group-incidents-categroies',
  templateUrl: './group-incidents-categroies.component.html',
  styleUrls: ['./group-incidents-categroies.component.scss'],
})
export class GroupIncidentsCategroiesComponent implements OnInit {
  // UI
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  currentGroup: GroupModel;
  formGroup: FormGroup;
  // Variables
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl();
  filteredCategories: Observable<string[]>;
  selectedCategories: any[] = [];
  lang = 'en';
  commonData: AppCommonData;
  id: string;
  isAddMode = true;
  categories = [];
  areaItems: AreaItem[] = [];
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

  loading = true;
  locationApproach = [
    { name: 'GROUP.MAP', value: IncidentGroupViewsEnum.MAP },
    { name: 'GROUP.SELECT', value: IncidentGroupViewsEnum.SELECT },
  ];

  selectedApproach = IncidentGroupViewsEnum.MAP;

  constructor(
    private managementService: EventsManagementService,
    private groupsServices: GroupsManagementService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translationService: TranslationService,
    private storageService: IStorageService,
    public dialogRef: MatDialogRef<GroupIncidentsCategroiesComponent>,
    private alertService: AlertsService,
    private appCommonService: AppCommonDataService,
    private incidentsService: IncidentsService,
    public directionality: Directionality,
    protected mapService: MapService,
    private cdr: ChangeDetectorRef
  ) {
    this.lang = this.translationService.getSelectedLanguage();
    this.commonData = this.appCommonService.getCommonData();
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((category: any | null) => {
        return category ? this._filter(category) : this.categories.slice();
      })
    );
  }

  ngOnInit(): void {
    if (this.data['id']) {
      this.id = this.data['id'];
      this.currentGroup = this.groupsServices.getById(parseInt(this.id));
    }
    this.createForm();

    this.categories = this.getChildrensCategories();
    this.incidentsService.getCentersForCurrentOrg().subscribe(
      (data) => {
        if (data) {
          data['result'].forEach((element) => {
            this.areaItems.push(new AreaItem(element));
          });
          this.checkIfEditMode();
        }
      },
      (error) => {}
    );
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      centers: [[], Validators.required],
      zones: [[], Validators.required],
    });
  }

  onToggleChanged(event: MatSlideToggleChange) {
    this.selectedApproach = event.checked
      ? IncidentGroupViewsEnum.MAP
      : IncidentGroupViewsEnum.SELECT;
  }

  checkIfEditMode() {
    forkJoin({
      incidentLocationInfo: this.groupsServices.getIncidentsLocationInfo(
        this.id
      ),
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
              this.namedLocations.push({
                name: null,
                geometry: null,
                type: null,
                isEditing: true,
              });
            }
          }
          return EMPTY;
        })
      )
      .subscribe(({ geometryLocationInfo, incidentLocationInfo }) => {
        this.isAddMode = false;

        const location = (geometryLocationInfo['result'] as any[]).flatMap(
          (v) => v.location
        );
        if (location.length) {
          this.selectedApproach = IncidentGroupViewsEnum.MAP;
          geometryLocationInfo &&
            this.loadGroupGeometryInfo(geometryLocationInfo['result']);
        } else {
          this.selectedApproach = IncidentGroupViewsEnum.SELECT;
          incidentLocationInfo &&
            this.loadGroupIncidentInfo(incidentLocationInfo);
        }
        this.filteredCategories = this.filteredCategories.pipe(
          map((categories: any[]) => {
            return categories.filter(
              (item) =>
                this.selectedCategories.findIndex(
                  (category) => category.id == item.id
                ) == -1
            );
          })
        );
        this.loading = false;
      });
  }

  loadGroupIncidentInfo(data: any) {
    // handle  response
    const centers = [];
    let incidentsCat = [];
    let zones = [];
    data['centers'].forEach((element) => {
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

    // setting up  the  incidents  categories selection list  and  filters list

    incidentsCat = [...new Set(...incidentsCat)];
    this.selectedCategories = this.categories.filter((item) =>
      incidentsCat.includes(item.id)
    );
    console.log(this.selectedCategories);

    this.filteredCategories = this.filteredCategories.pipe(
      map((categories: any[]) => {
        return categories.filter(
          (item) =>
            this.selectedCategories.findIndex(
              (category) => category.id == item.id
            ) == -1
        );
      })
    );

    // setting up  the   centers and  zones
    this.formGroup.get('centers').patchValue([...new Set(centers)]);
    zones = zones?.filter((v) => v).map((item) => item?.toString());
    this.formGroup.get('zones').patchValue([...new Set(zones)]);
  }

  loadGroupGeometryInfo(data: Array<GroupGeometryLocation>) {
    data
      .flatMap((v) => v.location)
      .forEach((loc) => {
        this.namedLocations.push({ ...loc, type: '', isEditing: false });
      });
    let categories = data.flatMap((v) => v.categoryIds);
    this.selectedCategories = this.categories.filter((item) =>
      categories.includes(item.id)
    );
    this.namedLocations.forEach((v) => {
      v.geometry = this.removeLastPointFromBackendGeometry(v.geometry);
    });
    this.cdr.detectChanges();
  }

  onSubmit() {
    this.loading = true;
    if (this.selectedApproach == IncidentGroupViewsEnum.MAP) {
      this.submitGeometryLocations();
    } else {
      this.submitSelectedLocations();
    }
  }

  submitGeometryLocations() {
    this.groupGeometry.groupId = +this.id;
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
    this.groupGeometry.categoryIds = this.selectedCategories.map((v) => v.id);

    if (this.isAddMode) {
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
    }
  }

  submitSelectedLocations() {
    const selectedItems = this.areaItems.filter(
      (item) => item.center.selected && item.zones.length > 0
    );
    const centers = [];
    this.selectedCategories.forEach((element) => {
      selectedItems.forEach((areaItem) => {
        const item = {
          incidentCategoryId: element.id,
          centerId: areaItem.center.id,
          zones: areaItem.getSelectedZones().map((item) => item.zoneId),
          allZones: false,
        };
        centers.push(item);
      });
    });
    const body = {
      groupId: this.id,
      centers,
    };

    this.groupsServices
      .setIncidentsLocationInfo(body, this.isAddMode)
      .pipe(
        map((data) => {
          console.log(data);
          this.loading = false;
          this.alertService.openSuccessSnackBar();
          this.dialogRef.close();
        }),
        catchError((err, caught) => {
          this.loading = false;
          this.alertService.openFailureSnackBar();
          return EMPTY;
        })
      )
      .subscribe();
  }

  selectAll(event: MatOptionSelectionChange) {
    if (event.source.selected) {
      const selectedCenters = this.formGroup.get('centers').value as any[];
      this.areaItems.forEach((item) => {
        item.center.selected = event.source.selected;
        selectedCenters.push(item.center.id);
      });
      this.formGroup.get('centers').patchValue([...selectedCenters]);

      return;
    }
    this.formGroup.get('centers').patchValue([]);
  }

  public onChangeSub(event: MatOptionSelectionChange, index): void {
    this.areaItems[index].center.selected = event.source.selected;

    if (event.source.selected) {
      const nameEn = this.areaItems.find(
        (item) => item?.center.id == event.source.value
      )?.center.id;

      this.groupsServices.getCenterZones(nameEn).subscribe(
        (res) => {
          if (res && res['status']) {
            this.areaItems[index].zones = res['result'];
            this.formGroup.get('zones').updateValueAndValidity();
          }
        },
        (err) => {}
      );
    } else {
      let selectdZones = this.formGroup.get('zones').value as any[];
      selectdZones = selectdZones.filter(
        (item) =>
          this.areaItems[index].zones.findIndex(
            (zone) => zone.zoneId == item
          ) == -1
      );
      this.formGroup.get('zones').patchValue(selectdZones);
      this.areaItems[index].zones = [];
    }
  }

  /**
   *
   * categories  logic
   */
  getParentsCategories() {
    const categories: any[] = this.commonData['incidentCategories'];
    if (categories.length <= 0) {
      return [];
    }

    return categories.filter((item) => item.parent == null);
  }

  getChildrensCategories() {
    const categories: any[] = this.commonData['incidentCategories'];
    if (categories.length <= 0) {
      return [];
    }

    return categories.filter((item) => item.parent != null);
  }

  getCategory(id, isSubCategory: boolean) {
    const categories: any[] = this.commonData['incidentCategories'];
    if (categories.length <= 0 || !id) {
      return;
    }

    const subCategory = categories.find((item) => item.id == id);

    if (isSubCategory) {
      return subCategory;
    }

    return categories.find((item) => subCategory?.parent?.id == item.id);
  }

  getParent(id) {
    const category = _.find(this.commonData.incidentCategories, ['id', id]);
    if (!_.isEmpty(category?.parent)) {
      return category?.parent?.id;
    } else {
      return null;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.selectedCategories.push(value);
    }

    // Clear the input value

    event.input.value = '';
    this.categoryCtrl.setValue(null);
  }

  remove(category): void {
    this.selectedCategories = this.selectedCategories.filter((obj) => {
      return obj.id !== category?.id;
    });
    this.filteredCategories = this.filteredCategories.pipe(
      map((categories) => {
        return categories;
      })
    );
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedCategories.push(event.option.value);
    this.filteredCategories = this.filteredCategories.pipe(
      map((categories: any[]) => {
        return categories.filter(
          (item) =>
            this.selectedCategories.findIndex(
              (category) => category.id == item.id
            ) == -1
        );
      })
    );
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
    this.categoryInput.nativeElement.blur();
  }

  private _filter(value): any[] {
    return this.categories.filter((category) => {
      if (
        category?.nameEn.toLowerCase().includes(value) ||
        category?.nameAr.includes(value)
      ) {
        return category;
      }
    });
  }

  addNewLocation() {
    this.namedLocations = [
      ...this.namedLocations,
      { geometry: null, name: null, type: null, isEditing: true },
    ];
  }

  save(i: number) {
    this.namedLocations[i].isEditing = false;
  }

  removeLocation(i: number) {
    this.namedLocations = this.namedLocations.filter((v, index) => index !== i);
  }

  updateLocation(i: number) {
    const loc = this.namedLocations[i];
    this.openLocationDialoug(i, this.mapStringToCoordinates(loc.geometry));
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
        //this.groupGeometry.locations.push(locationAsString);
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
    return { type: type.toLowerCase(), points: newCoordinatesArrNumber };
  }

  isLocationsInvalid() {
    return this.namedLocations.some(
      (v) => v.geometry == null || v.name == null
    );
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
}
