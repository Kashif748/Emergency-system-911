import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventsLogService } from '@core/services/events-log.service';
import { EventsLogComponent } from "./events-log/events-log.component";

const routes: Routes = [
  {
    path: "",
    component: EventsLogComponent,
    resolve: { service: EventsLogService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsLogRoutingModule {}
