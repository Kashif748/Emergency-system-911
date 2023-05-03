import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContentRtoComponent} from "./browse-rto/content-rto/content-rto.component";

const routes: Routes = [
  {
    path: '',
    component: ContentRtoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RtoRoutingModule { }
