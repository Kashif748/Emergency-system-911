import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseEmployeesReportComponent } from './browse-employees-report/browse-employees-report.component';
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
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { EmployeesReportContentComponent } from './browse-employees-report/employees-report-content/employees-report-content.component';
import { BrowseEmployeesReportState } from './states/browse-employees-report.state';

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
    component: BrowseEmployeesReportComponent,
  },
];

@NgModule({
  declarations: [EmployeesReportContentComponent, BrowseEmployeesReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([BrowseEmployeesReportState]),

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
export class EmployeesReportModule {}
