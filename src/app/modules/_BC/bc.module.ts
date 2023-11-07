import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';

import { BCComponent } from './bc/bc.component';
import { BCRoutingModule } from './bc-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TreeModule } from 'primeng/tree';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { NodataTableModule } from '../../shared/components/nodata-table/nodata-table.module';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { PaginatorModule } from 'primeng/paginator';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { InputNumberModule } from 'primeng/inputnumber';
import { SharedBreadcrumbModule } from '@shared/sh-components/breadcrumbs/breadcrumb.component';
import { DividerModule } from 'primeng/divider';
import { NgxsModule } from '@ngxs/store';
import { BrowseBCState } from './states/browse-bc.state';
import { PrivilegesDirectiveModule } from '@shared/sh-directives/privileges.directive';
import { BadgeModule } from 'primeng/badge';
import {CdateModule} from "@shared/sh-pipes/cdate.pipe";
import {ToggleButtonModule} from "primeng/togglebutton";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/bc/',
    '.json'
  );
}

@NgModule({
  declarations: [BCComponent],
  imports: [
    CommonModule,
    BCRoutingModule,
    NgxsModule.forFeature([BrowseBCState]),
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
    TranslateObjModule,
    ToolbarModule,
    DialogModule,
    SidebarModule,
    DividerModule,
    SharedBreadcrumbModule,
    PrivilegesDirectiveModule,
    BadgeModule,
    CdateModule,
    ToggleButtonModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class BCModule {}
