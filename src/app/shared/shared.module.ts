import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { PropTranslatorPipe } from 'src/app/shared/pipes/prop-translator.pipe';
import { InlineSVGModule } from 'ng-inline-svg';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';
import { CoreModule } from '../_metronic/core';
import { TranslationModule } from '../modules/i18n/translation.module';
import { MaterialModule } from './material.module';
import { AvatarStackComponent } from './avatar-stack/avatar-stack.component';
import { FormErrorsDirective } from './directives/form-errors.directive';
import { PrivilegesDirective } from './directives/privileges.directive';
import { ThrottleClickDirective } from './directives/throttle-click.directive';
import { PickUsersComponent } from './pick-users/pick-users.component';
import { SecurePipe } from './pipes/secure.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { TextCutPipe } from './pipes/text-cut.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { OrgInputComponent } from './components/org-input/org-input.component';
import { ToOrgsComponent } from './components/to-orgs/to-orgs.component';
import { ToUsersComponent } from './components/to-users/to-users.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { UnderMaintenanceComponent } from './components/under-maintenance/under-maintenance.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OrgRolesComponent } from './components/org-roles/org-roles.component';
import { NodataTableModule } from './components/nodata-table/nodata-table.module';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { DialogImageComponent } from '@shared/components/dialog-image/dialog-image.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocalePipe } from '@shared/pipes/locale.pipe';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ExtractDataListPipe } from './pipes/extract-data-list.pipe';
import { ExtractValuePipe } from './pipes/extract-value.pipe';
import { ShowFormControlPipe } from './pipes/show-form-control.pipe';
import { PickOrgComponent } from './components/pick-org/pick-org.component';
import { MatTreeModule } from '@angular/material/tree';
import { PriorityBadgeComponent } from './components/priority-badge/priority-badge.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ClosureIncidentPopupComponent } from './components/closure-incident-popup/closure-incident-popup.component';
import { IncidentLogAttachmentPopupComponent } from './components/incident-log-attachment-popup/incident-log-attachment-popup.component';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEmojisModule } from 'angular-emojis';
import { NotificationsTableComponent } from './components/notifications-table/notifications-table.component';
import { NotificationsDialogComponent } from './components/notifications-table/notifications-dialog/notifications-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.dots,
};

@NgModule({
  declarations: [
    FormErrorsDirective,
    PropTranslatorPipe,
    SecurePipe,
    CustomDatePipe,
    ConfirmDialogComponent,
    ThrottleClickDirective,
    PickUsersComponent,
    AvatarStackComponent,
    TextCutPipe,
    ToOrgsComponent,
    ToUsersComponent,
    UserInputComponent,
    OrgInputComponent,
    PrivilegesDirective,
    BreadcrumbsComponent,
    UnderMaintenanceComponent,
    OrgRolesComponent,
    NumberInputComponent,
    DialogImageComponent,
    LocalePipe,
    AdvancedSearchComponent,
    ExtractDataListPipe,
    ExtractValuePipe,
    PickOrgComponent,
    ShowFormControlPipe,
    PriorityBadgeComponent,
    OrderByPipe,
    ClosureIncidentPopupComponent,
    IncidentLogAttachmentPopupComponent,
    NotificationsTableComponent,
    NotificationsDialogComponent
  ],
  imports: [
    CommonModule,
    TranslationModule,
    InlineSVGModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSelectModule,
    MatProgressBarModule,
    MatListModule,
    MatTooltipModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatAutocompleteModule,
    PerfectScrollbarModule,
    NodataTableModule,
    MatDatepickerModule,
    MatTreeModule,
    MatButtonModule,
    SelectDropDownModule,
    NgWizardModule.forRoot(ngWizardConfig),
    AngularEmojisModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatTableModule
  ],
  exports: [
    CommonModule,
    TranslationModule,
    ReactiveFormsModule,
    MaterialModule,
    FormErrorsDirective,
    PropTranslatorPipe,
    SecurePipe,
    CustomDatePipe,
    InlineSVGModule,
    ThrottleClickDirective,
    PickUsersComponent,
    AvatarStackComponent,
    TextCutPipe,
    ToOrgsComponent,
    ToUsersComponent,
    OrgInputComponent,
    PrivilegesDirective,
    NodataTableModule,
    UserInputComponent,
    PerfectScrollbarModule,
    BreadcrumbsComponent,
    UnderMaintenanceComponent,
    OrgRolesComponent,
    NumberInputComponent,
    LocalePipe,
    AdvancedSearchComponent,
    ExtractDataListPipe,
    ExtractValuePipe,
    PickOrgComponent,
    PriorityBadgeComponent,
    SelectDropDownModule,
    OrderByPipe,
    ClosureIncidentPopupComponent,
    IncidentLogAttachmentPopupComponent,
    NgWizardModule,
    AngularEmojisModule,
    NotificationsTableComponent,
    NotificationsDialogComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    DatePipe,
    CustomDatePipe,
  ],
})
export class SharedModule {}
