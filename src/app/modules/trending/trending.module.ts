import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TrendingRoutingModule } from "./trending-routing.module";
import { TrendingComponent } from "./trending.component";

import { TrendingDashboardComponent } from "./trending-dashboard/trending-dashboard.component";
import { InlineSVGModule } from "ng-inline-svg";
import { MaterialModule } from "../../shared/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslationModule } from "../i18n/translation.module";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [TrendingComponent, TrendingDashboardComponent],
  imports: [
    CommonModule,
    TrendingRoutingModule,
    InlineSVGModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslationModule,
    NgApexchartsModule,
    ChartsModule
  ],
})
export class TrendingModule {}
