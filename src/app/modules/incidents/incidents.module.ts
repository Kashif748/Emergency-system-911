import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { DateInterceptor } from '@core/interceptors/date.interceptor';
import { AuthService } from '@core/services/auth.service';
import { AttachmentsListModule } from '@shared/attachments-list/attachments-list.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxPaginationModule } from 'ngx-pagination';
import { InlineSVGModule } from 'ng-inline-svg';
import { ChartsModule } from 'ng2-charts';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { AngularSplitModule } from 'angular-split';
import { MapModule } from 'src/app/shared/components/map/map.component';
import { UppyAngularModule } from 'uppy-angular';
import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';
import { TranslationModule } from '../i18n/translation.module';
import { MaterialModule } from '@shared/material.module';
import { ReportIncidentComponent } from './report-incident/report-incident.component';
import { ViewIncidentsComponent } from './view-incidents/view-incidents.component';
import { AlertsService } from '../../_metronic/core/services/alerts.service';
import { PushNotificationsService } from '../../_metronic/core/services/push.notifications.service';
import { EnableControlDirective } from './directive.directive';
import { IncidentsRoutingModule } from './incidents-routing.module';
import { IncidentsComponent } from './incidents.component';
import { FilterPipe } from './_pipes/filter.pipe';
import { TaskfilterPipe } from './_pipes/taskfilter.pipe';
import { AddWorklogDialogComponent } from './add-worklog-dialog/add-worklog-dialog.component';
import { AssetsInfoComponent } from './assets-info/assets-info.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { CommunityComponent } from './community/community.component';
import { CreateOpReportComponent } from './create-op-report/create-op-report.component';
import { MarkAsteriskDirective } from './directives/mark-asterisk.directive';
import { DistrictsComponent } from './districts/districts.component';
import { DohDashboardComponent } from './doh-dashboard/doh-dashboard.component';
import { EmailListComponent } from './email-list/email-list.component';
import { GeneralPositionComponent } from './general-position/general-position.component';
import { HospitalDataComponent } from './hospital-data/hospital-data.component';
import { IncidentGroupsComponent } from './incident-groups/incident-groups.component';
import { IncidentComponent } from './incident/incident.component';
import { LocalChallengesComponent } from './local-challenges/local-challenges.component';
import { LocationUpdatesComponent } from './location-updates/location-updates.component';
import { LogFileBottomSheetComponent } from './log-file-bottom-sheet/log-file-bottom-sheet.component';
import { PrivatePositionComponent } from './private-position/private-position.component';
import { SpecificOrgFormsComponent } from './specific-org-forms/specific-org-forms.component';
import { TasksComponent } from './tasks/tasks.component';
import { WorkLogComponent } from './worklog/work-log.component';
import { AssetsFormComponent } from './assets-info/assets-form/assets-form.component';
import { ChallengeFormComponent } from './challenges/challenge-form/challenge-form.component';
import { HospitalFormComponent } from './hospitals/hospital-form/hospital-form.component';
import { InterimIncidentsComponent } from './incident/interim-incidents/interim-incidents.component';
import { LocalChallengesFormComponent } from './local-challenges/local-challenges-form/local-challenges-form.component';
import { OptUserDialogComponent } from './operational-reports/opt-user-dialog/opt-user-dialog.component';
import { SelectDialogComponent } from './private-position/select-dialog/select-dialog.component';
import { MainOrgComponent } from './specific-org-forms/adcmc-form/main-org.component';
import { CivilDefenceFormComponent } from './specific-org-forms/civil-defence-form/civil-defence-form.component';
import { SubOrgComponent } from './specific-org-forms/default-form/sub-org.component';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';
import { ResponsibleOrgsComponent } from './view-incidents/responsible-orgs/responsible-orgs.component';
import { StatusDialogComponent } from './incident/interim-incidents/status-dialog/status-dialog.component';
import { ViewInterimIncidentComponent } from './incident/interim-incidents/view-interim-incident/view-interim-incident.component';
import { TaskInfoComponent } from './tasks/view-task/task-info/task-info.component';
import { CustomDatePipe } from '@shared/pipes/custom-date.pipe';
import { CoreModule } from '@core/core.module';
import { LogComponent } from './log/log.component';
import { IncidentLogDialogComponent } from './log/incident-log-dialog/incident-log-dialog.component';
import { ShareMapLocationComponent } from './view-incidents/share-map-location/share-map-location.component';
import { IncidentSurveyComponent } from './view-incidents/incident-survey/incident-survey.component';
import { ClosedIncidentsComponent } from './closed-incidents/closed-incidents.component';
import { IncidentTableComponent } from './incident-table/incident-table.component';
import {
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { IncidentCardComponent } from './incident-card/incident-card.component';
import { InquiryTableComponent } from './inquiry-table/inquiry-table.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { NewIncidentsViewComponent } from './new-incidents-view/new-incidents-view.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ReminderFormComponent } from './view-incidents/incident-reminder/reminder-form/reminder-form.component';
import { IncidentReminderComponent } from './view-incidents/incident-reminder/incident-reminder.component';

@NgModule({
  declarations: [
    IncidentsComponent,
    TasksComponent,
    ViewTaskComponent,
    CreateTaskComponent,
    ViewIncidentsComponent,
    ReportIncidentComponent,
    IncidentComponent,
    AttachmentsComponent,
    WorkLogComponent,
    FilterPipe,
    CreateOpReportComponent,
    EmailListComponent,
    TaskfilterPipe,
    MarkAsteriskDirective,
    HospitalDataComponent,
    PrivatePositionComponent,
    ChallengeFormComponent,
    AddWorklogDialogComponent,
    LogFileBottomSheetComponent,
    LocalChallengesComponent,
    LocalChallengesFormComponent,
    HospitalFormComponent,
    OptUserDialogComponent,
    IncidentGroupsComponent,
    ResponsibleOrgsComponent,
    GeneralPositionComponent,
    SpecificOrgFormsComponent,
    MainOrgComponent,
    SubOrgComponent,
    DohDashboardComponent,
    SelectDialogComponent,
    DistrictsComponent,
    CommunityComponent,
    CivilDefenceFormComponent,
    TaskInfoComponent,
    AssetsInfoComponent,
    AssetsFormComponent,
    LocationUpdatesComponent,
    EnableControlDirective,
    InterimIncidentsComponent,
    StatusDialogComponent,
    ViewInterimIncidentComponent,
    LogComponent,
    IncidentLogDialogComponent,
    ShareMapLocationComponent,
    IncidentSurveyComponent,
    ClosedIncidentsComponent,
    IncidentTableComponent,
    IncidentCardComponent,
    InquiryComponent,
    InquiryTableComponent,
    NewIncidentsViewComponent,
    ReminderFormComponent,
  ],
  imports: [
    CommonModule,
    IncidentsRoutingModule,
    NgxPaginationModule,
    MaterialModule,
    TranslationModule,
    UppyAngularModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgApexchartsModule,
    ChartsModule,
    AngularFileUploaderModule,
    SharedModule,
    MatSelectInfiniteScrollModule,
    ScrollingModule,
    NgxMatIntlTelInputModule,
    VirtualScrollerModule,
    AngularSplitModule,
    MapModule,
    MatGridListModule,
    ConfirmDialogModule,
    AttachmentsListModule,
    NgxMatTimepickerModule,
    NgbDropdownModule,
    NgxMatNativeDateModule,
    NgxMatDatetimePickerModule,
    CoreModule,
    NgbTooltipModule,
    MatDialogModule,
  ],
  providers: [
    AlertsService,
    AuthService,
    PushNotificationsService,
    DatePipe,
    CustomDatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: DateInterceptor, multi: true },
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
  ],
  exports: [FilterPipe],
})
export class IncidentsModule {}
