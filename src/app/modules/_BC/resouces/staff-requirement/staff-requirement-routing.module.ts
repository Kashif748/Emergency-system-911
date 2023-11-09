import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseStaffReqComponent} from "./browse-staff-req/browse-staff-req.component";
import {TaskDialogComponent} from "../../../_task-mgmt/browse-tasks/task-dialog/task-dialog.component";
import {StaffReqDialogComponent} from "./browse-staff-req/staff-req-dialog/staff-req-dialog.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseStaffReqComponent,
  },
  {
    path: 'staff',
    component: StaffReqDialogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRequirementRoutingModule { }
