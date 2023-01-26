import { AlertsService } from "./../../_metronic/core/services/alerts.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PersonalInquiryRoutingModule } from "./personal-inquiry-routing.module";
import { PersonalInquiryComponent } from "./personal-inquiry.component";

import { MaterialModule } from "../../shared/material.module";
import { TranslationModule } from "../i18n/translation.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [PersonalInquiryComponent],
  imports: [
    CommonModule,
    PersonalInquiryRoutingModule,
    MaterialModule,
    TranslationModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [AlertsService],
})
export class PersonalInquiryModule {}
