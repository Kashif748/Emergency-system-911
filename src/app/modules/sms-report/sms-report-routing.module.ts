import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AssetsService } from "src/app/_metronic/core/services/sources.service";
import { SmsNotificationsListComponent } from "./sms-notifications-list/sms-notifications-list.component";
import { SmsReportComponent } from "./sms-report/sms-report.component";


const routes: Routes = [
  {
    path: "",
    component: SmsReportComponent,
    resolve: { service: AssetsService },
    children: [
      {
        path: "",
        redirectTo: 'notifications',
        pathMatch: "full",
      },
      {
        path: "notifications",
        component: SmsNotificationsListComponent,
      },
    

      { path: "", redirectTo: "notifications", pathMatch: "full" },
      { path: "**", redirectTo: "notifications", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsReportRoutingModule {}