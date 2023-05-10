import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityFrquencyRoutingModule } from './activity-frquency-routing.module';
import { BrowseActivityFrquencyComponent } from './browse-activity-frquency/browse-activity-frquency.component';
import { ContentActivityFrquencyComponent } from './browse-activity-frquency/content-activity-frquency/content-activity-frquency.component';
import { ActivityFrquencyDialogComponent } from './browse-activity-frquency/activity-frquency-dialog/activity-frquency-dialog.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TreeModule} from "primeng/tree";
import {ILangFacade, LangFacade} from "../../../core/facades/lang.facade";
import {ColorPickerModule} from "primeng/colorpicker";
import {PaginatorModule} from "primeng/paginator";
import {SharedBreadcrumbModule} from "../../../shared/sh-components/breadcrumbs/breadcrumb.component";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SkeletonModule} from "primeng/skeleton";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {InputNumberModule} from "primeng/inputnumber";
import {TranslateObjModule} from "../../../shared/sh-pipes/translate-obj.pipe";
import {NodataTableModule} from "../../../shared/components/nodata-table/nodata-table.module";
import {InputSwitchModule} from "primeng/inputswitch";
import {HttpClient} from "@angular/common/http";
import {TagModule} from "primeng/tag";
import {PanelMenuModule} from "primeng/panelmenu";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {SidebarModule} from "primeng/sidebar";
import {MenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";
import {OrganizationChartModule} from "primeng/organizationchart";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NgxsModule} from "@ngxs/store";
import {BrowseActivityFrquencyState} from "./states/browse-activity-frquency.state";


export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-continuity/',
    '.json'
  );
}

@NgModule({
  declarations: [BrowseActivityFrquencyComponent, ContentActivityFrquencyComponent, ActivityFrquencyDialogComponent],
  imports: [
    CommonModule,
    ActivityFrquencyRoutingModule,
    NgxsModule.forFeature([BrowseActivityFrquencyState]),
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
    InputTextareaModule,
    PanelMenuModule,
    OrganizationChartModule,
    ButtonModule,
    TreeModule,
    TagModule,
    TableModule,
    PaginatorModule,
    MenuModule,
    SkeletonModule,
    ColorPickerModule,
    InputSwitchModule,
    NodataTableModule,
    ColorPickerModule,
    InputNumberModule,
    ToolbarModule,
    DialogModule,
    SidebarModule,
    TranslateObjModule,
    SharedBreadcrumbModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class ActivityFrquencyModule { }
