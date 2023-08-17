import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseOthersComponent} from "./browse-others/browse-others.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseOthersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OthersRoutingModule { }
