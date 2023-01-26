import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserStatisticsReportRoutingModule } from './user-statistics-report-routing.module';
import { UserStatisticsReportComponent } from './user-statistics-report/user-statistics-report.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MaterialModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/incidents-statistics/',
    '.json'
  );
}
@NgModule({
  declarations: [UserStatisticsReportComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    ReactiveFormsModule,
    UserStatisticsReportRoutingModule,

    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    MaterialModule,
    FormsModule,
    SharedModule,
    NgbDropdownModule,
    NgxPaginationModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class UserStatisticsReportModule {}
