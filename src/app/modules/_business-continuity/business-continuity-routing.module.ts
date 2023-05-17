import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BusinessContinuityComponent} from './business-continuity/business-continuity.component';
import {OrgHierarchyComponent} from "./org-hierarchy/org-hierarchy.component";
import {AddSectorComponent} from "./org-hierarchy/add-sector/add-sector.component";
import {AddSectionComponent} from "./org-hierarchy/add-section/add-section.component";
import {AddDepartmentComponent} from "./org-hierarchy/add-department/add-department.component";

const routes: Routes = [
  {
    path: '',
    component: BusinessContinuityComponent,

    children: [
      {
        path: 'org-details',
        loadChildren: () => import('./org-detail/org-detail.module').then((m) => m.OrgDetailModule),
      },
      {
        path: 'org-strucure',
        component: OrgHierarchyComponent,
        children: [{
            path: 'add-sector',
            component: AddSectorComponent,
        },
          {
            path: 'add-department',
            component: AddDepartmentComponent,
          },
          {
            path: 'add-section',
            component: AddSectionComponent,
          }]
      },
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
