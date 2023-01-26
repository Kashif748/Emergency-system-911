import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslationModule } from "../modules/i18n/translation.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { AuthComponent } from "./auth.component";
import { SharedModule } from '@shared/shared.module';
import { LangSelectModule } from '@shared/components/lang-select/lang-select.component';
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { SetNewPasswordComponent } from "./set-new-password/set-new-password.component";
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SetNewPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    TranslationModule,
    SharedModule,
    LangSelectModule,
  ],
  exports: [LoginComponent],
})
export class AuthModule {}
