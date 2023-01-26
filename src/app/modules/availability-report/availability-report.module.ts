import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AvailabilityReportComponent } from "./availability-report/availability-report.component";
import { AvailabilityRoutingModule } from "./availability-routing.module";
import { AvailabilityService } from "@core/api/services/availability.service";
import { ReportsListComponent } from "./reports-list/reports-list.component";
import { ReportFormComponent } from "./report-form/report-form.component";
import { ILangFacade, LangFacade } from "@core/facades/lang.facade";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { SharedModule } from "@shared/shared.module";
import { MatSelectModule } from "@angular/material/select";
import { PdfAvailabiltyReportComponent } from "./pdf-availabilty-report/pdf-availabilty-report.component";
import { AreaChartComponent } from "./report-form/area-chart/area-chart.component";
import { NgApexchartsModule } from "ng-apexcharts";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    "assets/i18n/availability-report/",
    ".json"
  );
}
@NgModule({
  declarations: [
    AvailabilityReportComponent,
    ReportsListComponent,
    ReportFormComponent,
    PdfAvailabiltyReportComponent,
    AreaChartComponent,
  ],
  imports: [
    CommonModule,
    AvailabilityRoutingModule,
    SharedModule,
    MatSelectModule,
    NgApexchartsModule,
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  providers: [
    AvailabilityService,
    { provide: ILangFacade, useClass: LangFacade },
  ],
})
export class AvailabilityReportModule {}
