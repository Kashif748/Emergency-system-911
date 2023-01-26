import { HttpResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy,
  NgModule,
  ChangeDetectionStrategy,
  AfterViewInit,
  AfterContentChecked,
} from "@angular/core";

import { IncidentsService } from "src/app/_metronic/core/services/incidents.service";

import * as _ from "lodash";

import { AlertsService } from "src/app/_metronic/core/services/alerts.service";

import { saveAs as importedSaveAs } from "file-saver";

import { SharedModule } from "src/app/shared/shared.module";

import { CreateOpReportComponent } from "./../create-op-report/create-op-report.component";
import { TranslationModule } from "../../i18n/translation.module";
import { TranslationService } from "./../../i18n/translation.service";
import { CommonService } from "./../../../_metronic/core/services/common.service";

import { OptUserDialogComponent } from "./opt-user-dialog/opt-user-dialog.component";

@Component({
  selector: "app-operational-reports",
  templateUrl: "./operational-reports.component.html",
  styleUrls: ["./operational-reports.component.scss"],
})
export class OperationalReportsComponent implements OnInit, OnDestroy {
  operational_Reports: any;
  commonData: any;
  previlage: any;
  @Input()
  incId;
  lang = "en";
  private sub: any;

  canGenerateOR: boolean;
  loading: boolean = true;

  constructor(
    private incidentservice: IncidentsService,
    private translationService: TranslationService,
    private alertService: AlertsService,
    public dialog: MatDialog,
    private commonService: CommonService,
    private cd: ChangeDetectorRef
  ) {
    this.previlage = JSON.parse(localStorage.getItem("userPrivileges"));

    this.sub = this.commonService.newReportsUpdates.subscribe((response) => {
      if (response == "success") {
        this.getReports();
      }
    });
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.commonData = JSON.parse(localStorage.getItem("commonData"));
    this.getReports();
    this.canCreateOR();
  }

  getReports() {
    this.incidentservice.getOperationalReports(this.incId).subscribe(
      (data) => {
        if (data) {
          this.operational_Reports = data.result.content;
          this.loading = false;
          this.cd.detectChanges();
        }
      },
      (error) => (this.loading = false)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateOpReportComponent, {
      panelClass: "modal",
      disableClose: false,
      data: {
        incId: this.incId,
      },
    });
  }

  openSendDialog(id): void {
    const dialogRef = this.dialog
      .open(OptUserDialogComponent, {
        width: "440px",
        disableClose: false,
      })
      .afterClosed()
      .subscribe(async (result) => {
        if (result) {
          await this.send(id, result);
        }
      });
  }

  getConId(id) {
    const con = _.find(this.commonData.confidentialties, ["id", id]);
    if (!_.isEmpty(con)) {
      return this.lang === "en" ? con.nameEn : con.nameAr;
    } else {
      return "";
    }
  }
  getStatusId(id) {
    const status = _.find(this.commonData.operationalReportStatus, ["id", id]);
    if (!_.isEmpty(status)) {
      return this.lang === "en" ? status.nameEn : status.nameAr;
    } else {
      return "";
    }
  }

  review(id) {
    this.incidentservice.operationalReportFiles(id).subscribe((response) => {
      var blob = new Blob([response.body], { type: "pdf" });
      var url = window.URL.createObjectURL(blob);

      var fileName = "download.pdf";
      importedSaveAs(blob, fileName);
    });
  }

  async send(id, userId) {
    try {
      await this.incidentservice.sendOperationalReport(id, userId).toPromise();
      this.alertService.openSuccessSnackBar();
    } catch (error) {
      this.alertService.openFailureSnackBarWithMsg(
        this.lang == "en"
          ? error?.error?.error?.message_En
          : error?.error?.error?.message_Ar
      );
    }
  }

  canCreateOR() {
    this.canGenerateOR = this.previlage.includes("PRIV_CR_OP_RPT");
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

@NgModule({
  declarations: [OperationalReportsComponent],
  imports: [TranslationModule, SharedModule],
})
export class OperationalReportsModule {}
