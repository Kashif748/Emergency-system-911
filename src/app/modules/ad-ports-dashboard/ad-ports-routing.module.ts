import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdPortsDashboardComponent } from "./ad-ports-dashboard/ad-ports-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: AdPortsDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ADportsRoutingModule {}
