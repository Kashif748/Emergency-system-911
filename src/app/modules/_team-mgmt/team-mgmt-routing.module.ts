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
        path: 'teams',
        component: BrowseGroupsComponent,
        canLoad: [PrivilegeGuard],
        data: {permission: 'PRIV_VW_GRP'},
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMgmtRoutingModule { }
