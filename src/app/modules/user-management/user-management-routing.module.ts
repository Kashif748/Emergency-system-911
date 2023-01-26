import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserManagementComponent } from "./user-management.component";
import { UsersComponent } from "./users/users.component";
import { RolesComponent } from "./roles/roles.component";
import { AddEditUserComponent } from "./users/add-edit/add-edit-user.component";
import { RoleFormComponent } from "./roles/role-form/role-form.component";
import { PrivilegeGuard } from "src/app/shared/guards/privilege.guard";
import { UserService } from "@core/api/services/user.service";

const routes: Routes = [
  {
    path: "",
    component: UserManagementComponent,
    children: [
      {
        path: "users",
        resolve: { service: UserService },
        canActivate: [PrivilegeGuard],
        data: {permission: "PRV_VW_USR"},
        component: UsersComponent,
      },
      {
        path: "users/add",
        canLoad: [PrivilegeGuard],
        data: {permission: "PRV_CR_USR"},
        component: AddEditUserComponent,
      },
      {
        path: "users/edit/:id",
        canLoad: [PrivilegeGuard],
        data: {permission: "PRIV_ED_USR"},
        component: AddEditUserComponent,
      },
      {
        path: "roles",
        canLoad: [PrivilegeGuard],
        data: {permission: "PRV_VW_ROL"},
        component: RolesComponent,
      },
      {
        path: "roles/add",
        canLoad: [PrivilegeGuard],
        data: {permission: "PRV_CR_ROL"},
        component: RoleFormComponent,
      },
      {
        path: "roles/edit/:id",
        canLoad: [PrivilegeGuard],
        data: {permission: "PRV_ED_ROL"},
        component: RoleFormComponent,
      },
      { path: "", redirectTo: "users", pathMatch: "full" },
      { path: "**", redirectTo: "users", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
