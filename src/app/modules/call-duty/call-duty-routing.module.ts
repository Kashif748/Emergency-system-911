import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CallDutyService } from "./call-duty.service";
import { CallDutyComponent } from "./call-duty/call-duty.component";

const routes: Routes = [
  {
    path: "",
    component: CallDutyComponent,
    resolve: { CallDutyService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallDutyRoutingModule {}
