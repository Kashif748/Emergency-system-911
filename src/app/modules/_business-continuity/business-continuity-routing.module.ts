import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityFrquencyComponent } from './activity-frq/activity-frquency.component';
import { BusinessContinuityComponent } from './business-continuity/business-continuity.component';
import { ImpactAnalysisComponent } from './impact-analysis/impact-analysis.component';
import { ImpactLevelsComponent } from './impact-levels/impact-levels.component';
import { LocTypeComponent } from './loc-type/loc-type.component';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { OrgStrucureComponent } from './org-strucure/org-strucure.component';
import {ActivityFrquencyModule} from "./activity-frquency/activity-frquency.module";

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
        loadChildren: () => import('./rto/rto.module').then((m) => m.RtoModule),
      },
      {
        path: 'activey-frquency',
        loadChildren: () => import('./activity-frquency/activity-frquency.module').then((m) => m.ActivityFrquencyModule),
      },
      {
        path: 'activey-priority',
        loadChildren: () => import('./activity-priority-sequence/activity-priority-sequence.module').then((m) => m.ActivityPrioritySequenceModule),
      },
      {
        path: 'loc-types',
        component: LocTypeComponent,
      },
      {
        path: 'imp-level-working',
        loadChildren: () => import('./importance-level-working/importance-level-working.module').then((m) => m.ImportanceLevelWorkingModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessContinuityRoutingModule {}
