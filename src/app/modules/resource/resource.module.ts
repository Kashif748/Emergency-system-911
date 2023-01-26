import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from "src/app/shared/shared.module";

import { InlineSVGModule } from "ng-inline-svg";

import { NgApexchartsModule } from "ng-apexcharts";

import { NgxPaginationModule } from "ngx-pagination";

import { TranslationModule } from "../i18n/translation.module";
import { MaterialModule } from "../../shared/material.module";

import { ResourceRoutingModule } from "./resource-routing.module";
import { ResourceComponent } from "./resource.component";

import { EditResourceComponent } from "./edit-resource/edit-resource.component";
import { ListResourceComponent } from "./list-resource/list-resource.component";
import { ReportComponent } from "./report/report.component";
import { ResourceModalComponent } from "./resource-modal/resource-modal.component";
import { MapModule } from "@shared/components/map/map.component";
import { AttachmentsListModule } from "@shared/attachments-list/attachments-list.module";
import { AuthService } from "@core/services/auth.service";

@NgModule({
  declarations: [
    ResourceComponent,
    ListResourceComponent,
    EditResourceComponent,
    ReportComponent,
    ResourceModalComponent,
  ],
  imports: [
    AttachmentsListModule,
    MapModule,
    CommonModule,
    ResourceRoutingModule,
    MaterialModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    SharedModule,
    NgApexchartsModule,
    NgbDropdownModule,
    NgxPaginationModule,
  ],
  providers:[
    AuthService
  ]
})
export class ResourceModule {}
