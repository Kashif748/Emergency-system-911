import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IncidentsService} from 'src/app/_metronic/core/services/incidents.service';
import {TranslationService} from '../../i18n/translation.service';
import {AlertsService} from '../../../_metronic/core/services/alerts.service';
import {CommonService} from '../../../_metronic/core/services/common.service';
import {ValidateUtil} from '@core/utils/ValidateUtil';
import {MatChipInputEvent} from '@angular/material/chips';
import {ENTER, TAB, SPACE} from '@angular/cdk/keycodes';
import {AppCommonData} from '@core/entities/AppCommonData';
import {AppCommonDataService} from '@core/services/app-common-data.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss'],
})
export class EmailListComponent implements OnInit {
  // Variables.
  commonData: AppCommonData;
  lang = 'en';
  form: FormGroup;
  emailReceivers: string[] = [];
  separatorKeysCodes: number[] = [ENTER, TAB, SPACE];

  constructor(
    private incidentsService: IncidentsService,
    private fb: FormBuilder,
    private alertService: AlertsService,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmailListComponent>,
    private translationService: TranslationService,
    private cd: ChangeDetectorRef,
    private readonly appCommonDataService: AppCommonDataService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.lang = this.translationService.getSelectedLanguage();
    this.commonData = this.appCommonDataService.getCommonData();
  }

  createForm() {
    this.form = this.fb.group({
      emailList: [''],
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  getUserId() {
    return this.commonData.currentUserDetails.id;
  }

  onSubmit() {
    let emailIncidentReceiver = '';
    for (let i = 0; i < this.emailReceivers.length; i++) {
      emailIncidentReceiver += this.emailReceivers[i].trim();
      if (i != this.emailReceivers.length - 1) {
        emailIncidentReceiver += ',';
      }
    }
    if (emailIncidentReceiver.trim() === '') {
      this.alertService.openFailureSnackBarWithMsg(this.translationService.get('VALIDATION_MSG.EMAIL.INVALID'));
      return;
    }
    this.incidentsService.shareViaMail(this.data.incId, emailIncidentReceiver).subscribe(
      (ok) => {
        this.alertService.openSuccessSnackBar();
        this.dialogRef.close();
      },
      (er) => {
        console.error(er);
        this.dialogRef.close();
        this.alertService.openFailureSnackBar();
      }
    );
  }

  removeEmail(i: number) {
    this.emailReceivers.splice(i, 1);
    this.cd.detectChanges();
  }

  addEmail($event: MatChipInputEvent) {
    const input = $event.input;
    const value = $event.value;
    const isEmailsValid = ValidateUtil.isValidMail((value || '').trim());
    if (isEmailsValid) {
      this.emailReceivers.push(value);
      // Reset the input value
      input.value = '';
    } else {
      this.alertService.customFailureSnackBar(this.translationService.get('VALIDATION_MSG.EMAIL.INVALID'));
    }
    this.cd.detectChanges();
  }
}
