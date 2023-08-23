import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseStaffReqComponent} from "./browse-staff-req/browse-staff-req.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseStaffReqComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRequirementRoutingModule { }
