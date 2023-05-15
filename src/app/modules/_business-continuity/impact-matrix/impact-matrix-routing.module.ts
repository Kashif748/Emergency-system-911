import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrowseRtoComponent} from "../rto/browse-rto/browse-rto.component";
import {BrowseImpactMatrixComponent} from "./browse-impact-matrix/browse-impact-matrix.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseImpactMatrixComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpactMatrixRoutingModule { }
