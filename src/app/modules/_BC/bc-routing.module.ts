import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivilegeGuard } from '@shared/guards/privilege.guard';
import { BCComponent } from './bc/bc.component';
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
        canLoad: [PrivilegeGuard],
        data: {
          permission: 'PRIV_VW_BC_LISTS',
        },
        loadChildren: () =>
          import('./bc-lists/bc-lists.module').then((m) => m.BcListsModule),
      },
      {
        path: 'impact-analysis',
        canLoad: [PrivilegeGuard],
        data: {
          permission: 'PRIV_VW_ACTIVITY_ANALYSIS',
        },
        loadChildren: () =>
          import('./impact-analysis/impact-analysis.module').then(
            (m) => m.ImpactAnalysisModule
          ),
      },

      {
        path: 'activity-analysis',
        canLoad: [PrivilegeGuard],
        data: {
          permission: [
            'PRIV_PERFORM_ACTIVITY_ANALYSIS',
            'PRIV_REVIEW_ACTIVITY_ANALYSIS',
            'PRIV_APPROVE_ACTIVITY_ANALYSIS',
          ],
          type: 'or',
        },
        loadChildren: () =>
          import('./activity-analysis/activity-analysis.module').then(
            (m) => m.ActivityAnalysisModule
          ),
      },
      {
        path: 'resources',
        canLoad: [PrivilegeGuard],
        data: {
          permission: [
            'PRIV_PERFORM_ACTIVITY_ANALYSIS',
            'PRIV_REVIEW_ACTIVITY_ANALYSIS',
            'PRIV_APPROVE_ACTIVITY_ANALYSIS',
          ],
          type: 'or',
        },
        loadChildren: () =>
          import('./resouces/resouces.module').then((m) => m.ResoucesModule),
      },
      {
        path: 'org-activities',
        canLoad: [PrivilegeGuard],
        data: {
          permission: ['PRIV_VW_ORG_ACTIVITY', 'PRIV_VW_ALL_ACTIVITIES'],
          type: 'or',
        },
        loadChildren: () =>
          import(
            './organization-activities/organization-activities.module'
          ).then((m) => m.OrganizationActivitiesModule),
      },
      {
        path: 'bia-apps',
        canLoad: [PrivilegeGuard],
        data: {
          permission: 'PRIV_VW_ACTIVITY_ANALYSIS',
        },
        loadChildren: () =>
          import('./bia-app/bia-app.module').then((m) => m.BiaAppModule),
      },
      {
        path: 'bia-analysis-summary',
        canLoad: [PrivilegeGuard],
        data: {
          permission: [
            'PRIV_VW_ACTIVITY_ANALYSIS',
          ],
          type: 'or',
        },
        loadChildren: () =>
          import('./analysis-summary/analysis-summary.module').then(
            (m) => m.AnalysisSummaryModule
          ),
      },
      {
        path: 'systems-report',
        canLoad: [PrivilegeGuard],
        data: {
          permission: ['PRIV_VW_ACTIVITY_ANALYSIS'],
        },
        loadChildren: () =>
          import('./reports/systems-report/systems-report.module').then(
            (m) => m.SystemsReportModule
          ),
      },
      {
        path: 'vendors-report',
        canLoad: [PrivilegeGuard],
        data: {
          permission: ['PRIV_VW_ACTIVITY_ANALYSIS'],
        },
        loadChildren: () =>
          import('./reports/vendors-report/vendors-report.module').then(
            (m) => m.VendorsReportModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BCRoutingModule {}
