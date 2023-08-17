import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StaffRequirementRoutingModule} from './staff-requirement-routing.module';
import {BrowseStaffReqComponent} from './browse-staff-req/browse-staff-req.component';
import {StaffReqDialogComponent} from './browse-staff-req/staff-req-dialog/staff-req-dialog.component';
import {StaffReqContentComponent} from './browse-staff-req/staff-req-content/staff-req-content.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {NgxsModule} from "@ngxs/store";
import {HttpClient} from "@angular/common/http";
import {TranslateObjModule} from "@shared/sh-pipes/translate-obj.pipe";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputNumberModule} from "primeng/inputnumber";
import {SharedBreadcrumbModule} from "@shared/sh-components/breadcrumbs/breadcrumb.component";
import {ColorPickerModule} from "primeng/colorpicker";
import {TagModule} from "primeng/tag";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SidebarModule} from "primeng/sidebar";
import {TableModule} from "primeng/table";
import {ToggleButtonModule} from "primeng/togglebutton";
import {PrivilegesDirectiveModule} from "@shared/sh-directives/privileges.directive";
import {PanelMenuModule} from "primeng/panelmenu";
import {ToolbarModule} from "primeng/toolbar";
import {MenuModule} from "primeng/menu";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {OrganizationChartModule} from "primeng/organizationchart";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {TreeModule} from "primeng/tree";
import {SkeletonModule} from "primeng/skeleton";
import {PaginatorModule} from "primeng/paginator";
import {DialogModule} from "primeng/dialog";
import {NodataTableModule} from "@shared/components/nodata-table/nodata-table.module";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BrowseStaffState} from "./states/browse-staff.state";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-resources/',
    '.json'
  );
}


@NgModule({
  declarations: [BrowseStaffReqComponent, StaffReqDialogComponent, StaffReqContentComponent],
  imports: [
    CommonModule,
    StaffRequirementRoutingModule,
    NgxsModule.forFeature([BrowseStaffState]),
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
export class StaffRequirementModule { }
