import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {CorrService} from 'src/app/_metronic/core/services/correspondence.service';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {TranslationService} from '../../i18n/translation.service';
import { CorrespondanceForm, CorrespondenceReq, ORGANIZATION_TYPE, TO_TYPE } from '../correspondance.model';
import { Directionality } from '@angular/cdk/bidi';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Organization } from '../../organization/models/organization.model';
import { MatCheckboxChange } from '@angular/material/checkbox';



@Component({
  selector: 'app-correspondence-form',
  templateUrl: './correspondence-form.component.html',
  styleUrls: ['./correspondence-form.component.scss'],
})
export class CorrespondenceFormComponent implements OnInit {

  // Variables
  loading: boolean;
  appearance = 'fill';
  files: FileList;
  displayUsersCC: boolean;
  displayOrgsCC: boolean;
  lang = 'en';
  form: FormGroup;
  minDate = new Date();
  correspondanceFormField = CorrespondanceForm;
  orgType = ORGANIZATION_TYPE;
  correspondanceOrgType: string = ORGANIZATION_TYPE.EXTERNAL;
  selectOrgAll: boolean = false;
  selectUserAll: boolean = false;
  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private corrService: CorrService,
    private alertService: AlertsService,
    private translationService: TranslationService,
    public directionality: Directionality,
    private matBottomSheetRef: MatBottomSheetRef<CorrespondenceFormComponent>
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.lang = this.translationService.getSelectedLanguage();
  }

  createForm() {
    this.form = this.fb.group({
      [CorrespondanceForm.SUBJECT]: ['', [Validators.required, Validators.maxLength(500)]],
      [CorrespondanceForm.BODY]: ['', [Validators.required, Validators.maxLength(2000)]],
      [CorrespondanceForm.DUE_DATE]: [''],
      [CorrespondanceForm.USERS]: [[]],
      [CorrespondanceForm.ORGS]: [[], [Validators.required]],
      [CorrespondanceForm.CC_USERS]: [[]],
      [CorrespondanceForm.CC_ORGS]: [[]],
      [CorrespondanceForm.INCIDENT]: [],
      [CorrespondanceForm.IS_ACTIVE]: [true, Validators.required],
      [CorrespondanceForm.SMS_NOTIFICATION]: [false, Validators.required],
      [CorrespondanceForm.CONFIDENTIALTY]: ['', Validators.required],
      [CorrespondanceForm.PRIORITY]: [],
    });
    this.form.updateValueAndValidity();
  }

  onSubmit() {
    console.log(this.form.value);

    const formData: FormData = new FormData();
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    const corr: CorrespondenceReq = this.prepareData();
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
        if (data) {
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
    const confidentiality = this.form.value[CorrespondanceForm.CONFIDENTIALTY];
    this.form.get(CorrespondanceForm.CONFIDENTIALTY).patchValue({updatedAt: null, ...confidentiality}) // set updatedAt to null because it cause problems with backend.
    const dueDate = this.form.get(CorrespondanceForm.DUE_DATE).value;
    this.form.get(CorrespondanceForm.DUE_DATE).patchValue(dueDate ? this.datePipe.transform(dueDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z')+' 00:00:00' : null)

    //this.form.get(CorrespondanceForm.INCIDENT).patchValues)
    const corr: CorrespondenceReq = {
      ...this.form.value,


      incident: this.form.value['incident']?.id
        ? this.form.value['incident']?.id
        : null,
      toList: this.getToListArray(),
    };
    delete corr[CorrespondanceForm.ORGS];
    delete corr[CorrespondanceForm.USERS];
    delete corr[CorrespondanceForm.CC_ORGS];
    delete corr[CorrespondanceForm.CC_USERS];
    return corr;
  }

  getToListArray() {
    const arr = [];
    return arr.concat(
      this.getUsers(),
      this.getCCUsers(),
      this.getOrgs(),
      this.getCCOrgs()
    );
  }

  getUsers() {
    return this.form.value[CorrespondanceForm.USERS].map((user) => {
      return {
        copied: false,
        toId: user.id,
        toType: TO_TYPE.USER,
      };
    });
  }

  getCCUsers() {
    return this.form.value[CorrespondanceForm.CC_USERS].map((user) => {
      return {
        copied: true,
        toId: user.id,
        toType: TO_TYPE.USER,
      };
    });
  }

  getOrgs() {
    return this.form.value[CorrespondanceForm.ORGS].map((org) => {
      return {
        copied: false,
        toId: org.id,
        toType: TO_TYPE.ORGANIZATION,
      };
    });
  }

  getCCOrgs() {
    return this.form.value[CorrespondanceForm.CC_ORGS].map((org) => {
      return {
        copied: true,
        toId: org.id,
        toType: TO_TYPE.ORGANIZATION,
      };
    });
  }

  close(data?) {
    this.matBottomSheetRef.dismiss(data?.result);
  }

  setSelectedIncident($event: any) {
    this.form.get(CorrespondanceForm.INCIDENT).patchValue($event);
  }

  changeOrgType(event: MatSlideToggleChange){
    this.correspondanceOrgType = event.checked ? ORGANIZATION_TYPE.EXTERNAL : ORGANIZATION_TYPE.INTERNAL;
  }

  onChangeOrgSelectAll(event: MatCheckboxChange){
    this.selectOrgAll = event.checked;
  }

  onChangeUserSelectAll(event: MatCheckboxChange){
    this.selectUserAll = event.checked;
  }
}
