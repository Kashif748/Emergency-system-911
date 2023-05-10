import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';

import { BusinessContinuityComponent } from './business-continuity/business-continuity.component';
import { BusinessContinuityRoutingModule } from './business-continuity-routing.module';
import { OrgStrucureComponent } from './org-strucure/org-strucure.component';
import { RtoListContentComponent } from './rto-list-content/rto-list-content.component';
import { ActivityFrquencyComponent } from './activity-frq/activity-frquency.component';
import { ActivityPrioritySeqComponent } from './activity-priority-seq/activity-priority-seq.component';
import { LocTypeComponent } from './loc-type/loc-type.component';
import { ImpactLevelsComponent } from './impact-levels/impact-levels.component';
import { ImpactAnalysisComponent } from './impact-analysis/impact-analysis.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TreeModule } from 'primeng/tree';
import { OrgDetailsComponent } from './org-details/org-details.component';
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
import { ImpLevelWorkingComponent } from './imp-level-working/imp-level-working.component';
import { ToolbarModule } from 'primeng/toolbar';
import {SidebarModule} from 'primeng/sidebar';
import {InputNumberModule} from 'primeng/inputnumber';

import { SharedBreadcrumbModule } from '@shared/sh-components/breadcrumbs/breadcrumb.component';

import { AddRtoDialogComponent } from './dialog/add-rto-dialog/add-rto-dialog.component';
import { AddImpLevelComponent } from './dialog/add-imp-level/add-imp-level.component';
import { AddPrioritySeqComponent } from './dialog/add-priority-seq/add-priority-seq.component';
import { AddLocTypeComponent } from './dialog/add-loc-type/add-loc-type.component';
import { AddActivityFrqComponent } from './dialog/add-activity-frq/add-activity-frq.component';
import { AddImpactTypeComponent } from './dialog/add-impact-type/add-impact-type.component';
import { BrowseActivityFrquencyComponent } from './activity-frq/browse-activity-frquency/browse-activity-frquency.component';

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
    RtoListContentComponent,
    ActivityFrquencyComponent,
    ActivityPrioritySeqComponent,
    LocTypeComponent,
    ImpLevelWorkingComponent,
    AddRtoDialogComponent,
    AddImpLevelComponent,
    AddPrioritySeqComponent,
    AddLocTypeComponent,
    AddActivityFrqComponent,
    ImpactLevelsComponent,
    ImpactAnalysisComponent,
    AddImpactTypeComponent,
    BrowseActivityFrquencyComponent,
  ],
  imports: [
    CommonModule,
    BusinessContinuityRoutingModule,
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
    SharedBreadcrumbModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class BusinessContinuityModule {}
