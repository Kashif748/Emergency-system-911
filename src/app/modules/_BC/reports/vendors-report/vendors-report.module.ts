import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseVendorsReportComponent } from './browse-vendors-report/browse-vendors-report.component';
import { VendorsReportContentComponent } from './browse-vendors-report/vendors-report-content/vendors-report-content.component';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { NodataTableModule } from '@shared/components/nodata-table/nodata-table.module';
import { SharedBreadcrumbModule } from '@shared/sh-components/breadcrumbs/breadcrumb.component';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeSelectModule } from '@shared/sh-components/treeselect/treeselect.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { NgxsModule } from '@ngxs/store';
import { BrowseVendorsReportState } from './states/browse-vendors-report.state';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-activity-analysis/',
    '.json'
  );
}
const routes: Routes = [
  {
    path: '',
    component: BrowseVendorsReportComponent,
  },
];

@NgModule({
  declarations: [VendorsReportContentComponent, BrowseVendorsReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([BrowseVendorsReportState]),

    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    ButtonModule,
    ToolbarModule,
    TranslateObjModule,
    TableModule,
    PaginatorModule,
    SkeletonModule,
    NodataTableModule,
    FieldsetModule,
    TreeSelectModule,
    MultiSelectModule,
    ToggleButtonModule,
    SharedBreadcrumbModule,
    ButtonModule,
    ToolbarModule,
    MultiSelectModule,
    ToggleButtonModule,
    TranslateObjModule,
    TableModule,
    PaginatorModule,
    MenuModule,
    SkeletonModule,
    NodataTableModule,
    SplitButtonModule,
    FieldsetModule,
    TreeSelectModule,
    SharedBreadcrumbModule,
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class VendorsReportModule {}
