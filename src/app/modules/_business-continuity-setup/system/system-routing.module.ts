import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseSystemComponent} from "./browse-system/browse-system.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseSystemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
