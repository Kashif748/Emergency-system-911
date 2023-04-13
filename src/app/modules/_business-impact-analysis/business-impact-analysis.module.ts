import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FieldsetModule} from "primeng/fieldset";
import { BusinessImpactAnalysisRoutingModule } from './business-impact-analysis-routing.module';
import { BusinessImpactAnalysisComponent } from './business-impact-analysis/business-impact-analysis.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {PaginatorModule} from "primeng/paginator";
import {MenuModule} from "primeng/menu";
import {SkeletonModule} from "primeng/skeleton";
import {NodataTableModule} from "@shared/components/nodata-table/nodata-table.module";
import {DialogModule} from "primeng/dialog";
import {ToolbarModule} from "primeng/toolbar";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import {DividerModule} from "primeng/divider";
import {SelectButtonModule} from "primeng/selectbutton";
import {SplitButtonModule} from "primeng/splitbutton";
import {MultiSelectModule} from "primeng/multiselect";
import {ToggleButtonModule} from "primeng/togglebutton";
import {TableModule} from "primeng/table";
import { AddNewActivityComponent } from './dialog/add-new-activity/add-new-activity.component';
import { AddNewAnalysisCycleComponent } from './dialog/add-new-analysis-cycle/add-new-analysis-cycle.component';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { CalendarModule } from 'primeng/calendar';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-impact-analysis/',
    '.json'
  );
}


@NgModule({
  declarations: [BusinessImpactAnalysisComponent, AddNewActivityComponent, AddNewAnalysisCycleComponent],
  imports: [
    CommonModule,
    BusinessImpactAnalysisRoutingModule,
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PaginatorModule,
    MenuModule,
    SkeletonModule,
    NodataTableModule,
    ToolbarModule,
    DialogModule,
    DividerModule,
    SelectButtonModule,
    SplitButtonModule,
    MultiSelectModule,
    ToggleButtonModule,
    FieldsetModule,
    TableModule,
    TranslateObjModule,
    CalendarModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class BusinessImpactAnalysisModule { }
