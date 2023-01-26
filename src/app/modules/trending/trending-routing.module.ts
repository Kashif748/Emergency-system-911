import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TrendingDashboardComponent } from "./trending-dashboard/trending-dashboard.component";

import { TrendingComponent } from "./trending.component";

const routes: Routes = [
  {
    path: "",
    component: TrendingComponent,
    children: [{ path: "dashboard", component: TrendingDashboardComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrendingRoutingModule {}
