import { Component, LOCALE_ID, OnInit } from "@angular/core";

import { ReportsService } from "@core/api/services/reports.service";
import { ILangFacade } from "@core/facades/lang.facade";
import { CommonService } from "@core/services/common.service";
import { IStorageService } from "@core/services/storage.service";

import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";

@Component({
  selector: "app-pdf-template",
  templateUrl: "./pdf-template.component.html",
  styleUrls: ["./pdf-template.component.scss"],
  providers: [{ provide: LOCALE_ID, useValue: "ar-AE" }],
})
export class PdfTemplateComponent implements OnInit {
  constructor(
    private langFacade: ILangFacade,
    private reportsService: ReportsService,
    private storageService: IStorageService,
    private commonService: CommonService
  ) {}
 public currenUser: any; 
  ngOnInit(): void {
    this.currenUser = this.commonService.getCommonData()?.currentUserDetails;
  }
  public initForm$ = this.storageService.getState("daily-report-init").pipe(
    map((r) => {
      return {
        ...r,
        sub_date: r?.date ? this.subtractDateDays(r?.date) : new Date(),
      };
    })
  );

  private destroy$ = new Subject();
  ngOnDestroy(): void {
    this.destroy$.next();
  }
  subtractDateDays(date, days = 1) {
    let dt = new Date(date);
    dt?.setDate(dt?.getDate() - days);
    return dt;
  }
  dir$ = this.langFacade.vm$.pipe(map((s) => s.ActiveLang.dir));

  public form$ = this.storageService.getState("daily-report").pipe(
    tap((rep) => {
      Object.keys(rep)
        .filter((k) => k.startsWith("onduty"))
        .map((k) => {
          rep[k].phone = rep[k].phone ?? "-";
        });
      Object.keys(rep)
        .filter((k) => k.startsWith("performance"))
        .forEach((k) => {
          rep[k] = rep[k].map((r) => r.map((i) => (i?.nameAr ? i?.nameAr?.length > 0 ? i : "-" : i?.length > 0 ? i : "-")));
        });
    })
  );
}
