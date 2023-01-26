import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportingRoutingModule } from './reporting-routing.module';
import { ReportingComponent } from './reporting.component';
import { IncidentsReportComponent } from './incidents-report/incidents-report.component';
import { TasksReportComponent } from './tasks-report/tasks-report.component';
import { OugInputModule } from 'src/app/shared/components/oug-input/oug-input.component';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { IncidentReportComponent } from './incident-report/incident-report.component';
import { MapModule } from '@shared/components/map/map.component';
import { StatisticsComponent } from './incident-report/statistics/statistics.component';
import { LogsComponent } from './incident-report/logs/logs.component';
import { PdfTemplateComponent } from './incident-report/pdf-template/pdf-template.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ExportDialogComponent } from './incidents-report/export-dialog/export-dialog.component';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/reporting/', '.json');
}

@NgModule({
  declarations: [
    ReportingComponent,
    IncidentsReportComponent,
    ExportDialogComponent,
    TasksReportComponent,
    IncidentReportComponent,
    StatisticsComponent,
    LogsComponent,
    PdfTemplateComponent,
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    SharedModule,
    NgxPaginationModule,
    NgApexchartsModule,
    OugInputModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatDatetimePickerModule,
    MapModule,
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
    { provide: ILangFacade, useClass: LangFacade },
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
  ],
})
export class ReportingModule {}
