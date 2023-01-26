import {HttpResponse} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import {BehaviorSubject} from 'rxjs';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {CommonService} from 'src/app/_metronic/core/services/common.service';
import {IncidentsService} from 'src/app/_metronic/core/services/incidents.service';
import {TranslationService} from '../../i18n/translation.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import {DialogImageComponent} from '@shared/components/dialog-image/dialog-image.component';
import {ViewImageComponent} from '@shared/attachments-list/files-list/view-image/view-image.component';

@Component({
  selector: 'app-log-file-bottom-sheet',
  templateUrl: './log-file-bottom-sheet.component.html',
  styleUrls: ['./log-file-bottom-sheet.component.scss'],
})
export class LogFileBottomSheetComponent implements OnInit {
  // Variables.
  id = 0;
  type: 'task' | 'incident';
  files: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private translationService: TranslationService,
    private incidentService: IncidentsService,
    private commonService: CommonService,
    private alertService: AlertsService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private bottomSheetRef: MatBottomSheetRef<LogFileBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private data: { id: any; type: 'task' | 'incident' }
  ) {
    this.id = this.data.id;
    this.type = this.data.type;
  }

  ngOnInit() {
    this.loadAtt(this.id);
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  getFiles(id) {
    this.incidentService.getIncidentWorkLogFiles(id).subscribe(
      (data) => {
        if (data) {
          if (data.result.length === 0) {
            this.alertService.openSuccessSnackBarWithMsg(
              this.translationService.get('WORK_LOG_LIST.NO_ATTACHMENTS')
            );
          } else {
            this.alertService.openSuccessSnackBarWithMsg(
              this.translationService.get('WORK_LOG_LIST.LOADING')
            );
            this.downloadFiles(data.result);
          }
        }
      },
      (error) => {
        this.alertService.openFailureSnackBarWithMsg(error);
      }
    );
  }

  getTaskWorkLogFiles(id) {
    this.incidentService.getTaskWorkLogFiles(id).subscribe(
      (data) => {
        if (data) {
          this.files.next(data.result);
          if (data.result.length === 0) {
            this.alertService.openSuccessSnackBarWithMsg(
              this.translationService.get('WORK_LOG_LIST.NO_ATTACHMENTS')
            );
          } else {
            this.alertService.openSuccessSnackBarWithMsg(
              this.translationService.get('WORK_LOG_LIST.LOADING')
            );
            this.downloadFiles(data.result);
          }
        }
      },
      (error) => {
        this.alertService.openFailureSnackBarWithMsg(error);
      }
    );
  }

  download(id, fileName) {
    this.incidentService
      .downloadFiles(id)
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
          this.translationService.get('WORK_LOG_LIST.DOWNLOADING')
        );
      });
  }

  loadAtt(id) {
    if (this.type === 'task') {
      this.getTaskWorkLogFiles(id);
    } else {
      this.getFiles(id);
    }
  }

  private async downloadFiles(files) {
    for (const file of files) {
      const response: any = await this.incidentService
        .downloadFiles(file.uuid).toPromise();
      file.blob = response.body;
      const fileMimeType = (file.mimeType as string);
      if (fileMimeType.startsWith('image')) {
        file.type = 'image';
        const objectURL = URL.createObjectURL(file.blob);
        file.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      } else if (fileMimeType.startsWith('application')) {
        // pdf file.
        file.type = 'pdf';
      } else if (fileMimeType.startsWith('audio')) {
        // sound file.
        file.type = 'audio';
        const objectURL = URL.createObjectURL(file.blob);
        file.audio = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }
    }
    this.files.next(files);
  }

  showFullImageDialog(uuid: any) {
    this.dialog.open(ViewImageComponent, {
      disableClose: false,
      panelClass: 'view-image-modal',
      data: {imageUUID: uuid},
    });
  }
}

