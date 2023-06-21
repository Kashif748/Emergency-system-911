import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseSystemsComponent} from "./browse-systems/browse-systems.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseSystemsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemsRoutingModule { }
