import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrowseBusinessImpactAnalysisComponent} from "./browse-business-impact-analysis/browse-business-impact-analysis.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseBusinessImpactAnalysisComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessImpactAnalysisRoutingModule { }
