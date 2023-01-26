import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CallDutyComponent } from "./call-duty/call-duty.component";
import { CallDutyRoutingModule } from "./call-duty-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialModule } from "../../shared/material.module";
import { CallDutyService } from "./call-duty.service";
import { ConfirmDialogModule } from "../confirm-dialog/confirm-dialog.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AlertsService } from "src/app/_metronic/core/services/alerts.service";
import { SmsModalComponent } from "./call-duty/sms-modal/sms-modal.component";
import { InlineSVGModule } from "ng-inline-svg";
import { CoreModule } from "src/app/_metronic/core";
import { TranslationModule } from "../i18n/translation.module";
import { SharedModule } from "src/app/shared/shared.module";
import { GroupUsersComponent } from './call-duty/group-users/group-users.component';

@NgModule({
  declarations: [CallDutyComponent, SmsModalComponent, GroupUsersComponent],
  imports: [
    CommonModule,
    CallDutyRoutingModule,
    TranslateModule,
    MaterialModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CoreModule,
    TranslationModule,
    SharedModule,
  ],
  providers: [CallDutyService, AlertsService],
})
export class CallDutyModule {}
