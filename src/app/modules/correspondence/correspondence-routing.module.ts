import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CorrespondenceComponent } from "./correspondence.component";
import { CorrespondencesComponent } from "./correspondences/correspondences.component";

const routes: Routes = [
  {
    path: "",
    component: CorrespondenceComponent,
    children: [
      {
        path: "",
        redirectTo: "correspondences",
        pathMatch: "full",
      },
      {
        path: "correspondences",
        component: CorrespondencesComponent,
      },
      { path: "", redirectTo: "correspondences", pathMatch: "full" },
      { path: "**", redirectTo: "correspondences", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorrespondenceRoutingModule {}
