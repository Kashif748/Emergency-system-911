import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrowseRtoComponent} from "./browse-rto/browse-rto.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseRtoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RtoRoutingModule { }
