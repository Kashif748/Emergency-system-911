import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityPrioritySequenceRoutingModule } from './activity-priority-sequence-routing.module';
import { BrowseActivityPriorityComponent } from './browse-activity-priority/browse-activity-priority.component';
import { ActivityPriorityDialogComponent } from './browse-activity-priority/activity-priority-dialog/activity-priority-dialog.component';
import { ContentActivityPriorityComponent } from './browse-activity-priority/content-activity-priority/content-activity-priority.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TreeModule} from "primeng/tree";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import {TranslateHttpLoaderFactory} from "../rto/rto.module";
import {ColorPickerModule} from "primeng/colorpicker";
import {PaginatorModule} from "primeng/paginator";
import {SharedBreadcrumbModule} from "@shared/sh-components/breadcrumbs/breadcrumb.component";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SkeletonModule} from "primeng/skeleton";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {InputNumberModule} from "primeng/inputnumber";
import {TranslateObjModule} from "@shared/sh-pipes/translate-obj.pipe";
import {NodataTableModule} from "@shared/components/nodata-table/nodata-table.module";
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


@NgModule({
  declarations: [BrowseActivityPriorityComponent, ActivityPriorityDialogComponent, ContentActivityPriorityComponent],
  imports: [
    CommonModule,
    ActivityPrioritySequenceRoutingModule,
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
export class ActivityPrioritySequenceModule { }
