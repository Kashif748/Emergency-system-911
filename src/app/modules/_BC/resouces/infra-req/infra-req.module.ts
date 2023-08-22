import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InfraReqRoutingModule} from './infra-req-routing.module';
import {BrowseInfraReqComponent} from './browse-infra-req/browse-infra-req.component';
import {InfraDialogComponent} from './browse-infra-req/infra-dialog/infra-dialog.component';
import {InfraContentComponent} from './browse-infra-req/infra-content/infra-content.component';
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
import {InputNumberModule} from "primeng/inputnumber";
import {NodataTableModule} from "@shared/components/nodata-table/nodata-table.module";
import {SharedBreadcrumbModule} from "@shared/sh-components/breadcrumbs/breadcrumb.component";
import {OrganizationChartModule} from "primeng/organizationchart";
import {PaginatorModule} from "primeng/paginator";
import {BrowseInfraState} from "./states/browse-infra.state";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-resources/',
    '.json'
  );
}

@NgModule({
  declarations: [BrowseInfraReqComponent, InfraDialogComponent, InfraContentComponent],
  imports: [
    CommonModule,
    InfraReqRoutingModule,
    NgxsModule.forFeature([BrowseInfraState]),
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
export class InfraReqModule { }
