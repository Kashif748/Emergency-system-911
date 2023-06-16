import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BusinessContinuitySetupComponent} from "./business-continuity-setup/business-continuity-setup.component";

const routes: Routes = [
  {
    path: '',
    component: BusinessContinuitySetupComponent,
    children: [
      { path: "", redirectTo: "systems" },
      {
        path: 'systems',
        loadChildren: () =>
          import('./system/system.module').then(
            (m) => m.SystemModule
          ),
      },
      {
        path: 'locations',
        loadChildren: () =>
          import('./location/location.module').then(
            (m) => m.LocationModule
          ),
      },
      {
        path: 'venders',
        loadChildren: () =>
          import('./vender/vender.module').then(
            (m) => m.VenderModule
          ),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessContinuitySetupRoutingModule { }
