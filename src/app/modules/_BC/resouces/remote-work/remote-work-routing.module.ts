import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseRemoteWorkComponent} from "./browse-remote-work/browse-remote-work.component";
import {RemoteWorkDialogComponent} from "./browse-remote-work/remote-work-dialog/remote-work-dialog.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseRemoteWorkComponent,
  },
  {
    path: 'remote',
    component: RemoteWorkDialogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoteWorkRoutingModule { }
