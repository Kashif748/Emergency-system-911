import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrowseLocationTypeComponent} from "./browse-location-type/browse-location-type.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseLocationTypeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationTypeRoutingModule { }
