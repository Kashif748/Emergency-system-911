import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {ILangFacade, LangFacade} from '@core/facades/lang.facade';
import {TranslateObjModule} from '@shared/sh-pipes/translate-obj.pipe';

import {BusinessContinuityComponent} from './business-continuity/business-continuity.component';
import {BusinessContinuityRoutingModule} from './business-continuity-routing.module';
import {OrgStrucureComponent} from './org-strucure/org-strucure.component';
import {ImpactAnalysisComponent} from './impact-analysis/impact-analysis.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ButtonModule} from 'primeng/button';
import {TagModule} from 'primeng/tag';
import {TreeModule} from 'primeng/tree';
import {OrgDetailsComponent} from './org-details/org-details.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TableModule} from 'primeng/table';
import {NodataTableModule} from '../../shared/components/nodata-table/nodata-table.module';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {PaginatorModule} from 'primeng/paginator';
import {MenuModule} from 'primeng/menu';
import {SkeletonModule} from 'primeng/skeleton';
import {ColorPickerModule} from 'primeng/colorpicker';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DialogModule} from 'primeng/dialog';
import {ToolbarModule} from 'primeng/toolbar';
import {SidebarModule} from 'primeng/sidebar';
import {InputNumberModule} from 'primeng/inputnumber';
import {SharedBreadcrumbModule} from '@shared/sh-components/breadcrumbs/breadcrumb.component';
import {DividerModule} from "primeng/divider";
import {OrgHierarchyComponent} from "./org-hierarchy/org-hierarchy.component";
import {AddSectorComponent} from "./org-hierarchy/add-sector/add-sector.component";
import {AddSectionComponent} from "./org-hierarchy/add-section/add-section.component";
import {AddDepartmentComponent} from "./org-hierarchy/add-department/add-department.component";
import {BrowseRtoState} from "./rto/states/browse-rto.state";
import {NgxsModule} from "@ngxs/store";
import {BrowseBusinessContinuityState} from "./states/browse-business-continuity.state";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-continuity/',
    '.json'
  );
}

@NgModule({
  declarations: [
    BusinessContinuityComponent,
    OrgDetailsComponent,
    OrgStrucureComponent,
    OrgHierarchyComponent,
    AddSectorComponent,
    AddSectionComponent,
    AddDepartmentComponent,
    ImpactAnalysisComponent
  ],
  imports: [
    CommonModule,
    BusinessContinuityRoutingModule,
    NgxsModule.forFeature([BrowseBusinessContinuityState]),
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
    TranslateObjModule,
    DividerModule,
    SharedBreadcrumbModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class BusinessContinuityModule {}
