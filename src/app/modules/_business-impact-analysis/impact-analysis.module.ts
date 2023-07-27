import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FieldsetModule} from "primeng/fieldset";
import { BusinessImpactAnalysisRoutingModule } from './impact-analysis-routing.module';
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
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { CalendarModule } from 'primeng/calendar';
import {BrowseImpactAnalysisState} from "./states/browse-impact-analysis.state";
import {NgxsModule} from "@ngxs/store";
import {SharedBreadcrumbModule} from "@shared/sh-components/breadcrumbs/breadcrumb.component";
import {BlockUIModule} from "primeng/blockui";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {BrowseImpactAnalysisComponent} from "./browse-impact-analysis/browse-impact-analysis.component";
import {ImpactActivityDialogComponent} from "./browse-impact-analysis/impact-activity-dialog/impact-activity-dialog.component";
import {ContentImpactAnalysisComponent} from "./browse-impact-analysis/content-impact-analysis/content-impact-analysis.component";
import {ImpactAnalysisDialogComponent} from "./browse-impact-analysis/impact-analysis-dialog/impact-analysis-dialog.component";
import {InputSwitchModule} from "primeng/inputswitch";
import { TreeSelectModule } from '@shared/sh-components/treeselect/treeselect.component';
import {PrivilegesDirectiveModule} from '@shared/sh-directives/privileges.directive';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/impact-analysis/',
    '.json'
  );
}


@NgModule({
  declarations: [BrowseImpactAnalysisComponent, ContentImpactAnalysisComponent, ImpactAnalysisDialogComponent, ImpactActivityDialogComponent],
  imports: [
    CommonModule,
    BusinessImpactAnalysisRoutingModule,
    NgxsModule.forFeature([BrowseImpactAnalysisState]),
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
    CalendarModule,
    SharedBreadcrumbModule,
    ProgressSpinnerModule,
    BlockUIModule,
    InputSwitchModule,
    TreeSelectModule,
    PrivilegesDirectiveModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class BusinessImpactAnalysisModule { }
