import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShareLocationComponent } from './share-location/share-location.component';
import {NewShareLocationComponent} from "./new-share-location/new-share-location.component";

const routes: Routes = [
  {
    path: ':uuid',
    component: NewShareLocationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareLocationRoutingModule {}
