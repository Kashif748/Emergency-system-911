import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMgmtComponent } from './user-mgmt.component';
import { PrivilegeGuard } from 'src/app/shared/guards/privilege.guard';
import { BrowseUsersComponent } from './browse-users/browse-users.component';
import { BrowseRolesComponent } from './browse-roles/browse-roles.component';

const routes: Routes = [
  {
    path: '',
    component: UserMgmtComponent,
    children: [
      {
        path: 'users',
        canActivate: [PrivilegeGuard],
        data: { permission: 'PRV_VW_USR' },
        component: BrowseUsersComponent,
      },
      {
        path: 'roles',
        canLoad: [PrivilegeGuard],
        data: { permission: 'PRV_VW_ROL' },
        component: BrowseRolesComponent,
      },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: '**', redirectTo: 'users', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserMgmtRoutingModule {}
