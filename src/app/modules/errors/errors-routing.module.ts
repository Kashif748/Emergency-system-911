import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ErrorsComponent } from "./errors.component";

import { Error403Component } from "./403/error-403.component";
import { Error404Component } from "./404/error-404.component";
import { Error1Component } from "./error1/error1.component";
import { Error2Component } from "./error2/error2.component";
import { Error3Component } from "./error3/error3.component";
import { Error4Component } from "./error4/error4.component";
import { Error5Component } from "./error5/error5.component";
import { Error6Component } from "./error6/error6.component";

const routes: Routes = [
  {
    path: "",
    component: ErrorsComponent,
    children: [
      {
        path: "403",
        component: Error403Component,
      },
      {
        path: "404",
        component: Error404Component,
      },
      {
        path: "error-1",
        component: Error1Component,
      },
      {
        path: "error-2",
        component: Error2Component,
      },
      {
        path: "error-3",
        component: Error3Component,
      },
      {
        path: "error-4",
        component: Error4Component,
      },
      {
        path: "error-5",
        component: Error5Component,
      },
      {
        path: "error-6",
        component: Error6Component,
      },
      { path: "", redirectTo: "error-1", pathMatch: "full" },
      {
        path: "**",
        component: Error1Component,
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorsRoutingModule {}
