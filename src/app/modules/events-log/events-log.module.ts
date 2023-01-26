import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventsLogComponent } from "./events-log/events-log.component";
import { EventsLogService } from "../../core/services/events-log.service";
import { EventsLogRoutingModule } from "./events-log-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { InlineSVGModule } from "ng-inline-svg";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { TranslationModule } from "../i18n/translation.module";
import { MaterialModule } from "../../shared/material.module";
import { CoreModule } from "src/app/_metronic/core";
import { EventLogItemComponent } from "./events-log/event-log-item/event-log-item.component";
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [EventsLogComponent, EventLogItemComponent],
  imports: [
    CommonModule,
    EventsLogRoutingModule,
    ReactiveFormsModule,
    InlineSVGModule,
    PerfectScrollbarModule,
    TranslationModule,
    MaterialModule,
    CoreModule,
    VirtualScrollerModule,
    SharedModule
  ],
  providers: [EventsLogService],
})
export class EventsLogModule {}
