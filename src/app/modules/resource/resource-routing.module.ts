import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PrivilegeGuard } from "@shared/guards/privilege.guard";
import { AssetsService } from "src/app/_metronic/core/services/sources.service";
import { EditResourceComponent } from "./edit-resource/edit-resource.component";
import { ListResourceComponent } from "./list-resource/list-resource.component";
import { ResourceComponent } from "./resource.component";

const routes: Routes = [
  {
    path: "",
    component: ResourceComponent,
    resolve: { service: AssetsService },
    children: [
      {
        path: "",
        redirectTo: "resources",
        pathMatch: "full",
      },
      {
        path: "resources",
        component: ListResourceComponent,
        canLoad: [PrivilegeGuard],
        data: { permission: 'ACS_RES' },
      },
      {
        path: "resources/add",
        component: EditResourceComponent,
        canLoad: [PrivilegeGuard],
        data: { permission: 'PRV_CR_ASST' },
      },
      {
        path: "resources/edit/:id",
        component: EditResourceComponent,
        canLoad: [PrivilegeGuard],
        data: { permission: 'PRV_ED_ASST' },
      },
      { path: "", redirectTo: "resources", pathMatch: "full" },
      { path: "**", redirectTo: "resources", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceRoutingModule {}
