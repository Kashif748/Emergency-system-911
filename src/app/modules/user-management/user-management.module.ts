import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';

import { InlineSVGModule } from 'ng-inline-svg';

import { SharedModule } from 'src/app/shared/shared.module';

import { TranslationModule } from '../i18n/translation.module';
import { MaterialModule } from '../../shared/material.module';
import { AlertsService } from './../../_metronic/core/services/alerts.service';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';

import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { RoleFormComponent } from './roles/role-form/role-form.component';
import { AddEditUserComponent } from './users/add-edit/add-edit-user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ExcelDialogComponent } from './users/excel-dialog/excel-dialog.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';

@NgModule({
  declarations: [
    UsersComponent,
    AddEditUserComponent,
    RolesComponent,
    UserManagementComponent,
    RoleFormComponent,
    ExcelDialogComponent,
  ],
  imports: [
    NgxMatIntlTelInputModule,
    CommonModule,
    InlineSVGModule,
    NgxPaginationModule,
    UserManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslationModule,
    SharedModule,
    MatTooltipModule,
    NgbDropdownModule,
    MatStepperModule,
    MatProgressSpinnerModule,
  ],
  providers: [AlertsService, { provide: ILangFacade, useClass: LangFacade }],
})
export class UserManagementModule {}
