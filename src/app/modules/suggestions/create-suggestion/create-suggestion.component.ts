import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFileUploaderComponent} from 'angular-file-uploader';
import {SuggestionService} from '@core/api/services/suggestion.service';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {environment} from 'src/environments/environment';
import {DmsService} from '@core/api/services/dms.service';

import {TranslationService} from '../../i18n/translation.service';

@Component({
  selector: 'app-create-suggestion',
  templateUrl: './create-suggestion.component.html',
  styleUrls: ['./create-suggestion.component.scss'],
})
export class CreateSuggestionComponent implements OnInit {

  // UI
  @ViewChild('fileUploader')
  private fileUploader: AngularFileUploaderComponent;
  formGroup: FormGroup;

  // Variables
  private currentUser: any;
  private suggId = 0;
  lang = 'en';
  afuConfig = {};

  constructor(
    private translationService: TranslationService,
    private alertService: AlertsService,
    private formBuilder: FormBuilder,
    private suggestionService: SuggestionService,
    private router: Router,
    private dmsService: DmsService
  ) {
  }

  ngOnInit() {
    const commonData = JSON.parse(localStorage.getItem('commonData'));
    this.currentUser = commonData['currentUserDetails'];
    this.lang = this.translationService.getSelectedLanguage();
    this.translationService.setLanguage(this.lang);
    // file uploader config
    this.afuConfig = {
      multiple: true,
      formatsAllowed: '.jpg,.png,.pdf,.docx, .txt,.gif,.jpeg',
      maxSize: '2',
      uploadAPI: {
        url: `${environment.apiUrl}/dms/upload`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        params: {recordId: this.suggId, tagId: 20},
        responseType: 'json',
      },
      theme: 'dragNDrop',
      hideProgressBar: true,
      hideResetBtn: true,
      hideSelectBtn: false,
      fileNameIndex: false,
      replaceTexts: {
        selectFileBtn: this.translationService.get('SHARED.SELECT_FILES'),
        resetBtn: this.translationService.get('SHARED.RESET'),
        uploadBtn: this.translationService.get('SHARED.UPLOAD'),
        dragNDropBox: this.translationService.get('SHARED.DRAG_N_DROP'),
        attachPinBtn: this.translationService.get('SHARED.ATTACH_FILES'),
        afterUploadMsg_success: this.translationService.get(
          'SHARED.SUCCESS_UPLOAD'
        ),
        afterUploadMsg_error: this.translationService.get(
          'SHARED.FAILD_UPLOAD'
        ),
        sizeLimit: this.translationService.get('SHARED.SIZE_LIMIT'),
      },
    };

    this.formGroup = this.buildForm();
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  attUploaded(event) {
    this.alertService.openSuccessSnackBar();
  }

  async uploadFiles(id: number) {
    try {
      await this.dmsService
        .uploadFiles(this.fileUploader.allowedFiles, id, 20)
        .toPromise();
    } catch {
      this.alertService.openFailureSnackBar();
    }
  }

  buildForm(): FormGroup {
    const title = this.formBuilder.control(null, [Validators.required]);
    const type = this.formBuilder.control(null, [Validators.required]);
    const desc = this.formBuilder.control(null, [Validators.required]);

    return this.formBuilder.group({
      description: desc,
      stype: type,
      title,
    });
  }

  async submit() {
    try {
      const data = {
        ...this.formGroup.value,
        createdBy: this.currentUser.id,
        createdOn: Date.now(),
        statusId: 0,
      };
      const response = await this.suggestionService.create(data).toPromise<any>();
      this.suggId = response.result.id;
      await this.uploadFiles(this.suggId);
      this.router.navigate(['suggestions/manage']);
    } catch (err) {
      this.alertService.openFailureSnackBar();
    }
  }

}
