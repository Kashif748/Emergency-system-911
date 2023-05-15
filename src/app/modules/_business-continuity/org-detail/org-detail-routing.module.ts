import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrowseOrgDetailComponent} from "./browse-org-detail/browse-org-detail.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseOrgDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgDetailRoutingModule { }
