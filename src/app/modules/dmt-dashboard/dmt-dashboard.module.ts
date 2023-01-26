import { MaterialModule } from "./../../shared/material.module";
import { TranslationModule } from "./../i18n/translation.module";
import { SharedModule } from "src/app/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { DmtDashboardComponent } from "./dmt-dashboard/dmt-dashboard.component";
import { DmtRoutingModule } from "./dmt-routing.module";
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [DmtDashboardComponent],
  imports: [
    CommonModule,
    DmtRoutingModule,
    MaterialModule,
    TranslationModule,
    NgApexchartsModule,
    SharedModule,
  ],
  providers: [DatePipe],
})
export class DmtDashboardModule {}
