import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventsManagementService } from './events-management.service';
import { EventsManagementComponent } from './events-management/events-management.component';

const routes: Routes = [
  {
    path: "",
    component: EventsManagementComponent,
    resolve: {EventsManagementService},
   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsManagementRoutingModule {}
