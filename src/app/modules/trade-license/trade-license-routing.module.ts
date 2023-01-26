import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TradeLicenseComponent } from "./trade-license.component";

const routes: Routes = [
  {
    path: "",
    component: TradeLicenseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradeLicenseRoutingModule {}
