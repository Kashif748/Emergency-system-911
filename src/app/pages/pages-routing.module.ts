import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnderBuildComponent } from '../under-build/under-build.component';
import { PrivilegeGuard } from '@shared/guards/privilege.guard';
import { IncidentsService } from '../_metronic/core/services/incidents.service';
import { LayoutComponent } from './_layout/layout.component';
import { DashboardService } from './dashboard/dashboard.service';
import { GroupsManagementModule } from '../modules/_team-mgmt/team-mgmt.module';
import { BusinessImpactAnalysisModule } from '../modules/_business-impact-analysis/business-impact-analysis.module';
import { BusinessContinuityModule } from '../modules/_business-continuity/business-continuity.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { animation: 'fade' },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: { animation: 'fade' },
      },

      {
        path: 'correspondences-management',
        canLoad: [PrivilegeGuard],
        data: { permission: 'PRIV_VW_PUB_CORR', animation: 'fade' },
        loadChildren: () =>
          import('../modules/correspondence/correspondence.module').then(
            (m) => m.CorrespondenceModule
          ),
      },
      {
        path: 'circulars-management',
        canLoad: [PrivilegeGuard],
        data: { permission: 'PRIV_VW_CIRC' },
        loadChildren: () =>
          import('../modules/circular/circular.module').then(
            (m) => m.CircularModule
          ),
      },
      {
        path: 'daily-management',
        loadChildren: () =>
          import('../modules/daily-brevity/daily-brevity.module').then(
            (m) => m.DailyBrevityModule
          ),
      },
      {
        path: 'call-duty',
        canLoad: [PrivilegeGuard],

        data: { permission: 'PRV_CFD' },
        loadChildren: () =>
          import('../modules/call-duty/call-duty.module').then(
            (m) => m.CallDutyModule
          ),
      },
      {
        path: 'reports-management',
        loadChildren: () =>
          import('../modules/report/report.module').then((m) => m.ReportModule),
      },

      {
        path: 'libraries-management',
        canLoad: [PrivilegeGuard],
        data: { permission: 'PRV_VW_LIB' },
        loadChildren: () =>
          import('../modules/library/library.module').then(
            (m) => m.LibraryModule
          ),
      },
      {
        path: 'resources-management',
        loadChildren: () =>
          import('../modules/resource/resource.module').then(
            (m) => m.ResourceModule
          ),
      },
      {
        path: 'surveys-management',
        canLoad: [PrivilegeGuard],
        data: { permission: 'PRIV_VW_INC_SURVEY' },
        loadChildren: () =>
          import('../modules/survey-management/survey-management.module').then(
            (m) => m.SurveyManagementModule
          ),
      },
      {
        path: 'surveys-management-report',
        canLoad: [PrivilegeGuard],
        data: { permission: 'PRIV_VW_INC_SURVEY' },
        loadChildren: () =>
          import(
            '../modules/survey-management-report/survey-management-report.module'
          ).then((m) => m.SurveyManagementReportModule),
      },
      {
        path: 'incidents-statistics',
        canLoad: [PrivilegeGuard],
        data: { permission: 'PRIV_VW_RPT_INC_CON' },
        loadChildren: () =>
          import(
            '../modules/incidents-statistics/incidents-statistics.module'
          ).then((m) => m.IncidentsStatisticsModule),
      },
      {
        path: 'notifications-management',
        canLoad: [PrivilegeGuard],
        data: { permission: 'PRIV_VW_SHF' },

        loadChildren: () =>
          import('../modules/sms-report/sms-report.module').then(
            (m) => m.SmsReportModule
          ),
      },

      {
        path: 'shifts-management',
        canLoad: [PrivilegeGuard],
        data: { permission: 'PRIV_VW_SHF' },

        loadChildren: () =>
          import('../modules/shifts-management/shifts-management.module').then(
            (m) => m.ShiftsManagementModule
          ),
      },

      {
        path: 'exercises-management',
        loadChildren: () =>
          import(
            '../modules/exercises-management/exercises-management.module'
          ).then((m) => m.ExercisesManagementModule),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('../modules/_user-mgmt/user-mgmt.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'task-management',
        loadChildren: () =>
          import('../modules/_task-mgmt/task-mgmt.module').then(
            (m) => m.TaskMgmtModule
          ),
      },
      {
        path: 'incidents-management',
        loadChildren: () =>
          import('../modules/_incidents-mgmt/incidents-mgmt.module').then(
            (m) => m.IncidentsMgmtModule
          ),
      },
      {
        path: 'business-continuity',
        loadChildren: () =>
          import(
            '../modules/_business-continuity/business-continuity.module'
          ).then((m) => m.BusinessContinuityModule),
      },
      {
        path: 'company-profile',
        loadChildren: () =>
          import('../modules/trade-license/trade-license.module').then(
            (m) => m.TradeLicenseModule
          ),
      },
      {
        path: 'teams-management',
        canLoad: [PrivilegeGuard],
        data: { permission: ['PRIV_VW_GRP', 'PRIV_VW_MNG_GRP'], type: 'or' },
        loadChildren: () =>
          import('../modules/_team-mgmt/team-mgmt.module').then(
            (m) => m.GroupsManagementModule
          ),
      },
      {
        path: 'groups-management',
        canLoad: [PrivilegeGuard],
        data: { permission: ['PRIV_VW_GRP', 'PRIV_VW_MNG_GRP'], type: 'or' },
        loadChildren: () =>
          import('../modules/groups-management/groups-management.module').then(
            (m) => m.GroupsManagementModule
          ),
      },
      {
        path: 'events-management',
        loadChildren: () =>
          import('../modules/events-management/events-management.module').then(
            (m) => m.EventsManagementModule
          ),
      },
      {
        path: 'events-log',
        loadChildren: () =>
          import('../modules/events-log/events-log.module').then(
            (m) => m.EventsLogModule
          ),
      },
      {
        path: 'personal-inquiry',
        loadChildren: () =>
          import('../modules/personal-inquiry/personal-inquiry.module').then(
            (m) => m.PersonalInquiryModule
          ),
      },
      {
        path: 'doh-dashboard',
        loadChildren: () =>
          import('../modules/doh-dashboard/doh-dashboard.module').then(
            (m) => m.DohDashboardModule
          ),
      },
      {
        path: 'scad-dashboard',
        loadChildren: () =>
          import('../modules/scad-dashboard/scad-dashboard.module').then(
            (m) => m.ScadDashboardModule
          ),
      },

      {
        path: 'adp-dashboard',
        loadChildren: () =>
          import('../modules/adp-dashboard/adp-dashboard.module').then(
            (m) => m.AdpDashboardModule
          ),
      },

      {
        path: 'adPorts-dashboard',
        loadChildren: () =>
          import(
            '../modules/ad-ports-dashboard/ad-ports-dashboard.module'
          ).then((m) => m.AdPortsDashboardModule),
      },

      {
        path: 'dmt-dashboard',
        loadChildren: () =>
          import('../modules/dmt-dashboard/dmt-dashboard.module').then(
            (m) => m.DmtDashboardModule
          ),
      },

      {
        path: 'adnoc-dashboard',
        loadChildren: () =>
          import('../modules/adnoc-dashboard/adnoc-dashboard.module').then(
            (m) => m.AdnocDashboardModule
          ),
      },

      {
        path: 'tadweer-dashboard',
        loadChildren: () =>
          import('../modules/tadweer-dashboard/tadweer-dashboard.module').then(
            (m) => m.TadweerDashboardModule
          ),
      },

      {
        path: 'doe-dashboard',
        loadChildren: () =>
          import('../modules/doe-dashboard/doe-dashboard.module').then(
            (m) => m.DoeDashboardModule
          ),
      },

      {
        path: 'map-dashboard',
        loadChildren: () =>
          import('../modules/map-dashboard/map-dashboard.module').then(
            (m) => m.MapDashboardModule
          ),
      },
      {
        path: 'agenda-management',
        loadChildren: () =>
          import('../modules/agenda-management/agenda-management.module').then(
            (m) => m.AgendaManagementModule
          ),
      },
      {
        path: 'emergencies-phonebook',
        canLoad: [PrivilegeGuard],
        data: { permission: 'PRIV_VW_PHONEBOOK_ENTRY' },
        loadChildren: () =>
          import(
            '../modules/emergencies-phonebook/emergencies-phonebook.module'
          ).then((m) => m.EmergenciesPhonebookModule),
      },
      {
        path: 'incidents',
        // canLoad: [PrivilegeGuard],
        // data: { permission: "PRIV_VW_INC" },
        resolve: { service: IncidentsService },
        loadChildren: () =>
          import('../modules/incidents/incidents.module').then(
            (m) => m.IncidentsModule
          ),
      },
      {
        path: 'reporting',
        canLoad: [PrivilegeGuard],
        // data: { permission: "PRIV_VW_INC" },
        // resolve: { service: IncidentsService },
        loadChildren: () =>
          import('../modules/reporting/reporting.module').then(
            (m) => m.ReportingModule
          ),
      },
      {
        path: 'availability-report',
        canLoad: [PrivilegeGuard],
        // data: { permission: "PRIV_VW_INC" },
        // resolve: { service: IncidentsService },
        loadChildren: () =>
          import(
            '../modules/availability-report/availability-report.module'
          ).then((m) => m.AvailabilityReportModule),
      },
      {
        path: 'organizations',
        canLoad: [PrivilegeGuard],
        data: { permission: 'PRV_VW_ORG' },
        loadChildren: () =>
          import('../modules/organization/organization.module').then(
            (m) => m.OrganizationModule
          ),
      },
      {
        path: 'public-position',
        // canLoad: [PrivilegeGuard],
        // data: { permission: "PRV_VW_ORG" },
        loadChildren: () =>
          import('../modules/public-position/public-position.module').then(
            (m) => m.PublicPositionModule
          ),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('../modules/news/news.module').then((m) => m.NewsModule),
      },
      {
        path: 'wizards',
        loadChildren: () =>
          import('../modules/wizards/wizards.module').then(
            (m) => m.WizardsModule
          ),
      },
      {
        path: 'suggestions',
        loadChildren: () =>
          import('../modules/suggestions/suggestions.module').then(
            (m) => m.SuggestionsModule
          ),
      },
      {
        path: 'trending',
        loadChildren: () =>
          import('../modules/trending/trending.module').then(
            (m) => m.TrendingModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../modules/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'inquiries',
        loadChildren: () =>
          import('../modules/inquiries/inquiries.module').then(
            (m) => m.InquiriesModule
          ),
      },

      {
        path: 'daily-report',
        loadChildren: () =>
          import('../modules/daily-report/daily-report.module').then(
            (m) => m.DailyReportModule
          ),
        canLoad: [PrivilegeGuard],
        data: { permission: 'PRIV_VW_DLY' },
      },
      {
        path: 'user-statistics-report',
        loadChildren: () =>
          import(
            '../modules/user-statistics-report/user-statistics-report.module'
          ).then((m) => m.UserStatisticsReportModule),
        canLoad: [PrivilegeGuard],
      },

      {
        path: 'login-attempts',
        canLoad: [PrivilegeGuard],
        data: { permission: 'PRIV_FAILED_LOGIN_ATTEMPT' },
        loadChildren: () =>
          import('../modules/login-attempts/login-attempts.module').then(
            (m) => m.LoginAttemptsModule
          ),
      },
      {
        path: 'business-continuity-setup',
        loadChildren: () =>
          import(
            '../modules/_business-continuity-setup/business-continuity-setup.module'
          ).then((m) => m.BusinessContinuitySetupModule),
      },
      {
        path: 'business-impact-analysis',
        loadChildren: () =>
          import(
            '../modules/_business-impact-analysis/business-impact-analysis.module'
          ).then((m) => m.BusinessImpactAnalysisModule),
      },
      {
        path: 'business-continuity',
        loadChildren: () =>
          import(
            '../modules/_business-continuity/business-continuity.module'
          ).then((m) => m.BusinessContinuityModule),
      },
      {
        path: 'under-build',
        component: UnderBuildComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
