import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseDependenciesComponent} from "./browse-dependencies/browse-dependencies.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseDependenciesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DependenciesRoutingModule { }
