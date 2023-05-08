/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { SlaV2ControllerService } from './services/sla-v-2-controller.service';
import { KpiV2ControllerService } from './services/kpi-v-2-controller.service';
import { VersionControllerService } from './services/version-controller.service';
import { UserProfileControllerService } from './services/user-profile-controller.service';
import { UserPreferencesControllerService } from './services/user-preferences-controller.service';
import { TaskControllerService } from './services/task-controller.service';
import { TaskWorkLogControllerService } from './services/task-work-log-controller.service';
import { SystemEventControllerService } from './services/system-event-controller.service';
import { SuggestionStatusControllerService } from './services/suggestion-status-controller.service';
import { SuggestionControllerService } from './services/suggestion-controller.service';
import { SlaControllerService } from './services/sla-controller.service';
import { SlaDetailsControllerService } from './services/sla-details-controller.service';
import { SituationControllerService } from './services/situation-controller.service';
import { ShiftConfigurationControllerService } from './services/shift-configuration-controller.service';
import { ShiftControllerService } from './services/shift-controller.service';
import { RoleControllerService } from './services/role-controller.service';
import { ReportingViaControllerService } from './services/reporting-via-controller.service';
import { AuthenticationControllerService } from './services/authentication-controller.service';
import { ReasonControllerService } from './services/reason-controller.service';
import { RanksControllerService } from './services/ranks-controller.service';
import { PushNotificationBodyControllerService } from './services/push-notification-body-controller.service';
import { PushNotificationActionControllerService } from './services/push-notification-action-controller.service';
import { PriorityControllerService } from './services/priority-controller.service';
import { ExternalPhonebookControllerService } from './services/external-phonebook-controller.service';
import { OrgStructureControllerService } from './services/org-structure-controller.service';
import { OrgQuickLinkControllerService } from './services/org-quick-link-controller.service';
import { OperationalReportControllerService } from './services/operational-report-controller.service';
import { OperationalReportStatusControllerService } from './services/operational-report-status-controller.service';
import { NotificationControllerService } from './services/notification-controller.service';
import { NewsControllerService } from './services/news-controller.service';
import { NewsTypeControllerService } from './services/news-type-controller.service';
import { MsExchangeOrgConfigControllerService } from './services/ms-exchange-org-config-controller.service';
import { ModuleControllerService } from './services/module-controller.service';
import { ModuleOrgControllerService } from './services/module-org-controller.service';
import { LocalRiskControllerService } from './services/local-risk-controller.service';
import { LibraryCategoriesService } from './services/library-categories.service';
import { LibraryAccessTypesService } from './services/library-access-types.service';
import { LibraryService } from './services/library.service';
import { LeaveCalendarControllerService } from './services/leave-calendar-controller.service';
import { KpiControllerService } from './services/kpi-controller.service';
import { InterimIncidentControllerService } from './services/interim-incident-controller.service';
import { InquiryControllerService } from './services/inquiry-controller.service';
import { IncidentsWorkLogControllerService } from './services/incidents-work-log-controller.service';
import { IncidentsChallengesReqControllerService } from './services/incidents-challenges-req-controller.service';
import { IncidentControllerService } from './services/incident-controller.service';
import { IncidentStatusControllerService } from './services/incident-status-controller.service';
import { IncidentRiskImpactControllerService } from './services/incident-risk-impact-controller.service';
import { IncidentReminderControllerService } from './services/incident-reminder-controller.service';
import { IncidentReasonControllerService } from './services/incident-reason-controller.service';
import { IncidentOrgControllerService } from './services/incident-org-controller.service';
import { GroupCategoryCenterControllerService } from './services/group-category-center-controller.service';
import { IncidentHospitalControllerService } from './services/incident-hospital-controller.service';
import { IncidentGroupControllerService } from './services/incident-group-controller.service';
import { IncidentEnvironmentImpactControllerService } from './services/incident-environment-impact-controller.service';
import { IncidentCategoryControllerService } from './services/incident-category-controller.service';
import { IncidentsAssetsControllerService } from './services/incidents-assets-controller.service';
import { InappNotificationControllerService } from './services/inapp-notification-controller.service';
import { HospitalControllerService } from './services/hospital-controller.service';
import { GroupZonesControllerService } from './services/group-zones-controller.service';
import { UserGroupMapControllerService } from './services/user-group-map-controller.service';
import { GroupIncidentCategoryControllerService } from './services/group-incident-category-controller.service';
import { GroupCentersControllerService } from './services/group-centers-controller.service';
import { ManageGroupsService } from './services/manage-groups.service';
import { GroupLocationGeometryControllerService } from './services/group-location-geometry-controller.service';
import { SchedulerControllerService } from './services/scheduler-controller.service';
import { AvayaControllerService } from './services/avaya-controller.service';
import { ExerciseControllerService } from './services/exercise-controller.service';
import { ExerciseTypeControllerService } from './services/exercise-type-controller.service';
import { ExerciseStatusControllerService } from './services/exercise-status-controller.service';
import { ExerciseMemberRoleControllerService } from './services/exercise-member-role-controller.service';
import { ExerciseLessonControllerService } from './services/exercise-lesson-controller.service';
import { ExerciseGoalControllerService } from './services/exercise-goal-controller.service';
import { ExerciseGoalLessonControllerService } from './services/exercise-goal-lesson-controller.service';
import { ExerciseCommitteeControllerService } from './services/exercise-committee-controller.service';
import { ExerciseCommitteeRoleControllerService } from './services/exercise-committee-role-controller.service';
import { EventsConfigControllerService } from './services/events-config-controller.service';
import { EventsConfigSmsControllerService } from './services/events-config-sms-controller.service';
import { EnviromentalImpactControllerService } from './services/enviromental-impact-controller.service';
import { EmergencyLevelControllerService } from './services/emergency-level-controller.service';
import { DmsControllerService } from './services/dms-controller.service';
import { DashboardCardControllerService } from './services/dashboard-card-controller.service';
import { DailySummaryOptTypeControllerService } from './services/daily-summary-opt-type-controller.service';
import { DailySummaryStatusControllerService } from './services/daily-summary-status-controller.service';
import { DailyReportSummaryControllerService } from './services/daily-report-summary-controller.service';
import { CorrespondenceControllerService } from './services/correspondence-controller.service';
import { CorrespondenceToControllerService } from './services/correspondence-to-controller.service';
import { CorrespondenceStatusControllerService } from './services/correspondence-status-controller.service';
import { CityControllerService } from './services/city-controller.service';
import { CircularOrgControllerService } from './services/circular-org-controller.service';
import { CircularCcControllerService } from './services/circular-cc-controller.service';
import { CircularControllerService } from './services/circular-controller.service';
import { CircularStatusControllerService } from './services/circular-status-controller.service';
import { ConfidentialtyControllerService } from './services/confidentialty-controller.service';
import { BcVersionsControllerService } from './services/bc-versions-controller.service';
import { BcrtoControllerService } from './services/bcrto-controller.service';
import { BcRecoveryPrioritiesControllerService } from './services/bc-recovery-priorities-controller.service';
import { BcLocationTypeControllerService } from './services/bc-location-type-controller.service';
import { BcWorkImportanceLevelsControllerService } from './services/bc-work-importance-levels-controller.service';
import { BcImpactTypeControllerService } from './services/bc-impact-type-controller.service';
import { BcImpactLevelControllerService } from './services/bc-impact-level-controller.service';
import { BcActivityFrequenciesControllerService } from './services/bc-activity-frequencies-controller.service';
import { AssetControllerService } from './services/asset-controller.service';
import { AssetsGroupControllerService } from './services/assets-group-controller.service';
import { AssetsCategoryControllerService } from './services/assets-category-controller.service';
import { AdcdaAvailabilityReportControllerService } from './services/adcda-availability-report-controller.service';
import { AdcdaSectorControllerService } from './services/adcda-sector-controller.service';
import { AdcdaDailyReportControllerService } from './services/adcda-daily-report-controller.service';
import { AdcdaClassificationControllerService } from './services/adcda-classification-controller.service';
import { AdcdaAreaControllerService } from './services/adcda-area-controller.service';
import { IncidentSurveyV2ControllerService } from './services/incident-survey-v-2-controller.service';
import { SendSmsControllerService } from './services/send-sms-controller.service';
import { PersonalInquiryControllerService } from './services/personal-inquiry-controller.service';
import { MailControllerService } from './services/mail-controller.service';
import { IncidentSurveyControllerService } from './services/incident-survey-controller.service';
import { IncidentReporterLocationControllerService } from './services/incident-reporter-location-controller.service';
import { UaePassControllerService } from './services/uae-pass-controller.service';
import { IncidentSurveyConfigControllerService } from './services/incident-survey-config-controller.service';
import { UserSessionAuditControllerService } from './services/user-session-audit-controller.service';
import { UsersStatisticsReportControllerService } from './services/users-statistics-report-controller.service';
import { UserLogInAttemptsControllerService } from './services/user-log-in-attempts-controller.service';
import { TaskStatusControllerService } from './services/task-status-controller.service';
import { ServiceCenterAreaServiceControllerService } from './services/service-center-area-service-controller.service';
import { ScadKoiControllerService } from './services/scad-koi-controller.service';
import { ReportsControllerService } from './services/reports-controller.service';
import { PrivilegeControllerService } from './services/privilege-controller.service';
import { OrganizationTypesService } from './services/organization-types.service';
import { OrganizationHierarchicalStructureService } from './services/organization-hierarchical-structure.service';
import { NotificationTransactionControllerService } from './services/notification-transaction-controller.service';
import { NotificationPlaceHolderControllerService } from './services/notification-place-holder-controller.service';
import { InspectionControllerService } from './services/inspection-controller.service';
import { MsMailJobService } from './services/ms-mail-job.service';
import { DohControllerService } from './services/doh-controller.service';
import { DashboardControllerService } from './services/dashboard-controller.service';
import { TradeLicenseControllerService } from './services/trade-license-controller.service';
import { CommonControllerService } from './services/common-controller.service';
import { ResponsibleOrganizationControllerService } from './services/responsible-organization-controller.service';
import { AdcmcCategoryControllerService } from './services/adcmc-category-controller.service';
import { TagControllerService } from './services/tag-controller.service';
import { MigrationControllerService } from './services/migration-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    SlaV2ControllerService,
    KpiV2ControllerService,
    VersionControllerService,
    UserProfileControllerService,
    UserPreferencesControllerService,
    TaskControllerService,
    TaskWorkLogControllerService,
    SystemEventControllerService,
    SuggestionStatusControllerService,
    SuggestionControllerService,
    SlaControllerService,
    SlaDetailsControllerService,
    SituationControllerService,
    ShiftConfigurationControllerService,
    ShiftControllerService,
    RoleControllerService,
    ReportingViaControllerService,
    AuthenticationControllerService,
    ReasonControllerService,
    RanksControllerService,
    PushNotificationBodyControllerService,
    PushNotificationActionControllerService,
    PriorityControllerService,
    ExternalPhonebookControllerService,
    OrgStructureControllerService,
    OrgQuickLinkControllerService,
    OperationalReportControllerService,
    OperationalReportStatusControllerService,
    NotificationControllerService,
    NewsControllerService,
    NewsTypeControllerService,
    MsExchangeOrgConfigControllerService,
    ModuleControllerService,
    ModuleOrgControllerService,
    LocalRiskControllerService,
    LibraryCategoriesService,
    LibraryAccessTypesService,
    LibraryService,
    LeaveCalendarControllerService,
    KpiControllerService,
    InterimIncidentControllerService,
    InquiryControllerService,
    IncidentsWorkLogControllerService,
    IncidentsChallengesReqControllerService,
    IncidentControllerService,
    IncidentStatusControllerService,
    IncidentRiskImpactControllerService,
    IncidentReminderControllerService,
    IncidentReasonControllerService,
    IncidentOrgControllerService,
    GroupCategoryCenterControllerService,
    IncidentHospitalControllerService,
    IncidentGroupControllerService,
    IncidentEnvironmentImpactControllerService,
    IncidentCategoryControllerService,
    IncidentsAssetsControllerService,
    InappNotificationControllerService,
    HospitalControllerService,
    GroupZonesControllerService,
    UserGroupMapControllerService,
    GroupIncidentCategoryControllerService,
    GroupCentersControllerService,
    ManageGroupsService,
    GroupLocationGeometryControllerService,
    SchedulerControllerService,
    AvayaControllerService,
    ExerciseControllerService,
    ExerciseTypeControllerService,
    ExerciseStatusControllerService,
    ExerciseMemberRoleControllerService,
    ExerciseLessonControllerService,
    ExerciseGoalControllerService,
    ExerciseGoalLessonControllerService,
    ExerciseCommitteeControllerService,
    ExerciseCommitteeRoleControllerService,
    EventsConfigControllerService,
    EventsConfigSmsControllerService,
    EnviromentalImpactControllerService,
    EmergencyLevelControllerService,
    DmsControllerService,
    DashboardCardControllerService,
    DailySummaryOptTypeControllerService,
    DailySummaryStatusControllerService,
    DailyReportSummaryControllerService,
    CorrespondenceControllerService,
    CorrespondenceToControllerService,
    CorrespondenceStatusControllerService,
    CityControllerService,
    CircularOrgControllerService,
    CircularCcControllerService,
    CircularControllerService,
    CircularStatusControllerService,
    ConfidentialtyControllerService,
    BcVersionsControllerService,
    BcrtoControllerService,
    BcRecoveryPrioritiesControllerService,
    BcLocationTypeControllerService,
    BcWorkImportanceLevelsControllerService,
    BcImpactTypeControllerService,
    BcImpactLevelControllerService,
    BcActivityFrequenciesControllerService,
    AssetControllerService,
    AssetsGroupControllerService,
    AssetsCategoryControllerService,
    AdcdaAvailabilityReportControllerService,
    AdcdaSectorControllerService,
    AdcdaDailyReportControllerService,
    AdcdaClassificationControllerService,
    AdcdaAreaControllerService,
    IncidentSurveyV2ControllerService,
    SendSmsControllerService,
    PersonalInquiryControllerService,
    MailControllerService,
    IncidentSurveyControllerService,
    IncidentReporterLocationControllerService,
    UaePassControllerService,
    IncidentSurveyConfigControllerService,
    UserSessionAuditControllerService,
    UsersStatisticsReportControllerService,
    UserLogInAttemptsControllerService,
    TaskStatusControllerService,
    ServiceCenterAreaServiceControllerService,
    ScadKoiControllerService,
    ReportsControllerService,
    PrivilegeControllerService,
    OrganizationTypesService,
    OrganizationHierarchicalStructureService,
    NotificationTransactionControllerService,
    NotificationPlaceHolderControllerService,
    InspectionControllerService,
    MsMailJobService,
    DohControllerService,
    DashboardControllerService,
    TradeLicenseControllerService,
    CommonControllerService,
    ResponsibleOrganizationControllerService,
    AdcmcCategoryControllerService,
    TagControllerService,
    MigrationControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
