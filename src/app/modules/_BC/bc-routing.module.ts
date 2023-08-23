import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BCComponent } from './bc/bc.component';
import {ResoucesModule} from "./resouces/resouces.module";

const routes: Routes = [
  {
    path: '',
    component: BCComponent,
    children: [
      {
        path: '',
        redirectTo: 'lists',
        pathMatch: 'full',
      },
      {
        path: 'lists',
        loadChildren: () =>
          import('./bc-lists/bc-lists.module').then((m) => m.BcListsModule),
      },
      {
        path: 'impact-analysis',
        loadChildren: () =>
          import('./impact-analysis/impact-analysis.module').then(
            (m) => m.ImpactAnalysisModule
          ),
      },

      {
        path: 'activity-analysis',
        loadChildren: () =>
          import('./activity-analysis/activity-analysis.module').then(
            (m) => m.ActivityAnalysisModule
          ),
      },
      {
        path: 'org-activities',
        loadChildren: () =>
          import(
            './organization-activities/organization-activities.module'
          ).then((m) => m.OrganizationActivitiesModule),
      },
      {
        path: 'org-activities',
        loadChildren: () =>
          import(
            './organization-activities/organization-activities.module'
            ).then((m) => m.OrganizationActivitiesModule),
      },
      {
        path: 'resources',
        loadChildren: () =>
          import(
            './resouces/resouces.module'
            ).then((m) => m.ResoucesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BCRoutingModule {}
