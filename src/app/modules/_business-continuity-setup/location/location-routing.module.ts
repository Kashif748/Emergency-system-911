import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseLocationComponent} from "./browse-location/browse-location.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseLocationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
