import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseEmployeesComponent} from "./browse-employees/browse-employees.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseEmployeesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
