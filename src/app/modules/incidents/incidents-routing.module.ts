import { DohDashboardComponent } from './doh-dashboard/doh-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportIncidentComponent } from './report-incident/report-incident.component';
import { IncidentsComponent } from './incidents.component';
import { IncidentComponent } from './incident/incident.component';
import { PrivatePositionComponent } from './private-position/private-position.component';
import { TasksComponent } from './tasks/tasks.component';
import { ViewIncidentsComponent } from './view-incidents/view-incidents.component';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';
import { PrivilegeGuard } from 'src/app/shared/guards/privilege.guard';
import { ViewInterimIncidentComponent } from './incident/interim-incidents/view-interim-incident/view-interim-incident.component';
import { NewIncidentsViewComponent } from './new-incidents-view/new-incidents-view.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { RedirectGuard } from '@shared/guards/redirect.guard';

const routes: Routes = [
  { path: 'view/:id', component: ViewIncidentsComponent },
  {
    path: '',
    component: IncidentsComponent,
    children: [
      {
        path: '',
        redirectTo: 'incidents',
        pathMatch: 'full',
      },
      // {
      //   path: 'incidents/all/new',
      //   component: NewIncidentsViewComponent,
      //   canActivate: [PrivilegeGuard],
      //   data: { permission: ['PRIV_VW_INC', 'PRIV_VW_GRP_INC'], type: 'or' },
      // },
      {
        path: 'dashboard',
        component: NewIncidentsViewComponent,
        canActivate: [PrivilegeGuard],
        data: {
          permission: [
            'PRIV_VW_INC',
            'PRIV_VW_GRP_INC',
            'PRIV_VW_INQ',
            'PRIV_VW_INT_INC',
          ],
          type: 'or',
        },
      },
      {
        path: 'dashboard/:view',
        component: NewIncidentsViewComponent,
        canActivate: [PrivilegeGuard],
        data: {
          permission: [
            'PRIV_VW_INC',
            'PRIV_VW_GRP_INC',
            'PRIV_VW_INQ',
            'PRIV_VW_INT_INC',
          ],
          type: 'or',
        },
      },
      {
        path: 'incidents/:filter',
        component: IncidentComponent,
        canActivate: [PrivilegeGuard],
        data: { permission: ['PRIV_VW_INC', 'PRIV_VW_GRP_INC'], type: 'or' },
      },
      {
        path: 'incidents/all/:view',
        component: IncidentComponent,
        canActivate: [PrivilegeGuard],
        data: { permission: ['PRIV_VW_INC', 'PRIV_VW_GRP_INC'], type: 'or' },
      },
      {
        path: 'view/:id',
        component: ViewIncidentsComponent,
        canActivate: [PrivilegeGuard],
        data: { permission: ['PRIV_VW_INC', 'PRIV_VW_GRP_INC'], type: 'or' },
      },
      {
        path: 'view-interim/:id',
        component: ViewInterimIncidentComponent,
      },
      {
        path: 'report-interim/:interimId',
        component: ReportIncidentComponent,
        canActivate: [PrivilegeGuard],
        data: { permission: 'PRIV_CR_INC' },
      },
      {
        path: 'edit/:id',
        component: ReportIncidentComponent,
        canActivate: [PrivilegeGuard],
        data: { permission: 'PRV_ED_INC' },
      },
      {
        path: 'report',
        component: ReportIncidentComponent,
        canActivate: [PrivilegeGuard],
        data: { permission: 'PRIV_CR_INC' },
      },
      {
        path: 'inquiry/:id',
        component: InquiryComponent,
        canActivate: [PrivilegeGuard],
        data: { permission: 'PRIV_CR_INQ' },
      },
      {
        path: 'viewTask/:id',
        component: ViewTaskComponent,
        canActivate: [PrivilegeGuard, RedirectGuard],
        data: {
          permission: 'PRIV_VW_TASK',
          redirectTo: '/task-management?_dialog=opened&_id=:id&_mode=viewonly',
        },
      },
      {
        path: '_viewTask/:id',
        component: ViewTaskComponent,
        canActivate: [PrivilegeGuard],
        data: { permission: 'PRIV_VW_TASK' },
      },
      {
        path: 'createTask',
        component: CreateTaskComponent,
        canActivate: [PrivilegeGuard, RedirectGuard],
        data: {
          permission: 'PRIV_CR_TASK',
          redirectTo:
            '/task-management?_dialog=opened&incidentSubject=:title&incidentId=:id',
        },
      },

      {
        path: '_createTask',
        component: CreateTaskComponent,
        canActivate: [PrivilegeGuard],
        data: {
          permission: 'PRIV_CR_TASK',
        },
      },
      {
        path: 'updateTask/:tid',
        component: CreateTaskComponent,
        canActivate: [PrivilegeGuard, RedirectGuard],
        data: {
          permission: 'PRIV_UP_TASK',
          redirectTo: '/task-management?_dialog=opened&_id=:tid',
        },
      },
      {
        path: '_updateTask/:tid',
        component: CreateTaskComponent,
        canActivate: [PrivilegeGuard],
        data: {
          permission: 'PRIV_UP_TASK',
        },
      },
      {
        path: 'tasks/:filter',
        component: TasksComponent,
        canActivate: [PrivilegeGuard, RedirectGuard],
        data: {
          permission: 'PRIV_VW_TASK',
          redirectTo: '/task-management?filter=:filter',
        },
      },

      {
        path: '_tasks/:filter',
        component: TasksComponent,
        canActivate: [PrivilegeGuard, RedirectGuard],
        data: {
          permission: 'PRIV_VW_TASK',
        },
      },
      {
        path: 'private-position',
        component: PrivatePositionComponent,
      },
      {
        path: 'doh-dashboard',
        component: DohDashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentsRoutingModule {}
