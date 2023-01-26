import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PrivilegeGuard } from "src/app/shared/guards/privilege.guard";

import { OrganizationsService } from "./organizations.service";

import { OrgTreeComponent } from "./org-tree/org-tree.component";
import { OrganizationFormComponent } from "./organization-form/organization-form.component";
import { OrganizationsComponent } from "./organizations/organizations.component";

const routes: Routes = [
  {
    path: "",
    component: OrganizationsComponent,
    resolve: { OrganizationsService },
    children: [
      {
        path: "",
        component: OrgTreeComponent,
        // component: OrganizationsListComponent
      },
      {
        path: "add",
        canActivate: [PrivilegeGuard],
        data: { permission: "PRV_CR_ORG" },
        component: OrganizationFormComponent,
      },
      {
        path: "edit/:id",
        canActivate: [PrivilegeGuard],
        data: { permission: "PRV_ED_ORG" },
        component: OrganizationFormComponent,
      },
      {
        path: "**",
        pathMatch: "full",
        redirectTo: "",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
