import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcListsComponent } from './bc-lists.component';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { NodataTableModule } from '@shared/components/nodata-table/nodata-table.module';
import { SharedBreadcrumbModule } from '@shared/sh-components/breadcrumbs/breadcrumb.component';
import { PrivilegesDirectiveModule } from '@shared/sh-directives/privileges.directive';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { PaginatorModule } from 'primeng/paginator';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';
import { BCListsRoutingModule } from './bc-lists-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/bc/',
    '.json'
  );
}
@NgModule({
  declarations: [BcListsComponent],
  imports: [
    CommonModule,
    BCListsRoutingModule,

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
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class BcListsModule {}
