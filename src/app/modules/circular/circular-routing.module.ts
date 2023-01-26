import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PrivilegeGuard } from "src/app/shared/guards/privilege.guard";
import { CircularsService } from "src/app/_metronic/core/services/circulars.service";
import { CircularComponent } from "./circular.component";
import { CircularsComponent } from "./circulars/circulars.component";
import { FormCircularsComponent } from "./form-circulars/form-circulars.component";

const routes: Routes = [
  {
    path: "",
    component: CircularComponent,
    resolve: { service: CircularsService },
    children: [
      {
        path: "",
        redirectTo: "circulars",
        pathMatch: "full",
      },
      {
        path: "circulars",
        component: CircularsComponent,
      },
      {
        path: "circulars/add",
        canActivate: [PrivilegeGuard],
        data: {permission: "PRIV_CR_CIRC"},
        component: FormCircularsComponent,
      },
      {
        path: "circulars/edit/:id",
        canActivate: [PrivilegeGuard],
        data: {permission: "PRIV_APRV_CIRC"},
        component: FormCircularsComponent,
      },
      { path: "", redirectTo: "circulars", pathMatch: "full" },
      { path: "**", redirectTo: "circulars", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CircularRoutingModule {}
