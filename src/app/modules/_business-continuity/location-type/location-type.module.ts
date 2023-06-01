import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LocationTypeRoutingModule} from './location-type-routing.module';
import {BrowseLocationTypeComponent} from './browse-location-type/browse-location-type.component';
import {ContentLocationTypeComponent} from './browse-location-type/content-location-type/content-location-type.component';
import {LocationTypeDialogComponent} from './browse-location-type/location-type-dialog/location-type-dialog.component';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {InputNumberModule} from "primeng/inputnumber";
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
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PanelMenuModule} from "primeng/panelmenu";
import {TagModule} from "primeng/tag";
import {ColorPickerModule} from "primeng/colorpicker";
import {NodataTableModule} from "@shared/components/nodata-table/nodata-table.module";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {SidebarModule} from "primeng/sidebar";
import {MenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";
import {OrganizationChartModule} from "primeng/organizationchart";
import {BrowseLocationTypeState} from "./states/browse-locationType.state";
import {ToggleButtonModule} from "primeng/togglebutton";
import {DividerModule} from "primeng/divider";
import {PrivilegesDirectiveModule} from '@shared/sh-directives/privileges.directive';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-continuity/',
    '.json'
  );
}

@NgModule({
  declarations: [BrowseLocationTypeComponent, ContentLocationTypeComponent, LocationTypeDialogComponent],
  imports: [
    CommonModule,
    LocationTypeRoutingModule,
    NgxsModule.forFeature([BrowseLocationTypeState]),
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
export class LocationTypeModule { }
