import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessContinuityComponent } from './business-continuity/business-continuity.component';
import { ImpactAnalysisComponent } from './impact-analysis/impact-analysis.component';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { OrgStrucureComponent } from './org-strucure/org-strucure.component';
import {OrgDetailModule} from "./org-detail/org-detail.module";
import {ImpactMatrixModule} from "./impact-matrix/impact-matrix.module";

const routes: Routes = [
  {
    path: '',
    component: BusinessContinuityComponent,

    children: [
      {
        path: 'org-details',
        loadChildren: () => import('./org-detail/org-detail.module').then((m) => m.OrgDetailModule),
      },
      /*{
        path: 'org-strucure',
        component: OrgStrucureComponent,
      },*/
      {
        path: 'impact-level',
        loadChildren: () => import('./impact-level/impact-level.module').then((m) => m.ImpactLevelModule),
      },
      {
        path: 'impact-analysis',
        loadChildren: () => import('./impact-matrix/impact-matrix.module').then((m) => m.ImpactMatrixModule),
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
          loadChildren: () => import('./location-type/location-type.module').then((m) => m.LocationTypeModule),
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
