import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BusinessImpactAnalysisComponent} from "./business-impact-analysis/business-impact-analysis.component";

const routes: Routes = [
  {
    path: '',
    component: BusinessImpactAnalysisComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessImpactAnalysisRoutingModule { }
