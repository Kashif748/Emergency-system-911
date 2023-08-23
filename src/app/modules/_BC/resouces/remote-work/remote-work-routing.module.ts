import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseRemoteWorkComponent} from "./browse-remote-work/browse-remote-work.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseRemoteWorkComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoteWorkRoutingModule { }
