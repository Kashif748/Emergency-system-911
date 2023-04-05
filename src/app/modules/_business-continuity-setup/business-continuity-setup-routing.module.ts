import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BusinessContinuitySetupComponent} from "./business-continuity-setup/business-continuity-setup.component";
import {SystemsContentComponent} from "./business-continuity-setup/systems-content/systems-content.component";
import {LocationsContentComponent} from "./business-continuity-setup/locations-content/locations-content.component";
import {VendersPartnersContentComponent} from "./business-continuity-setup/venders-partners-content/venders-partners-content.component";

const routes: Routes = [
  {
    path: '',
    component: BusinessContinuitySetupComponent,
    children: [
      { path: "", redirectTo: "systems" },
      {
        path: 'systems',
        component: SystemsContentComponent,
      },
      {
        path: 'locations',
        component: LocationsContentComponent,
      },
      {
        path: 'venders',
        component: VendersPartnersContentComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessContinuitySetupRoutingModule { }
