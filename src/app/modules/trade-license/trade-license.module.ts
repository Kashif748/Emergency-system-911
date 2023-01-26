import { AlertsService } from "./../../_metronic/core/services/alerts.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TradeLicenseRoutingModule } from "./trade-license-routing.module";
import { TradeLicenseComponent } from "./trade-license.component";

import { MaterialModule } from "../../shared/material.module";
import { TranslationModule } from "../i18n/translation.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [TradeLicenseComponent],
  imports: [
    CommonModule,
    TradeLicenseRoutingModule,
    MaterialModule,
    TranslationModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [AlertsService],
})
export class TradeLicenseModule {}
