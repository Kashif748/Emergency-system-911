import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseAppSystemsComponent} from "./browse-app-systems/browse-app-systems.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseAppSystemsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSystemsRoutingModule { }
