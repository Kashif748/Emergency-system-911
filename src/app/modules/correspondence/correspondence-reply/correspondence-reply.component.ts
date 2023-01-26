import {DatePipe} from '@angular/common';
import {ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {CorrService} from 'src/app/_metronic/core/services/correspondence.service';
import {Correspondence} from '../models/correspondence.model';
import {TranslationService} from '../../i18n/translation.service';
import {CommonService} from '@core/services/common.service';
import {CustomDatePipe} from '@shared/pipes/custom-date.pipe';

@Component({
  selector: 'app-correspondence-reply',
  templateUrl: './correspondence-reply.component.html',
  styleUrls: ['./correspondence-reply.component.scss'],
})
export class CorrespondenceReplyComponent implements OnInit {
  // UI.
  @ViewChild('bodyInput') bodyInput: ElementRef;

  // Variables.
  data: any;
  loading: boolean;
  appearance = 'fill';
  files: FileList;
  dueDate: any = '';
  lang = 'en';
  form: FormGroup;
  minDate = new Date();
  history = '';

  constructor(
    private fb: FormBuilder,
    private commonData: CommonService,
    private datePipe: DatePipe,
    private cd: ChangeDetectorRef,
    private corrService: CorrService,
    private alertService: AlertsService,
    private translationService: TranslationService,
    private bottomSheetRef: MatBottomSheetRef<CorrespondenceReplyComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public parentCorr: Correspondence,
    private readonly customDatePipe: CustomDatePipe
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.loading = true;
    this.corrService.getReplyInfo(this.parentCorr.id).subscribe((data) => {
      this.loading = false;
      this.data = data.result;
      this.patchValues();
      this.bodyInput.nativeElement.focus();
      this.bodyInput.nativeElement.setSelectionRange(0, 0);
      this.dueDate = this.datePipe.transform(
        this.customDatePipe.transform(
          new Date()),
        'yyyy-MM-ddThh:mm:ss.SSS'
      );
    });

    this.lang = this.translationService.getSelectedLanguage();
  }

  createForm() {
    this.form = this.fb.group({
      subject: {value: null, disabled: true},
      body: ['', [Validators.required, Validators.maxLength(2000)]],
      dueDate: [''],
      incident: [],
      isActive: [true, Validators.required],
      confidentialty: {value: null, disabled: true},
    });
  }

  patchValues() {
    this.history = this.parentCorr.body;
  }

  onSubmit() {
    this.loading = true;
    const formData: FormData = new FormData();
    if (this.form.invalid) {
      return;
    }

    const corr = this.prepareData();
    formData.append('correspondence', JSON.stringify(corr));
   /* if (this.files) {
      for (let index = 0; index < this.files.length; index++) {
        const element = this.files[index];
        formData.append(`att_${index}`, element, element.name);
      }
    }*/

    this.corrService.create(formData).subscribe(
      (data) => {
        this.loading = false;
        {
          if (this.files) {
            for (let index = 0; index < this.files.length; index++) {
              const uploadFormData: FormData = new FormData();
              const element = this.files[index];
              uploadFormData.append(`relativePath`, null);
              uploadFormData.append(`name`, this.files[index].name);
              uploadFormData.append(`type`, this.files[index].type);
              uploadFormData.append(`file`, element, element.name);
              this.corrService.uploadFile(uploadFormData, data.result.id, 25).subscribe(
                (data) => {}, () => {
                });
            }
          }
          this.alertService.openSuccessSnackBar();
          this.close(data);
        }
      },
      (error) => {
        this.alertService.openFailureSnackBar();
        this.loading = false;
        this.cd.markForCheck();
      }
    );
  }

  onFilesSelected(files: any) {
    for (let index = 0; index <= files.length; index++) {
      if (files[index] === 'invalid') {
        files.splice(index, 1);
        const msg = this.lang === 'en' ? 'File Size should not exceed 20 MB' : 'حجم الملف يجب ان لا يتعدى ٢٠ ميجابايت';
        this.alertService.openFailureSnackBarWithMsg(msg, 2000);
      } else {
        this.files = files;
      }
    }
  }

  prepareData() {
    const org = {
      copied: false,
      toId: this.data.toOrg,
      toType: 'ORGANIZATION',
    };

    const toList: any[] = [];
    toList.push(org);

    return {
      confidentialty: this.parentCorr.confidentialty,
      subject: this.parentCorr.subject.includes('Re')
        ? this.parentCorr.subject
        : 'Re:' + this.parentCorr.subject,
      smsNotification: this.parentCorr.smsNotification,
      dueDate: this.parentCorr['dueDate'] ?
        this.datePipe.transform(this.parentCorr['dueDate'], 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z') +
        ' 00:00:00' : this.datePipe.transform(this.parentCorr['dueDate'], 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z'),
      body: this.setReplyInfo(),
      parent: {id: this.data.parentId},
      priority: this.parentCorr.priority,
      toList,
      user: {id: this.parentCorr.user?.id},
    };
  }

  close(data?) {
    this.bottomSheetRef.dismiss(data);
  }

  setReplyInfo() {
    const user = this.commonData.getCommonData().currentUserDetails;

    let body = `\n------------------------------------------------------------------------------\n`;
    // from

    body += `From : ${
      this.lang == 'ar' ? user.firstNameAr : user.firstNameEn
    } < ${user.email} >   \n`;
    // to
    body += `To : ${this.parentCorr.toList[0].toNameEn}\n`;

    // sent
    body += `Sent: ${new Date().toISOString().slice(0, 10)}\n`;
    // subject
    body += `Subject:${this.parentCorr.subject}\n`;

    body += this.form.value['body'] + '\n\n';
    this.history = body + this.history;
    return this.history;
  }
}
