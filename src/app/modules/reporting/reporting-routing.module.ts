import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ReportingComponent } from "./reporting.component";

import { IncidentReportComponent } from "./incident-report/incident-report.component";
import { IncidentsReportComponent } from "./incidents-report/incidents-report.component";
import { TasksReportComponent } from "./tasks-report/tasks-report.component";

const routes: Routes = [
  {
    path: "",
    component: ReportingComponent,
    children: [
      { path: "incidents", component: IncidentsReportComponent },
      { path: "tasks", component: TasksReportComponent },
      { path: "incident", component: IncidentReportComponent },
      { path: "incident/:id", component: IncidentReportComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportingRoutingModule {}
