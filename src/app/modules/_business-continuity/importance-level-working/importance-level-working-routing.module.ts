import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrowseImpLevelWorkingComponent} from "./browse-imp-level-working/browse-imp-level-working.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseImpLevelWorkingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportanceLevelWorkingRoutingModule { }
