import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsReportComponent } from './sms-report/sms-report.component';
import { SmsNotificationsListComponent } from './sms-notifications-list/sms-notifications-list.component';
import { SmsReportRoutingModule } from './sms-report-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { TranslationModule } from '../i18n/translation.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';
import { MatDialogRef } from '@angular/material/dialog';
import { SmsNotificationModalComponent } from './sms-notification-modal/sms-notification-modal.component';



@NgModule({
   declarations: [SmsReportComponent, SmsNotificationsListComponent, SmsNotificationModalComponent],
  imports: [
    CommonModule,
    SmsReportRoutingModule,
    MaterialModule,
    TranslationModule,
    NgxPaginationModule,
    SharedModule,
    ConfirmDialogModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
})
export class SmsReportModule { }
