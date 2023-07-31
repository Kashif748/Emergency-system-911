import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseLocationsComponent} from "./browse-locations/browse-locations.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseLocationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
