import {HttpResponse} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {CorrService} from 'src/app/_metronic/core/services/correspondence.service';
import {TranslationService} from '../../i18n/translation.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss'],
})
export class ViewDetailsComponent implements OnInit {

  // Variables
  confidentialties = [];
  correspondenceStatus = [];
  attachments = [];
  corr: any;
  lang: string;

  constructor(
    private router: Router,
    public alertService: AlertsService,
    public dialogRef: MatDialogRef<any>,
    private corrService: CorrService,
    private translationService: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    const commonData = JSON.parse(localStorage.getItem('commonData'));
    this.confidentialties = commonData.confidentialties;
    this.correspondenceStatus = commonData.correspondenceStatus;

    if (this.data.type == 'Incoming') {
      const status = commonData.correspondenceStatus.filter(
        (item) => item.nameEn == 'Viewed'
      );
      this.updateStatus(this.data.corr.id, status[0]);
    }
  }

  getConfidentiality(id, lang?) {
    const conf = this.confidentialties.filter((item) => item.id == id);
    return conf.length > 0
      ? this.lang == 'en'
        ? conf[0].nameEn
        : conf[0].nameAr
      : 'No value';
  }

  getCorrespondenceStatus(id, lang?) {
    const conf = this.correspondenceStatus.filter((item) => item.id == id);
    return conf.length > 0
      ? this.lang == 'en'
        ? conf[0].nameEn
        : conf[0].nameAr
      : 'No value';
  }

  updateStatus(id, status) {
    this.corrService.updateStatus(id, status).subscribe(
      (data) => {
        const result = data.result;
        if (result && result.length > 0) {
          for (const element of result) {
            for (let i = 0; i < this.data.corr.toList.length; i++) {
              if (element.id == this.data.corr.toList[i].id) {
                this.data.corr.toList[i] = element;
              }
            }
          }
          this.alertService.openSuccessSnackBarWithMsg(
            this.translationService.translateAWord('CORRERSPONDENCE.STATUS_UPDATED_SUCCESSFULLY')
          );
        }
      },
      (error) => {
        this.alertService.openFailureSnackBarWithMsg(
          this.translationService.translateAWord('CORRERSPONDENCE.CANT_UPDATE_THE_STATUS')
        );
      }
    );
  }

  loadAttachments(corrId) {
    this.corrService.loadAttachmants(corrId).subscribe(
      (data) => {
        if (data) {
          this.attachments = data.result;
          if (this.attachments.length == 0) {
            this.alertService.openSuccessSnackBarWithMsg(
              this.translationService.translateAWord('CORRERSPONDENCE.THERE_IS_NO_ATTACHMENTS')
            );
          }
        }
      },
      (error) => {
        this.alertService.openFailureSnackBarWithMsg('CORRERSPONDENCE.CANT_LOAD_ATTACHMENTS');
      }
    );
  }

  downloadFile(uid, fileName) {
    this.corrService
      .downloadFile(uid)
      .subscribe((response: HttpResponse<Blob>) => {
        const binaryData = [];
        binaryData.push(response.body);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, {type: 'blob'})
        );
        downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        this.alertService.openSuccessSnackBarWithMsg(
          'Preparing to download...'
        );
      });
  }

  reply(id) {
    this.router.navigate([
      'correspondences-management/correspondences/reply/' + id,
    ]);
    this.dialogRef.close();
  }
}
