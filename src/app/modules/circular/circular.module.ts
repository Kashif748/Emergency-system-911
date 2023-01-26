import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CircularRoutingModule } from "./circular-routing.module";
import { CircularComponent } from "./circular.component";
import { FormCircularsComponent } from "./form-circulars/form-circulars.component";
import { CircularsComponent } from "./circulars/circulars.component";
import { MaterialModule } from "../../shared/material.module";
import { TranslationModule } from "../i18n/translation.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InlineSVGModule } from "ng-inline-svg";
import { ReceiversListComponent } from "./circulars/receivers-list/receivers-list.component";
import { CoreModule } from "src/app/_metronic/core";
import { SharedModule } from "src/app/shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [
    CircularComponent,
    FormCircularsComponent,
    CircularsComponent,
    ReceiversListComponent,
  ],
  imports: [
    CommonModule,
    CircularRoutingModule,
    MaterialModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CoreModule,
    SharedModule,
    NgxPaginationModule,
  ],
})
export class CircularModule {}
