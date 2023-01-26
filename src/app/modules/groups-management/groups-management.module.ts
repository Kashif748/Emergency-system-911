import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';

import { InlineSVGModule } from 'ng-inline-svg';

import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from 'src/app/shared/shared.module';

import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';
import { TranslationModule } from '../i18n/translation.module';
import { MaterialModule } from '../../shared/material.module';

import { GroupsManagementRoutingModule } from './groups-management-routing.module';
import { GroupsManagementComponent } from './groups-management.component';
import { GroupsManagementService } from './groups-management.service';

import { GroupsListComponent } from './groups-list/groups-list.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { GroupIncidentsCategroiesComponent } from './group-incidents-categroies/group-incidents-categroies.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MapModule } from '@shared/components/map/map.component';

@NgModule({
  declarations: [
    GroupsManagementComponent,
    GroupsListComponent,
    NewGroupComponent,
    ViewGroupComponent,
    GroupIncidentsCategroiesComponent,
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    GroupsManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslationModule,
    ConfirmDialogModule,
    NgbDropdownModule,
    InlineSVGModule,
    SharedModule,
    MatButtonModule,
    MatChipsModule,
    MapModule,
  ],
  providers: [GroupsManagementService, AlertsService],
})
export class GroupsManagementModule {}
