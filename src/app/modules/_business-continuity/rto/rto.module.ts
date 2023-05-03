import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RtoRoutingModule } from './rto-routing.module';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {OrganizationChartModule} from "primeng/organizationchart";
import {TreeModule} from "primeng/tree";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TagModule} from "primeng/tag";
import {PaginatorModule} from "primeng/paginator";
import {ToolbarModule} from "primeng/toolbar";
import {PanelMenuModule} from "primeng/panelmenu";
import {SharedBreadcrumbModule} from "@shared/sh-components/breadcrumbs/breadcrumb.component";
import {DialogModule} from "primeng/dialog";
import {HttpClient} from "@angular/common/http";
import {InputNumberModule} from "primeng/inputnumber";
import {TableModule} from "primeng/table";
import {SidebarModule} from "primeng/sidebar";
import {NodataTableModule} from "@shared/components/nodata-table/nodata-table.module";
import {InputSwitchModule} from "primeng/inputswitch";
import {SkeletonModule} from "primeng/skeleton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ColorPickerModule} from "primeng/colorpicker";
import {MenuModule} from "primeng/menu";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {ContentRtoComponent} from "./browse-rto/content-rto/content-rto.component";
import {BrowseRtoComponent} from "./browse-rto/browse-rto.component";
import {RtoDialogComponent} from "./browse-rto/rto-dialog/rto-dialog.component";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-continuity/',
    '.json'
  );
}

@NgModule({
  declarations: [ContentRtoComponent, BrowseRtoComponent, RtoDialogComponent],
  imports: [
    CommonModule,
    RtoRoutingModule,
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
    SharedBreadcrumbModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class RtoModule { }
