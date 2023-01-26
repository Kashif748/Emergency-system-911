import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PrivilegeGuard} from 'src/app/shared/guards/privilege.guard';
import {GroupsListComponent} from './groups-list/groups-list.component';
import {GroupsManagementComponent} from './groups-management.component';
import {GroupsManagementService} from './groups-management.service';
import {NewGroupComponent} from './new-group/new-group.component';
import {ViewGroupComponent} from './view-group/view-group.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsManagementComponent,
    children: [
      {
        path: 'groups',
        component: GroupsListComponent,
        canLoad: [PrivilegeGuard],
        data: {permission: 'PRIV_VW_GRP'},
      },
      {
        path: 'groups/add',
        component: NewGroupComponent,
        canLoad: [PrivilegeGuard],
        data: {permission: 'PRIV_CR_GRP'},
      },
      {
        path: 'groups/edit/:id',
        component: NewGroupComponent,
        canLoad: [PrivilegeGuard],
        data: {permission: 'PRIV_UP_GRP'},
      },
      {
        path: 'groups/view/:id',
        component: ViewGroupComponent,
        canLoad: [PrivilegeGuard],
        data: {permission: 'PRIV_VW_GRP'},
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsManagementRoutingModule {
}
