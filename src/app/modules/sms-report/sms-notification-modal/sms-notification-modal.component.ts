import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SmsReportService } from '../sms-report/sms-report.service';

@Component({
  selector: 'app-sms-notification-modal',
  templateUrl: './sms-notification-modal.component.html',
  styleUrls: ['./sms-notification-modal.component.scss']
})
export class SmsNotificationModalComponent implements OnInit {
  sms = new FormControl('', [Validators.required]);
  row;
  constructor( public dialogRef: MatDialogRef<SmsNotificationModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any, private smsReportService: SmsReportService) {
      this.row = data.row;
     }


  ngOnInit(): void {
  }

  edit() {
    if(this.sms.valid) {
      let formdata = {
        mobno: this.sms.value,
        status: this.row.status
      }
      this.smsReportService.ResendSmsReport(this.row.id, formdata).subscribe((res) => {
        if(res.status) {
          this.dialogRef.close();
        }
      });
    }

  }

}
