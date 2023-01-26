import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "@shared/shared.module";

import { NgxMatIntlTelInputModule } from "ngx-mat-intl-tel-input";

import { DailyReportRoutingModule } from "./daily-report-routing.module";
import { DailyReportComponent } from "./daily-report.component";

import { FormComponent } from "./form/form.component";
import { ReviewComponent } from "./review/review.component";
import { ListComponent } from "./list/list.component";
import { ReadinessComponent } from "./readiness/readiness.component";
import { PdfTemplateComponent } from "./review/pdf-template/pdf-template.component";
import { FormInitDialogComponent } from "./form-init-dialog/form-init-dialog.component";
import { AreaInputComponent } from "./area-input/area-input.component";

@NgModule({
  declarations: [
    DailyReportComponent,
    FormComponent,
    ListComponent,
    ReadinessComponent,
    ReviewComponent,
    PdfTemplateComponent,
    FormInitDialogComponent,
    AreaInputComponent,
  ],
  imports: [
    CommonModule,
    DailyReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMatIntlTelInputModule,
  ],
})
export class DailyReportModule {}
