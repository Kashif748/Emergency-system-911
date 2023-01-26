import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { FormReportComponent } from './form-report/form-report.component';
import { ReportComponent } from './report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from '../i18n/translation.module';
import { MaterialModule } from '../../shared/material.module';


@NgModule({
  declarations: [ReportsComponent, FormReportComponent, ReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MaterialModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportModule { }
