import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrowseImpactLevelComponent} from "./browse-impact-level/browse-impact-level.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseImpactLevelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpactLevelRoutingModule { }
