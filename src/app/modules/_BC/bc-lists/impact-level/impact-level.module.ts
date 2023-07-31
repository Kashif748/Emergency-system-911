import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImpactLevelRoutingModule} from './impact-level-routing.module';
import {BrowseImpactLevelComponent} from './browse-impact-level/browse-impact-level.component';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ContentImpactLevelComponent} from './browse-impact-level/content-impact-level/content-impact-level.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SkeletonModule} from 'primeng/skeleton';
import {ILangFacade, LangFacade} from '@core/facades/lang.facade';
import {PaginatorModule} from 'primeng/paginator';
import {ToolbarModule} from 'primeng/toolbar';
import {SharedBreadcrumbModule} from '@shared/sh-components/breadcrumbs/breadcrumb.component';
import {NgxsModule} from '@ngxs/store';
import {TranslateObjModule} from '@shared/sh-pipes/translate-obj.pipe';
import {TreeModule} from 'primeng/tree';
import {InputTextModule} from 'primeng/inputtext';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TagModule} from 'primeng/tag';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ButtonModule} from 'primeng/button';
import {NodataTableModule} from '@shared/components/nodata-table/nodata-table.module';
import {TableModule} from 'primeng/table';
import {InputSwitchModule} from 'primeng/inputswitch';
import {SidebarModule} from 'primeng/sidebar';
import {MenuModule} from 'primeng/menu';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {BrowseImpactLevelState} from './states/browse-impact-level.state';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';
import {ImpactAnalysisComponent} from '../impact-analysis/impact-analysis.component';
import {PrivilegesDirectiveModule} from '@shared/sh-directives/privileges.directive';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/bc/',
    '.json'
  );
}

@NgModule({
  declarations: [BrowseImpactLevelComponent, ContentImpactLevelComponent,ImpactAnalysisComponent] ,
  imports: [
    CommonModule,
    ImpactLevelRoutingModule,
    NgxsModule.forFeature([BrowseImpactLevelState]),
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
    ConfirmPopupModule,
    InputNumberModule,
    ToolbarModule,
    DialogModule,
    SidebarModule,
    TranslateObjModule,
    SharedBreadcrumbModule,
    PrivilegesDirectiveModule
  ],
  providers: [
    { provide: ILangFacade, useClass: LangFacade },
    ConfirmationService,
  ],
})
export class ImpactLevelModule {}
