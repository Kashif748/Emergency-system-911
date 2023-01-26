import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginAttemptsRoutingModule } from './login-attempts-routing.module';
import { LoginAttemptsComponent } from './login-attempts/login-attempts.component';
import { LoginAttemptsListComponent } from './login-attempts-list/login-attempts-list.component';
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../_metronic/core";


@NgModule({
  declarations: [LoginAttemptsComponent, LoginAttemptsListComponent],
  imports: [
    CommonModule,
    SharedModule,
    LoginAttemptsRoutingModule,
    CoreModule,
  ]
})
export class LoginAttemptsModule { }
