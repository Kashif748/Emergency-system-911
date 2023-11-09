import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FieldsetModule} from "primeng/fieldset";
import { ImpactAnalysisRoutingModule } from './impact-analysis-routing.module';
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
import {BrowseImpactAnalysisComponent} from "./reopen-analysis-mgmt/browse-impact-analysis/browse-impact-analysis.component";
import {ActivitiesDialogComponent} from "./reopen-analysis-mgmt/browse-impact-analysis/activities-dialog/activities-dialog.component";
import {ContentImpactAnalysisComponent} from "./reopen-analysis-mgmt/browse-impact-analysis/content-impact-analysis/content-impact-analysis.component";
import {CycleDialogComponent} from "./reopen-analysis-mgmt/browse-impact-analysis/cycle-dialog/cycle-dialog.component";
import {InputSwitchModule} from "primeng/inputswitch";
import { TreeSelectModule } from '@shared/sh-components/treeselect/treeselect.component';
import {PrivilegesDirectiveModule} from '@shared/sh-directives/privileges.directive';
import { CheckboxModule } from 'primeng/checkbox';
import { BrowseResourceAnalysisComponent } from './reopen-analysis-mgmt/browse-resource-analysis/browse-resource-analysis.component';
import { ContentResourceAnalysisComponent } from './reopen-analysis-mgmt/browse-resource-analysis/content-resource-analysis/content-resource-analysis.component';
import { ResourceDialogComponent } from './reopen-analysis-mgmt/browse-resource-analysis/resource-dialog/resource-dialog.component';
import { ReopenAnalysisMgmtComponent } from './reopen-analysis-mgmt/reopen-analysis-mgmt.component';
import {TabViewModule} from "primeng/tabview";
import {BrowseResourceAnalysisState} from "./states/browse-resource-analysis.state";
import {BadgeModule} from "primeng/badge";
import {CardModule} from "primeng/card";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/impact-analysis/',
    '.json'
  );
}


@NgModule({
  declarations: [BrowseImpactAnalysisComponent, ContentImpactAnalysisComponent, CycleDialogComponent, ActivitiesDialogComponent, BrowseResourceAnalysisComponent, ContentResourceAnalysisComponent, ResourceDialogComponent, ReopenAnalysisMgmtComponent],
  imports: [
    CommonModule,
    ImpactAnalysisRoutingModule,
    NgxsModule.forFeature([BrowseImpactAnalysisState, BrowseResourceAnalysisState]),
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
    CheckboxModule,
    PrivilegesDirectiveModule,
    TabViewModule,
    InputTextModule,
    BadgeModule,
    CardModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class ImpactAnalysisModule { }
