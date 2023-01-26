import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";

import { NgxMatIntlTelInputModule } from "ngx-mat-intl-tel-input";

import { TranslationModule } from "../i18n/translation.module";
import { MaterialModule } from "../../shared/material.module";
import { AlertsService } from "./../../_metronic/core/services/alerts.service";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";

import { ProfileComponent } from "./profile/profile.component";

@NgModule({
  declarations: [SettingsComponent, ProfileComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialModule,
    TranslationModule,
    SharedModule,
    NgxMatIntlTelInputModule,
  ],
  providers: [AlertsService],
})
export class SettingsModule {}
