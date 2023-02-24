import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrivilegeGuard} from "../../shared/guards/privilege.guard";
import {BrowseGroupsComponent} from "./browse-groups/browse-groups.component";
import {TeamMgmtComponent} from "./team-mgmt.component";

const routes: Routes = [
  {
    path: '',
    component: TeamMgmtComponent,
    children: [
      {
        path: 'groups',
        component: BrowseGroupsComponent,
        canLoad: [PrivilegeGuard],
        data: {permission: 'PRIV_VW_GRP'},
      },
     /* {
        path: 'groups/add',
        component: NewGroupComponent,
        canLoad: [PrivilegeGuard],
        data: {permission: 'PRIV_CR_GRP'},
      },*/
     /* {
        path: 'groups/edit/:id',
        component: NewGroupComponent,
        canLoad: [PrivilegeGuard],
        data: {permission: 'PRIV_UP_GRP'},
      },*/
      /*{
        path: 'groups/view/:id',
        component: ViewGroupComponent,
        canLoad: [PrivilegeGuard],
        data: {permission: 'PRIV_VW_GRP'},
      },*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMgmtRoutingModule { }
