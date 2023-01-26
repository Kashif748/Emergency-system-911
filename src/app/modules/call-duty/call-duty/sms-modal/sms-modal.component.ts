import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { animations } from '@shared/animations/animation';
import { tap } from 'rxjs/operators';
import { CallDutyService } from '../../call-duty.service';

@Component({
  selector: 'app-sms-modal',
  templateUrl: './sms-modal.component.html',
  styleUrls: ['./sms-modal.component.scss'],
  animations: animations,
})
export class SmsModalComponent implements OnInit {
  sms = new FormControl('', [Validators.required]);
  messageForm: FormGroup;
  lang = '';
  showHint = true;
  constructor(
    private formBuilder: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<SmsModalComponent>,
    private _service: CallDutyService,
    private _translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.lang = this._translateService.currentLang;
  }

  bodyMaxLength = 160;
  createFormGroup() {
    this.messageForm = this.formBuilder.group({
      isSms: [true, [Validators.required]],
      subject: '',
      content: [
        '',
        [Validators.required, Validators.maxLength(this.bodyMaxLength)],
      ],
    });

    this.messageForm
      .get('isSms')
      .valueChanges.pipe(
        tap((data) => {
          if (data) {
            this.showHint = true;
            this.messageForm.get('subject').setValidators([]);
            this.messageForm
              .get('content')
              .setValidators([
                Validators.required,
                Validators.maxLength(this.bodyMaxLength),
              ]);
          } else {
            this.showHint = false;

            this.messageForm
              .get('subject')
              .setValidators([Validators.required]);
            this.messageForm.get('content').setValidators(Validators.required);
          }
          this.messageForm.get('subject').updateValueAndValidity();
        })
      )
      .subscribe();
  }

  sendSMS() {
    this.dialogRef.close(this.messageForm.value);
  }
}
