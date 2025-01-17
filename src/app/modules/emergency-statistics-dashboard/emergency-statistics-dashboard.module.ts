import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmergencyStatisticsDashboardRoutingModule} from './emergency-statistics-dashboard-routing.module';
import {EmergencyStatisticsDashboardComponent} from './emergency-statistics-dashboard.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {DividerModule} from "primeng/divider";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import {TranslateObjModule} from "@shared/sh-pipes/translate-obj.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FieldsetModule} from "primeng/fieldset";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {MainCategoryWidgetComponent} from './statistics/main-category-widget/main-category-widget.component';
import {IncidentWidgetComponent} from './statistics/incident-widget/incident-widget.component';
import {NgxsModule} from "@ngxs/store";
import {BrowseStatisticsState} from "./states/browse-statistics.state";
import {InlineSVGModule} from "ng-inline-svg";
import {NgApexchartsModule} from "ng-apexcharts";
import { SharedBreadcrumbModule } from '@shared/sh-components/breadcrumbs/breadcrumb.component';
import {SharedModule} from "@shared/shared.module";
import {CalendarModule} from "primeng/calendar";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/emergency-dashboard/', '.json');
}

@NgModule({
  declarations: [EmergencyStatisticsDashboardComponent, StatisticsComponent, MainCategoryWidgetComponent, IncidentWidgetComponent],
  imports: [
    CommonModule,
    EmergencyStatisticsDashboardRoutingModule,
    DividerModule,
    ReactiveFormsModule,
    FormsModule,
    FieldsetModule,
    ButtonModule,
    DropdownModule,
    TranslateObjModule,
    InlineSVGModule,
    NgApexchartsModule,
    NgxsModule.forFeature([BrowseStatisticsState]),
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    SharedBreadcrumbModule,
    SharedModule,
    CalendarModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class EmergencyStatisticsDashboardModule { }
