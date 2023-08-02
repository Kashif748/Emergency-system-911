import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrowseActivityPriorityComponent} from "./browse-activity-priority/browse-activity-priority.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseActivityPriorityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityPrioritySequenceRoutingModule { }
