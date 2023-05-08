import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseSituationsComponent } from './browse-situations/browse-situations.component';
import { SituationDashboardComponent } from './situation-dashboard/situation-dashboard.component';
import { SituationsMgmtComponent } from './situations-mgmt.component';

const routes: Routes = [
  {
    path: '',
    component: SituationsMgmtComponent,
    children: [
      {
        path: '',
        component: BrowseSituationsComponent,
      },
      {
        path: 'dashboard',
        component: SituationDashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SituationsMgmtRoutingModule {}
