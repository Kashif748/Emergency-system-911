import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { MatSelectChange } from "@angular/material/select";
import { ActivatedRoute } from "@angular/router";

import { AvailabilityService } from "@core/api/services/availability.service";
import { CommonService } from "@core/services/common.service";

import { BehaviorSubject, Observable } from "rxjs";
import { Subscription } from "rxjs";

import { TranslationService } from "../../i18n/translation.service";

var wkhtmltopdf = require("wkhtmltopdf");

@Component({
  selector: "app-report-form",
  templateUrl: "./report-form.component.html",
  styleUrls: ["./report-form.component.scss"],
})
export class ReportFormComponent implements OnInit, OnDestroy {
  lang = "en";
  currentTab = 0;
  shiftsValues = [
    {
      title: "chooseOption",
      color: "bg-light-primary",
    },
    {
      title: "prepared",
      color: "bg-light-success",
    },
    {
      title: "not_prepared",
      color: "bg-light-warning",
    },
    {
      title: "inactive",
      color: "bg-light-dark",
    },
    {
      title: "Damage",
      color: "bg-light-danger",
    },
  ];

  availabilityList: any[] = [];
  areaSectors: any[] = [];
  subscription: Subscription;
  currentId = 0;
  userId = 0;
  activeShift = "";

  constructor(
    private translationService: TranslationService,
    private _service: AvailabilityService,
    private location: Location,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentId = Number(this.route.snapshot.paramMap.get("id"));
    this.lang = this.translationService.getSelectedLanguage();

    this.findActiveShift();

    if (this.currentId == 0) {
      this._service.getAvailabilityReport();
    } else {
      this._service.getCurrentState(this.currentId);
    }

    this._service.reportsChanged$.subscribe((data) => {
      this.availabilityList = data;

      if (data.length > 0) this.changeCurrentTab(data[0]);

      this.cdr.detectChanges();
    });

    this.commonService.getCommonDataState().subscribe((data) => {
      if (data) {
        this.userId = data?.currentUserDetails["id"];
      }
    });
  }

  findActiveShift() {
    const currentHour = new Date().getHours();

    switch (true) {
      case currentHour >= 8 && currentHour < 16:
        this.activeShift = "shift1";
        break;

      case currentHour >= 16 && currentHour < 24:
        this.activeShift = "shift2";
        break;
      case currentHour < 8:
        this.activeShift = "shift3";
        break;

      default:
        break;
    }
  }
  getActiveShift() {
    switch (this.activeShift) {
      case "shift1":
        return "8am - 4pm";
        break;

      case "shift2":
        return "4pm - 12am";
        break;
      case "shift3":
        return "12am - 8am";
        break;

      default:
        break;
    }
  }

  public areaSectors$ = new BehaviorSubject<any[]>([]);
  changeCurrentTab(area) {
    this.currentTab = area.area;
    this.areaSectors = area.sectors;
    this.areaSectors$.next(this.areaSectors);
  }

  changeShift(e: MatSelectChange, org, shiftNo) {
    org[shiftNo] = e.value;
  }

  back() {
    this.location.back();
  }

  proccessReport() {
    if (this.currentId == 0) this.createReports();
    else this.updateReport();
  }

  createReports() {
    this._service.createNewReport(this.prepareData());
  }

  updateReport() {
    this._service.saveCurrentState(this.prepareData());
  }

  prepareData() {
    let dataToSend = {
      body: JSON.stringify(this.availabilityList),
      id: this.currentId,
      status: {
        id: 5,
      },
      createdBy: {
        id: this.userId,
      },

      isActive: true,
    };

    return dataToSend;
  }
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    // this.subscription.unsubscribe();
  }
}
