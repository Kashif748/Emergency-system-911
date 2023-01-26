import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { SharedModule } from 'src/app/shared/shared.module';

import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { EventsManagementRoutingModule } from './events-management-routing.module';

import { EventsManagementComponent } from './events-management/events-management.component';
import { ControllerViewComponent } from './events-management/controller-view/controller-view.component';
import { EmergencyLevelComponent } from './events-management/emergency-level/emergency-level.component';
import { IncidentsCategoriesComponent } from './events-management/incidents-categories/incidents-categories.component';
import { KpiComponent } from './events-management/kpi/kpi.component';
import { NavigationsComponent } from './events-management/navigations/navigations.component';
import { RanksComponent } from './events-management/ranks/ranks.component';
import { SlaComponent } from './events-management/sla/sla.component';
import { ControllerModalComponent } from './events-management/controller-view/controller-modal/controller-modal.component';
import { EmergencyLevelModalComponent } from './events-management/emergency-level/emergency-level-modal/emergency-level-modal.component';
import { IncidentsCategoriesModalComponent } from './events-management/incidents-categories/incidents-categories-modal/incidents-categories-modal.component';
import { KpiModalComponent } from './events-management/kpi/kpi-modal/kpi-modal.component';
import { NavigationModalComponent } from './events-management/navigations/navigation-modal/navigation-modal.component';
import { RanksModalComponent } from './events-management/ranks/ranks-modal/ranks-modal.component';
import { SlaModalComponent } from './events-management/sla/sla-modal/sla-modal.component';
import { KpiV2Component } from './events-management/kpi-v2/kpi-v2.component';
import { KbiV2ModalComponent } from './events-management/kpi-v2/kbi-v2-modal/kbi-v2-modal.component';
import { KpiPrioritiesModalComponent } from './events-management/kpi-v2/kpi-priorities-modal/kpi-priorities-modal.component';
import { LocalRisksComponent } from './events-management/local-risks/local-risks.component';
import { AddEditMobileVersionComponent } from './events-management/mobile-versions/add-edit-mobile-version/add-edit-mobile-version.component';
import { MobileVersionsComponent } from './events-management/mobile-versions/mobile-versions.component';

@NgModule({
  declarations: [
    EventsManagementComponent,
    EmergencyLevelComponent,
    EmergencyLevelModalComponent,
    ControllerViewComponent,
    ControllerModalComponent,
    KpiComponent,
    KpiModalComponent,
    IncidentsCategoriesComponent,
    IncidentsCategoriesModalComponent,
    NavigationsComponent,
    NavigationModalComponent,
    SlaComponent,
    SlaModalComponent,
    RanksComponent,
    RanksModalComponent,
    KpiV2Component,
    KbiV2ModalComponent,
    KpiPrioritiesModalComponent,
    MobileVersionsComponent,
    AddEditMobileVersionComponent,
    LocalRisksComponent,
  ],
  imports: [
    EventsManagementRoutingModule,
    ConfirmDialogModule,
    FormsModule,
    SharedModule,
    PerfectScrollbarModule,
    NgbDropdownModule,
  ],
  providers: [AlertsService],
})
export class EventsManagementModule {}
