import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AvailabilityService } from "@core/api/services/availability.service";
import { AvailabilityReportComponent } from "./availability-report/availability-report.component";
import { PdfAvailabiltyReportComponent } from "./pdf-availabilty-report/pdf-availabilty-report.component";
import { ReportFormComponent } from "./report-form/report-form.component";
import { ReportsListComponent } from "./reports-list/reports-list.component";

const routes: Routes = [
  {
    path: "",
    component: AvailabilityReportComponent,
    resolve: { serivce: AvailabilityService },
    children: [
      {
        path: "",
        component: ReportsListComponent,
      },
      {
        path: "form/:id",
        component: ReportFormComponent,
      },
      {
        path: "pdf-preview",
        component: PdfAvailabiltyReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailabilityRoutingModule {}
