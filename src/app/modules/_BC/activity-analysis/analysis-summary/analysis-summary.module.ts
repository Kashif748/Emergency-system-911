import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisSummaryComponent } from './analysis-summary/analysis-summary.component';
import { ContentAnalysissSummaryComponent } from './analysis-summary/content-analysiss-summary/content-analysiss-summary.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsModule } from '@ngxs/store';
import { BrowseAnalysisSummaryState } from './states/browse-summary.state';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { NodataTableModule } from '@shared/components/nodata-table/nodata-table.module';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FieldsetModule } from 'primeng/fieldset';
import { TreeSelectModule } from '@shared/sh-components/treeselect/treeselect.component';

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
    component: AnalysisSummaryComponent,
  },
];

@NgModule({
  declarations: [AnalysisSummaryComponent, ContentAnalysissSummaryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([BrowseAnalysisSummaryState]),

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
    MultiSelectModule,
    ToggleButtonModule,
    TranslateObjModule,
    TableModule,
    PaginatorModule,
    MenuModule,
    SkeletonModule,
    BlockUIModule,
    ProgressSpinnerModule,
    NodataTableModule,
    SplitButtonModule,
    FieldsetModule,
    TreeSelectModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class AnalysisSummaryModule {}
