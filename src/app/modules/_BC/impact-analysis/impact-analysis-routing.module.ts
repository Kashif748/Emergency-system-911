import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrowseImpactAnalysisComponent} from "./browse-impact-analysis/browse-impact-analysis.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseImpactAnalysisComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessImpactAnalysisRoutingModule { }
