import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrivilegeGuard} from "../../shared/guards/privilege.guard";
import {BrowseGroupsComponent} from "./browse-groups/browse-groups.component";
import {TeamMgmtComponent} from "./team-mgmt.component";
import {GroupDialogComponent} from "./browse-groups/group-dialog/group-dialog.component";

const routes: Routes = [
  {
    path: '',
    component: TeamMgmtComponent,
    children: [
      {
        path: '',
        component: BrowseGroupsComponent,
        canLoad: [PrivilegeGuard],
        data: {permission: 'PRIV_VW_GRP'},
      },
      {
        path: 'teams',
        component: GroupDialogComponent,
        canLoad: [PrivilegeGuard],
        data: {permission: 'PRIV_VW_GRP'},
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMgmtRoutingModule { }
