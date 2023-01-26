import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserStatisticsReportComponent } from './user-statistics-report/user-statistics-report.component';

const routes: Routes = [
  {
    path: '',
    component: UserStatisticsReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserStatisticsReportRoutingModule {}
