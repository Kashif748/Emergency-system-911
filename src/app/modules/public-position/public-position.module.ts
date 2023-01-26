import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicPositionComponent} from './public-position/public-position.component';
import {PublicPositionService} from './public-position.service';
import {PublicPositionRoutingModule} from './public-position-routing.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {InlineSVGModule} from 'ng-inline-svg';
import {TranslationModule} from '../i18n/translation.module';
import {NgApexchartsModule} from 'ng-apexcharts';
import {CentersChartComponent} from './public-position/centers-chart/centers-chart.component';
import {ByImportanceChartComponent} from './public-position/byimportance-chart/by-importance-chart.component';
import {ByCategoryChartComponent} from './public-position/bycategory-chart/by-category-chart.component';
import {ResourcesChartComponent} from './public-position/resources-chart/resources-chart.component';
import {SharedModule} from '@shared/shared.module';
import {MapModule} from '@shared/components/map/map.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {IncidentItemComponent} from './public-position/opened-incidents/incident-item/incident-item.component';
import {MatStepperModule} from '@angular/material/stepper';
import {IncidentLogComponent} from './public-position/opened-incidents/incident-log/incident-log.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {MaterialModule} from '@shared/material.module';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {EventsLogComponent} from './public-position/opened-incidents/events-log/events-log.component';
import {EventLogItemComponent} from './public-position/opened-incidents/events-log/event-log-item/event-log-item.component';
import {CoreModule} from 'src/app/_metronic/core';
import {AssetsStatisticsComponent} from './public-position/assets-statistics/assets-statistics.component';

@NgModule({
  declarations: [
    PublicPositionComponent,
    CentersChartComponent,
    ByImportanceChartComponent,
    ByCategoryChartComponent,
    ResourcesChartComponent,
    IncidentItemComponent,
    IncidentLogComponent,
    EventsLogComponent,
    EventLogItemComponent,
    AssetsStatisticsComponent,
    // FirstLetterPipe,
  ],
  imports: [
    CommonModule,
    PublicPositionRoutingModule,
    MatMenuModule,
    MatButtonModule,
    InlineSVGModule,
    TranslationModule,
    NgApexchartsModule,
    SharedModule,
    MapModule,
    ScrollingModule,
    InfiniteScrollModule,
    MatStepperModule,

    ReactiveFormsModule,
    InlineSVGModule,
    PerfectScrollbarModule,
    TranslationModule,
    MaterialModule,
    VirtualScrollerModule,
    CoreModule
  ],
  // exports: [FirstLetterPipe],

  providers: [PublicPositionService],
})
export class PublicPositionModule {}
