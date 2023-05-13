import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportanceLevelWorkingRoutingModule } from './importance-level-working-routing.module';
import { BrowseImpLevelWorkingComponent } from './browse-imp-level-working/browse-imp-level-working.component';
import { ImpLevelWorkingDialogComponent } from './browse-imp-level-working/imp-level-working-dialog/imp-level-working-dialog.component';
import { ContentImpLevelWorkingComponent } from './browse-imp-level-working/content-imp-level-working/content-imp-level-working.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import {ILangFacade, LangFacade} from "../../../core/facades/lang.facade";
import {ColorPickerModule} from "primeng/colorpicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrganizationChartModule} from "primeng/organizationchart";
import {SkeletonModule} from "primeng/skeleton";
import {ToolbarModule} from "primeng/toolbar";
import {SharedBreadcrumbModule} from "../../../shared/sh-components/breadcrumbs/breadcrumb.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {PaginatorModule} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {NodataTableModule} from "../../../shared/components/nodata-table/nodata-table.module";
import {InputNumberModule} from "primeng/inputnumber";
import {HttpClient} from "@angular/common/http";
import {PanelMenuModule} from "primeng/panelmenu";
import {TagModule} from "primeng/tag";
import {TreeModule} from "primeng/tree";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {SidebarModule} from "primeng/sidebar";
import {MenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NgxsModule} from "@ngxs/store";
import {BrowseRtoState} from "../rto/states/browse-rto.state";
import {BrowseImpLevelWorkingState} from "./browse-imp-level-working/states/browse-imp-level-working.state";
import {ToggleButtonModule} from "primeng/togglebutton";
import {DividerModule} from "primeng/divider";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-continuity/',
    '.json'
  );
}


@NgModule({
  declarations: [BrowseImpLevelWorkingComponent, ImpLevelWorkingDialogComponent, ContentImpLevelWorkingComponent],
  imports: [
    CommonModule,
    ImportanceLevelWorkingRoutingModule,
    NgxsModule.forFeature([BrowseImpLevelWorkingState]),
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
    InputSwitchModule,
    NodataTableModule,
    ColorPickerModule,
    InputNumberModule,
    ToolbarModule,
    DialogModule,
    SidebarModule,
    SharedBreadcrumbModule,
    DividerModule,
    ToggleButtonModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class ImportanceLevelWorkingModule { }
