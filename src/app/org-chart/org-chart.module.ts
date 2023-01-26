import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChartContainerComponent } from "./chart-container/chart-container.component";
import { ChartNodeComponent } from "./chart-node/chart-node.component";
import { NodeSelectService } from "./services/node-select.service";
import { InlineSVGModule } from "ng-inline-svg";
import { TranslationModule } from "../modules/i18n/translation.module";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

@NgModule({
  declarations: [ChartContainerComponent, ChartNodeComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    TranslationModule,
    PerfectScrollbarModule,
    // BrowserAnimationsModule
  ],
  exports: [ChartContainerComponent, ChartNodeComponent],
  providers: [NodeSelectService],
})
export class OrgChartModule {}
