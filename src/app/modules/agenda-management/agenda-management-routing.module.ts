import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AgendaManagementService } from "@core/api/services/agenda-management.service";
import { AgendaListComponent } from "./agenda-list/agenda-list.component";
import { AgendaManagementComponent } from "./agenda-management/agenda-management.component";

const routes: Routes = [
  {
    path: "",
    component: AgendaManagementComponent,
    resolve: { service: AgendaManagementService },
    children: [
      {
        path: "",
        component: AgendaListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaManagementRouting {}
