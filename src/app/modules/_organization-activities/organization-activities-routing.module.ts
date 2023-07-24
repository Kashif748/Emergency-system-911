import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrganizationActivitiesComponent} from "./organization-activities.component";
import {BrowseOrganizationsComponent} from "./browse-organizations/browse-organizations.component";
import {PrivilegeGuard} from "@shared/guards/privilege.guard";

const routes: Routes = [
  {
    path: '',
    component: OrganizationActivitiesComponent,
    children: [
      {
        path: '',
        component: BrowseOrganizationsComponent,
        canLoad: [PrivilegeGuard],
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationActivitiesRoutingModule { }
