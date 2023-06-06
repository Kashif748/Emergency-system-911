import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImpactMatrixRoutingModule} from './impact-matrix-routing.module';
import {BrowseImpactMatrixComponent} from './browse-impact-matrix/browse-impact-matrix.component';
import {ContentImpactMatrixComponent} from './browse-impact-matrix/content-impact-matrix/content-impact-matrix.component';
import {ImpactMatrixDialogComponent} from './browse-impact-matrix/impact-matrix-dialog/impact-matrix-dialog.component';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {InputNumberModule} from "primeng/inputnumber";
import {ToggleButtonModule} from "primeng/togglebutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SkeletonModule} from "primeng/skeleton";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import {PaginatorModule} from "primeng/paginator";
import {ToolbarModule} from "primeng/toolbar";
import {SharedBreadcrumbModule} from "@shared/sh-components/breadcrumbs/breadcrumb.component";
import {NgxsModule} from "@ngxs/store";
import {TranslateObjModule} from "@shared/sh-pipes/translate-obj.pipe";
import {TreeModule} from "primeng/tree";
import {InputTextModule} from "primeng/inputtext";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {DividerModule} from "primeng/divider";
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PanelMenuModule} from "primeng/panelmenu";
import {TagModule} from "primeng/tag";
import {ColorPickerModule} from "primeng/colorpicker";
import {ButtonModule} from "primeng/button";
import {NodataTableModule} from "@shared/components/nodata-table/nodata-table.module";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {SidebarModule} from "primeng/sidebar";
import {MenuModule} from "primeng/menu";
import {OrganizationChartModule} from "primeng/organizationchart";
import {BrowseImpactMatrixState} from "./states/browse-impact-matrix.state";
import {BrowseImpactLevelMatrixState} from "./states/browse-impact-level-matrix.state";
import {PrivilegesDirectiveModule} from '@shared/sh-directives/privileges.directive';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-continuity/',
    '.json'
  );
}

@NgModule({
  declarations: [BrowseImpactMatrixComponent, ContentImpactMatrixComponent, ImpactMatrixDialogComponent],
  imports: [
    CommonModule,
    ImpactMatrixRoutingModule,
    NgxsModule.forFeature([BrowseImpactMatrixState, BrowseImpactLevelMatrixState]),
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
    PrivilegesDirectiveModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class ImpactMatrixModule { }
