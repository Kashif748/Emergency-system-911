import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityFrquencyComponent } from './activity-frquency/activity-frquency.component';
import { ActivityPrioritySeqComponent } from './activity-priority-seq/activity-priority-seq.component';
import { BusinessContinuityComponent } from './business-continuity/business-continuity.component';
import { ImpactAnalysisComponent } from './impact-analysis/impact-analysis.component';
import { ImpactLevelsComponent } from './impact-levels/impact-levels.component';
import { LocTypeComponent } from './loc-type/loc-type.component';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { OrgStrucureComponent } from './org-strucure/org-strucure.component';
import { RtoListContentComponent } from './rto-list-content/rto-list-content.component';
import { ImpLevelWorkingComponent } from './imp-level-working/imp-level-working.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessContinuityComponent,

    children: [
      {
        path: 'org-details',
        component: OrgDetailsComponent,
      },
      {
        path: 'org-strucure',
        component: OrgStrucureComponent,
      },
      {
        path: 'impact-levels',
        component: ImpactLevelsComponent,
      },
      {
        path: 'impact-analysis',
        component: ImpactAnalysisComponent,
      },
      {
        path: 'rto-list',
        component: RtoListContentComponent,
      },
      {
        path: 'activey-frquency',
        component: ActivityFrquencyComponent,
      },
      {
        path: 'activey-priority',
        component: ActivityPrioritySeqComponent,
      },
      {
        path: 'loc-types',
        component: LocTypeComponent,
      },
      {
        path: 'imp-level-working',
        component: ImpLevelWorkingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessContinuityRoutingModule {}