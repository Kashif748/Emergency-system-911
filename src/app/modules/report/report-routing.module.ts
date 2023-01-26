import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormReportComponent } from './form-report/form-report.component';
import { ReportComponent } from './report.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    children: [
      {
				path: '',
				redirectTo: 'reports',
				pathMatch: 'full',
			},
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'reports/add',
        component: FormReportComponent,
      },
      {
				path: 'reports/edit/:id',
				component: FormReportComponent,
			},
      { path: '', redirectTo: 'reports', pathMatch: 'full' },
      { path: '**', redirectTo: 'reports', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
