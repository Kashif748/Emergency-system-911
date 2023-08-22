import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseInfraReqComponent} from "./browse-infra-req/browse-infra-req.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseInfraReqComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfraReqRoutingModule { }
