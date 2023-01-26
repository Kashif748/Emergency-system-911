import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SurveysListReportComponent} from './surveys-list-report/surveys-list-report.component';
import {HttpClient} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ILangFacade, LangFacade} from '@core/facades/lang.facade';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {InlineSVGModule} from 'ng-inline-svg';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from '@shared/material.module';
import {SharedModule} from '@shared/shared.module';
import {NgApexchartsModule} from 'ng-apexcharts';
import {NgxPaginationModule} from 'ngx-pagination';
import {SurveysChartsReportComponent} from './surveys-charts-report/surveys-charts-report.component';
import {
  NgxMatDatetimePickerModule, NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const routes: Routes = [
  {
    path: '',
    component: SurveysListReportComponent,
  },
];

@NgModule({
  declarations: [SurveysListReportComponent, SurveysChartsReportComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule.forChild(routes),
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
    ReactiveFormsModule,
    SharedModule,
    NgApexchartsModule,
    NgbDropdownModule,
    NgxPaginationModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
  ],
  providers: [{provide: ILangFacade, useClass: LangFacade}],
})
export class SurveyManagementReportModule {
}
