import { AlertsService } from "src/app/_metronic/core/services/alerts.service";
import { TranslationService } from "src/app/modules/i18n/translation.service";
import { IncidentsService } from "src/app/_metronic/core/services/incidents.service";
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from "@angular/core";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { MatTable } from "@angular/material/table";
import * as _ from "lodash";

@Component({
  selector: "app-hospital-data",
  templateUrl: "./hospital-data.component.html",
  styleUrls: ["./hospital-data.component.scss"],
})
export class HospitalDataComponent implements OnInit, OnChanges {
  productLevelCostList: FormArray;
  displayedColumns: string[];
  Hospitals: Array<any> = [];
  commonData: any;
  hopsitalsdatalist: any;
  selected: any;

  hsp1: any;
  @Input() hospitalList;

  @Output() hospitalsEvent = new EventEmitter<any>();

  lang = "en";

  @ViewChild(MatTable) table: MatTable<any>; //used when
  constructor(
    private cdr: ChangeDetectorRef,
    private alertService: AlertsService,
    private translationService: TranslationService,
    private incidentservice: IncidentsService
  ) {}

  ngOnInit() {
    this.lang = this.translationService.getSelectedLanguage();

    this.commonData = JSON.parse(localStorage.getItem("commonData"));

    this.hopsitalsdatalist = this.commonData.hospitals;

    //this.lang == 'en' ? this.displayedColumns = ['hospital', 'deaths', 'serious', 'minor' , 'normal'] : this.displayedColumns = ['المستشفيات', 'عدد الوفايات', 'اصابات بليغة', 'اصايات بسيطة' , 'اصابات متوسطة'];
    this.displayedColumns = [
      "hospital",
      "deaths",
      "serious",
      "minor",
      "normal",
    ];
    this.getProjectLevelCostData();
  }

  ngOnChanges() {
    if (!_.isEmpty(this.hospitalList)) {
      this.productLevelCostList.removeAt(0);
      this.hospitalList.forEach((element, index) => {
        let hsp = _.find(this.hopsitalsdatalist, ["id", element.hospital.id]);
        element.hospital = hsp;
        this.hsp1 = element.hospital;
        this.productLevelCostList.push(this.createFormGroup1(element, true));

        this.cdr.detectChanges();
        this.table.renderRows();
      });
      this.addNewEmptyRow();
    } else {
    }

    this.gethospitalData();
  }

  changeText() {}

  gethospitalData() {
    this.incidentservice.getHospitals().subscribe(
      (data) => {
        if (data) {
          this.Hospitals = data.result.content;
          this.cdr.detectChanges();
        }
      },
      (error) => {}
    );
  }

  getProjectLevelCostData() {
    let newRow = [];
    newRow.push(this.createFormGroup(null));
    this.productLevelCostList = new FormArray(newRow);
  }

  createFormGroup(data, requiredFlag: boolean = false): FormGroup {
    data = data || {
      hospital: "",
      deaths: "",
      serious: "",
      normal: "",
      minor: "",
    };
    if (requiredFlag) {
      return new FormGroup({
        hospital: new FormControl(data.value.hospital, [Validators.required]),
        deaths: new FormControl(data.value.deaths, [Validators.required]),
        majorInjuries: new FormControl(data.value.serious, [
          Validators.required,
        ]),
        normalInjuries: new FormControl(data.value.normal, [
          Validators.required,
        ]),
        minorInjuries: new FormControl(data.value.minor, [Validators.required]),
        // isRequired: new FormControl(true)
      });
    } else {
      return new FormGroup({
        hospital: new FormControl(data.hospital),
        deaths: new FormControl(data.deaths),
        majorInjuries: new FormControl(data.serious),
        normalInjuries: new FormControl(data.normal),
        minorInjuries: new FormControl(data.minor),
      });
    }
  }

  createFormGroup1(data, requiredFlag: boolean = false): FormGroup {
    data = data || {
      hospital: "",
      deaths: "",
      serious: "",
      normal: "",
      minor: "",
    };
    if (requiredFlag) {
      return new FormGroup({
        hospital: new FormControl(data.hospital.id, [Validators.required]),
        deaths: new FormControl(data.deaths, [Validators.required]),
        majorInjuries: new FormControl(data.majorInjuries, [
          Validators.required,
        ]),
        normalInjuries: new FormControl(data.normalInjuries, [
          Validators.required,
        ]),
        minorInjuries: new FormControl(data.minorInjuries, [
          Validators.required,
        ]),
        // isRequired: new FormControl(true)
      });
    } else {
      return new FormGroup({
        hospital: new FormControl(data.hospital),
        deaths: new FormControl(data.deaths),
        majorInjuries: new FormControl(data.serious),
        normalInjuries: new FormControl(data.normal),
        minorInjuries: new FormControl(data.minor),
      });
    }
  }

  onSelectOfHospital(event, i, property) {
    this.checkForRowEmpty(i);
  }

  checkForRowEmpty(idx) {
    let tableRowStatus = this.isRowEmpty(this.productLevelCostList.controls);
    this.addNewEmptyRow();
    this.cdr.detectChanges();
  }

  markAsMandatoryRow(idx) {
    this.productLevelCostList.controls[idx] = this.createFormGroup(
      this.productLevelCostList.controls[idx],
      true
    );
    this.cdr.detectChanges();
    this.table.renderRows();
  }

  isRowEmpty(
    list,
    properties = ["hospital", "deaths", "serious", "normal", "minor"]
  ) {
    let tableRowStatus = {
      isObjectEmpty: false,
      emptyObjCount: 0,
      emptyRowIdx: [],
    };
    if (list && list.length) {
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < properties.length; j++) {
          let property = properties[j];
          let item = list[i];
          if (
            item &&
            item.value &&
            item.value[property] &&
            (item.value[property].length > 0 ||
              typeof item.value[property] === "object") &&
            item.value[property] !== null
          ) {
            tableRowStatus.isObjectEmpty = false;
            break;
          } else {
            tableRowStatus.isObjectEmpty = true;
          }
        }
        if (tableRowStatus.isObjectEmpty) {
          tableRowStatus.emptyObjCount++;
          tableRowStatus.emptyRowIdx.push(i);
        }
      }
    }
    return tableRowStatus;
  }

  addNewEmptyRow() {
    let newRow = [];
    newRow.push(this.createFormGroup(null));
    this.productLevelCostList.push(this.createFormGroup(null));
    this.cdr.detectChanges();
    this.table.renderRows();
  }

  removeEmptyRow(tableRowStatus) {
    this.productLevelCostList.controls.splice(
      tableRowStatus.emptyRowIdx.shift(),
      1
    );
    this.cdr.detectChanges();
    this.table.renderRows();
  }

  onSubmit() {
    let hospData = [];

    this.productLevelCostList.controls.forEach((element) => {
      if (element.value["hospital"] != "") {
        this.hopsitalsdatalist;
        let hspObj = _.find(this.hopsitalsdatalist, {
          id: element.value["hospital"],
        });

        element.value["hospital"] = hspObj;
        hospData.push(element.value);
      }
    });
    this.hospitalsEvent.emit(this.productLevelCostList.value);
  }
}
