import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InquiriesReportComponent } from './inquiries-report/inquiries-report.component';

import { InquiriesComponent } from './inquiries.component';

const routes: Routes = [
  {
    path: '',
    component: InquiriesComponent,
    children: [{ path: 'report', component: InquiriesReportComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InquiriesRoutingModule {}
