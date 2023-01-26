import { CommonModule, DatePipe, DOCUMENT } from "@angular/common";
import { Component, Inject, NgModule, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AdcdaService } from "@core/api/services/adcda.service";
import { DmsService } from "@core/api/services/dms.service";
import { ReportsService } from "@core/api/services/reports.service";
import { ILangFacade } from "@core/facades/lang.facade";
import { CommonService } from "@core/services/common.service";
import { ExportService } from "@core/services/export.service";
import { IStorageService } from "@core/services/storage.service";

import { InlineSVGModule } from "ng-inline-svg";

import { interval } from "rxjs";
import { Subject } from "rxjs";
import { map, takeUntil, tap } from "rxjs/operators";

import { AlertsService } from "src/app/_metronic/core/services/alerts.service";
import { SplashScreenService } from "src/app/_metronic/partials/layout/splash-screen/splash-screen.service";

import { TranslationModule } from "../../i18n/translation.module";

@Component({
  selector: "app-review-daily-report",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"],
})
export class ReviewComponent implements OnInit, OnDestroy {
  constructor(
    private exportService: ExportService,
    private langFacade: ILangFacade,
    private reportsService: ReportsService,
    private storageService: IStorageService,
    private dmsService: DmsService,
    private adcdaService: AdcdaService,
    private commonService: CommonService,
    private alertService: AlertsService,
    private router: Router,
    private splashScreen: SplashScreenService
  ) {}
  private destroy$ = new Subject();

  public form$ = this.storageService.getState("daily-report");
  public initForm$ = this.storageService.getState("daily-report-init");
  public reportData$ = this.reportsService.getAdcdaReport();
  dir$ = this.langFacade.vm$.pipe(map((s) => s.ActiveLang.dir));
  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit() {
    this.exportService.dailyReportExporting$
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => {
        this.exportToPdf();
      });
  }

  exportToPdf() {
    const user = this.commonService.getCommonData()?.currentUserDetails;
    this.alertService.openSuccessSnackBarWithMsg(
      "DAILY_REPORT_ADCDA.UPLOADING_REPORT"
    );
    this.splashScreen.show();
    this.exportService.htmltoPDF(
      "daily-report",
      "daily-report.pdf",
      "p",
      "px",
      [4000, 1600],
      async (doc) => {
        const file = new File([doc.output("blob")], "daily-report.pdf");
        const initForm = this.storageService.getItem("daily-report-init");

        const createdReport = await this.adcdaService
          .create({
            createdBy: { id: user.id },
            status: { id: 1 },
            isActive: true,
            createdOn: new Date().toISOString(),
            approvedBy: initForm.approvedBy,
          })
          .pipe(map((r) => r.result))
          .toPromise();
        await this.dmsService
          .uploadFiles([file], createdReport?.id, 26)
          .toPromise();
        this.splashScreen.hide();
        this.router.navigate(["/daily-report/list"]);
      }
    );
  }
}
