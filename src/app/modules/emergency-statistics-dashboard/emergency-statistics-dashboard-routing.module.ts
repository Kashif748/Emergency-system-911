import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatisticsComponent} from "./statistics/statistics.component";
import {EmergencyStatisticsDashboardComponent} from "./emergency-statistics-dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: EmergencyStatisticsDashboardComponent,
    children: [
      {
        path: '',
        component: StatisticsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmergencyStatisticsDashboardRoutingModule { }
