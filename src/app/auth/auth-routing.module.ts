import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from '@shared/guards/auth.guard';
import { UnauthGuard } from '@shared/guards/unauth.guard';
import { AuthComponent } from "./auth.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { SetNewPasswordComponent } from "./set-new-password/set-new-password.component";

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent, canActivate: [UnauthGuard] },
      {
        path: "forgot-password",
        component: ForgotPasswordComponent,
        canActivate: [UnauthGuard],
      },
      {
        path: "reset-password",
        component: ResetPasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "set-new-password/:forget-token",
        component: SetNewPasswordComponent,
        canActivate: [UnauthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
