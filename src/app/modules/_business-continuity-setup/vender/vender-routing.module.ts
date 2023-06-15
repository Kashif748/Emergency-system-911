import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseVenderComponent} from "./browse-vender/browse-vender.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseVenderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VenderRoutingModule { }
