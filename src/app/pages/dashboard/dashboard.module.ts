import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MapModule } from 'src/app/shared/components/map/map.component';
import { DashboardComponent } from './dashboard.component';
import { CovidDahsboardComponent } from './covid-dahsboard/covid-dahsboard.component';
import { Widget1Component } from './widget1/widget1.component';
import { Widget2Component } from './widget2/widget2.component';
import { LogsComponent } from './logs/logs.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CustomDatePipe } from '@shared/pipes/custom-date.pipe';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from 'src/app/_metronic/core';
import { NewsBarComponent } from './news-bar/news-bar.component';
import { NgxsModule } from '@ngxs/store';
import { NewsBarState } from './news-bar/states/news-bar.state';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    DashboardComponent,
    Widget1Component,
    Widget2Component,
    CovidDahsboardComponent,
    LogsComponent,
    NewsBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'covid-dashboard',
        component: CovidDahsboardComponent,
      },
    ]),
    MatDatepickerModule,
    PerfectScrollbarModule,
    InlineSVGModule,
    NgbDropdownModule,
    TranslationModule,
    NgApexchartsModule,
    SharedModule,
    CoreModule,
    MapModule,
    NgxsModule.forFeature([NewsBarState]),
    TranslateObjModule,
    DialogModule,
    ButtonModule,
  ],
  providers: [DatePipe, CustomDatePipe],
})
export class DashboardModule {}
