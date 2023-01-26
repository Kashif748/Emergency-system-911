import { MatDialogRef } from "@angular/material/dialog";
import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Observable } from "rxjs";

import { IncidentsService } from "src/app/_metronic/core/services/incidents.service";

import * as _ from "lodash";

import { TranslationService } from "../../i18n/translation.service";
import { AlertsService } from "./../../../_metronic/core/services/alerts.service";
import { CommonService } from "./../../../_metronic/core/services/common.service";

@Component({
  selector: "app-create-op-report",
  templateUrl: "./create-op-report.component.html",
  styleUrls: ["./create-op-report.component.scss"],
})
export class CreateOpReportComponent implements OnInit {
  incidents$: Observable<any>;

  selectedUpdateValue: any;
  commonData: any;
  date = new Date();
  final;

  confidentialty: any[] = [
    {
      id: 1,
      nameAr: "Restricted",
      nameEn: "Restricted",
    },
    {
      id: 2,
      nameAr: "Secret",
      nameEn: "Secret",
    },
    {
      id: 3,
      nameAr: "Top Secret",
      nameEn: "Top Secret",
    },
  ];

  updatesList: any;

  updates: Array<any> = [
    { id: 1, nameEn: "First", nameAr: "أول" },
    { id: 2, nameEn: "Second", nameAr: "ثانيا" },
    { id: 3, nameEn: "Third", nameAr: "الثالث" },
    { id: 4, nameEn: "Fourth", nameAr: "الرابع" },
    { id: 5, nameEn: "Final", nameAr: "نهائي" },
    { id: 5, nameEn: "Fifth", nameAr: "الخامس" },
    { id: 6, nameEn: "Sixth", nameAr: "السادس" },
    { id: 7, nameEn: "Seventh", nameAr: "السابع" },
    { id: 8, nameEn: "Eighth", nameAr: "ثامن" },
    { id: 9, nameEn: "Ninth", nameAr: "تاسع" },
    { id: 10, nameEn: "Tenth", nameAr: "العاشر" },
  ];
  lang = "en";
  form: FormGroup;
  constructor(
    private incidentsService: IncidentsService,
    private fb: FormBuilder,
    private alertService: AlertsService,
    private incidentservice: IncidentsService,
    private cd: ChangeDetectorRef,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateOpReportComponent>,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getSerials(this.data.incId);
    this.lang = this.translationService.getSelectedLanguage();
    this.commonData = JSON.parse(localStorage.getItem("commonData"));
  }

  createForm() {
    this.form = this.fb.group({
      update: [""],
      final: [""],
      history: [""],
      incidentId: [0, Validators.required],
      confidentialtyID: ["", Validators.required],
    });
  }

  getSerials(incId) {
    this.incidentservice.getSerials(incId).subscribe(
      (data) => {
        if (data) {
          this.updatesList = _.filter(this.updates, { id: data.result });
          this.selectedUpdateValue = this.updatesList[0];
          this.cd.markForCheck();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  toggleNotify(event) {
    this.final = event.checked;
  }

  onSubmit() {
    const formData = this.form.value;
    const opVal =
      this.lang === "en" ? formData.update?.nameEn : formData.update?.nameAr;

    let body = {
      confidentialty: {
        id: formData.confidentialtyID,
      },
      createdBy: {
        id: this.getUserId(),
      },
      createdOn: this.date.toISOString(),
      id: 0,
      operationUpdate: opVal,
      operationHistory: formData.history,
      incident: {
        id: parseInt(this.data.incId),
      },
      status: {
        id: 1,
      },
      // isFinal : this.final,
    };

    if (this.final == true) {
      let finalVal = "";
      this.lang === "en" ? (finalVal = "Final") : (finalVal = "نهائي");
      body.operationUpdate = finalVal;
    }

    // this.final == true ? body.operationUpdate = (this.lang === 'en' ? 'Final' : 'نهائي') : "";

    this.incidentsService.createOperationalReports(body).subscribe(
      (data) => {
        if (data) {
          this.alertService.openSuccessSnackBar();
          this.dialogRef.close();
          this.commonService.announceReportsUpdates("success");
        }
      },
      (error) => {
        this.alertService.openFailureSnackBarWithMsg(
          this.lang == "ar"
            ? error?.error?.error?.message_Ar
            : error?.error?.error?.message_En
        );
      }
    );
  }

  getUserId() {
    const user = this.commonData.currentUserDetails.id;
    return user;
  }
}
