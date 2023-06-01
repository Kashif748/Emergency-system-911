import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrowseActivityFrquencyComponent} from "./browse-activity-frquency/browse-activity-frquency.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseActivityFrquencyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityFrquencyRoutingModule { }
