import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { BrowseRecordsComponent } from './browse-records/browse-records.component';
import { RecordDialogComponent } from './browse-records/record-dialog/record-dialog.component';
import { RecordContentComponent } from './browse-records/record-content/record-content.component';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TableModule} from "primeng/table";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PanelMenuModule} from "primeng/panelmenu";
import {ToolbarModule} from "primeng/toolbar";
import {SkeletonModule} from "primeng/skeleton";
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TreeModule} from "primeng/tree";
import {SidebarModule} from "primeng/sidebar";
import {InputTextModule} from "primeng/inputtext";
import {TranslateObjModule} from "@shared/sh-pipes/translate-obj.pipe";
import {NgxsModule} from "@ngxs/store";
import {ToggleButtonModule} from "primeng/togglebutton";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {InputSwitchModule} from "primeng/inputswitch";
import {PrivilegesDirectiveModule} from "@shared/sh-directives/privileges.directive";
import {TagModule} from "primeng/tag";
import {MenuModule} from "primeng/menu";
import {ColorPickerModule} from "primeng/colorpicker";
import {BrowseStaffState} from "../staff-requirement/states/browse-staff.state";
import {InputNumberModule} from "primeng/inputnumber";
import {NodataTableModule} from "@shared/components/nodata-table/nodata-table.module";
import {SharedBreadcrumbModule} from "@shared/sh-components/breadcrumbs/breadcrumb.component";
import {OrganizationChartModule} from "primeng/organizationchart";
import {PaginatorModule} from "primeng/paginator";
import {BrowseRecordsState} from "./states/browse-records.state";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {BlockUIModule} from "primeng/blockui";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-resources/',
    '.json'
  );
}

@NgModule({
  declarations: [BrowseRecordsComponent, RecordDialogComponent, RecordContentComponent],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    NgxsModule.forFeature([BrowseRecordsState]),
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
    SharedBreadcrumbModule,
    DividerModule,
    ToggleButtonModule,
    PrivilegesDirectiveModule,
    BlockUIModule,
    ProgressSpinnerModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class RecordsModule { }
