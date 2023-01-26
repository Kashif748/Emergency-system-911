import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsStatisticsComponent } from './incidents-statistics/incidents-statistics.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Routes, RouterModule } from '@angular/router';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InlineSVGModule } from 'ng-inline-svg';
import { StatisticsCardComponent } from './statistics-card/statistics-card.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxPaginationModule } from 'ngx-pagination';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/incidents-statistics/', '.json');
}
export const routes: Routes = [
  {
    path: '',
    component: IncidentsStatisticsComponent,
  },
];

@NgModule({
  declarations: [IncidentsStatisticsComponent ,StatisticsCardComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    ReactiveFormsModule,
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
    SharedModule,
    NgApexchartsModule,
    NgbDropdownModule,
    NgxPaginationModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class IncidentsStatisticsModule {}
