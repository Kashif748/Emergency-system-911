import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrivilegeGuard} from "@shared/guards/privilege.guard";
import {BiaAppComponent} from "./bia-app.component";
import {BrowseBiaAppComponent} from "./browse-bia-app/browse-bia-app.component";

const routes: Routes = [
  {
    path: '',
    component: BiaAppComponent,
    children: [
      {
        path: '',
        component: BrowseBiaAppComponent,
        canLoad: [PrivilegeGuard],
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiaAppRoutingModule { }
