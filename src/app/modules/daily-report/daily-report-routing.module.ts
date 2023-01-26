import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DailyReportComponent } from "./daily-report.component";

import { FormComponent } from "./form/form.component";
import { ListComponent } from "./list/list.component";
import { ReviewComponent } from "./review/review.component";

const routes: Routes = [
  {
    path: "",
    component: DailyReportComponent,
    children: [
      { path: "form", component: FormComponent },
      { path: "list", component: ListComponent},
      { path: 'review', component: ReviewComponent},
      { path: "", redirectTo: "list" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyReportRoutingModule {}
