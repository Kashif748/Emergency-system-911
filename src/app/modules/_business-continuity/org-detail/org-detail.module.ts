import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgDetailRoutingModule } from './org-detail-routing.module';
import {InputNumberModule} from "primeng/inputnumber";
import {ToggleButtonModule} from "primeng/togglebutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SkeletonModule} from "primeng/skeleton";
import {ILangFacade, LangFacade} from "../../../core/facades/lang.facade";
import {HttpClient} from "@angular/common/http";
import {PaginatorModule} from "primeng/paginator";
import {ToolbarModule} from "primeng/toolbar";
import {SharedBreadcrumbModule} from "../../../shared/sh-components/breadcrumbs/breadcrumb.component";
import {NgxsModule} from "@ngxs/store";
import {TranslateHttpLoaderFactory} from "../rto/rto.module";
import {TranslateObjModule} from "../../../shared/sh-pipes/translate-obj.pipe";
import {TreeModule} from "primeng/tree";
import {InputTextModule} from "primeng/inputtext";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {DividerModule} from "primeng/divider";
import {DialogModule} from "primeng/dialog";
import {BrowseRtoState} from "../rto/states/browse-rto.state";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PanelMenuModule} from "primeng/panelmenu";
import {TagModule} from "primeng/tag";
import {ColorPickerModule} from "primeng/colorpicker";
import {ButtonModule} from "primeng/button";
import {NodataTableModule} from "../../../shared/components/nodata-table/nodata-table.module";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {SidebarModule} from "primeng/sidebar";
import {MenuModule} from "primeng/menu";
import {OrganizationChartModule} from "primeng/organizationchart";
import { BrowseOrgDetailComponent } from './browse-org-detail/browse-org-detail.component';
import { ContentOrgDetailComponent } from './browse-org-detail/content-org-detail/content-org-detail.component';
import { OrgDetailDialogComponent } from './browse-org-detail/org-detail-dialog/org-detail-dialog.component';
import { BrowseOrgDetailState} from "./states/browse-orgDetail.state";


@NgModule({
  declarations: [BrowseOrgDetailComponent, ContentOrgDetailComponent, OrgDetailDialogComponent],
  imports: [
    CommonModule,
    OrgDetailRoutingModule,
    NgxsModule.forFeature([BrowseOrgDetailState]),
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
    ToggleButtonModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class OrgDetailModule { }
