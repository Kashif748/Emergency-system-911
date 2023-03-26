import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';

import { BusinessContinuityComponent } from './business-continuity/business-continuity.component';
import { BusinessContinuityRoutingModule } from './business-continuity-routing.module';
import { OrgStrucureComponent } from './org-strucure/org-strucure.component';
import { RtoListContentComponent } from './rto-list-content/rto-list-content.component';

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
import { ActivityFrquencyComponent } from './activity-frquency/activity-frquency.component';
import { ActivityPrioritySeqComponent } from './activity-priority-seq/activity-priority-seq.component';
import { LocTypeComponent } from './loc-type/loc-type.component';

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
    NodataTableModule,
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class BusinessContinuityModule {}
