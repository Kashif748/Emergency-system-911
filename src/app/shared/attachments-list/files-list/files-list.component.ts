import { HttpResponse } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService, IAuthService } from '@core/services/auth.service';
import { animations } from '@shared/animations/animation';
import arabicLocale from '@uppy/locales/lib/ar_SA';
import * as XHRUpload from '@uppy/xhr-upload';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { AttachmentsService } from 'src/app/_metronic/core/services/attachments.service';
import { environment } from 'src/environments/environment';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { ConfirmDialogComponent } from 'src/app/modules/confirm-dialog/confirm-dialog.component';
import { ViewImageComponent } from './view-image/view-image.component';
import { ILangFacade } from '@core/facades/lang.facade';
import { concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { UploadTagIdConst } from '@core/constant/UploadTagIdConst';
import { forkJoin, Observable } from 'rxjs';
import { IncidentsService } from 'src/app/_metronic/core/services/incidents.service';
import { MessageHelper } from '@core/helpers/message.helper';

const Uppy = require('@uppy/core');
const Dashboard = require('@uppy/dashboard');
const Webcam = require('@uppy/webcam');
const ScreenCapture = require('@uppy/screen-capture');

interface FileParentGroup {
  title?: string;
  id: number;
  groups: FileGroup[];
}

interface FileGroup {
  description?: string;
  isLogAttachment?: boolean;
  files: File[];
}

interface File {
  id: string;
  uuid: string;
  recordId: string;
  mimeType: string;
  fileName: string;
}

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss'],
  animations,
})
export class FilesListComponent implements OnInit, AfterViewInit {
  // UI
  @Input() recordId = 0;
  @Input() inline = false;
  @Input() tagId = 0;
  @Input() reporterTagId = 0;
  @Input() foreignHelperId = null;
  // tslint:disable-next-line:no-input-rename
  @Input('files') uploadedFiles: any[] = [];
  // Variables
  dir$ = this.langFacade.vm$.pipe(map((s) => s.ActiveLang.dir));
  files = [
    'ai',
    'avi',
    'dbf',
    'dwg',
    'exe',
    'fla',
    'iso',
    'js',
    'json',
    'psd',
    'rtf',
    'search',
    'txt',
    'txt',
    'xml',
    'pdf',
    'doc',
    'html',
    'csv',
    'css',
    'xml',
    'zip',
    'jpg',
    'mp4',
    'png',
    'xlsx',
    'mp3',
    'ppt',
    'svg',
    'PNG',
  ];
  uppy: any;
  loading = true;
  uploadView = false;
  lang = 'en';
  filesGroupedByType: FileParentGroup[] = [];
  attachments: any[] = [];
  uploadTagConst = UploadTagIdConst;

  constructor(
    private attachmentsService: AttachmentsService,
    private authService: IAuthService,
    private cd: ChangeDetectorRef,
    private langFacade: ILangFacade,
    private alertService: AlertsService,
    private translationService: TranslationService,
    private incidentService: IncidentsService,
    public matDialog: MatDialog,
    private messageHelper: MessageHelper
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.loadFiles();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.uppy = new Uppy({
        debug: true,
        autoProceed: false,
        plugins: {
          GoogleDrive: true,
          Webcam: true,
          ScreenCapture: true,
        },
        restrictions: {
          maxFileSize: 20971520, // 20 MB
          maxNumberOfFiles: 10,
          minNumberOfFiles: 0,
          requiredMetaFields: ['description'],
        },
        locale: this.lang == 'ar' ? arabicLocale : '',
      })
        .use(Dashboard, {
          id: 'uppy-uploader-' + this.tagId,
          height: 400,
          inline: this.inline,
          target: '#DashboardContainer',
          replaceTargetContent: false,
          showProgressDetails: true,
          proudlyDisplayPoweredByUppy: false,
          browserBackButtonClose: true,
          hideUploadButton: this.inline,
          note:
            this.lang == 'ar'
              ? 'حجم الملف يجب ان لا يتعدى ٢٠ ميجابايت'
              : 'File Size should not exceed 20 MB',
          locale: this.lang == 'ar' ? arabicLocale : '',
          metaFields: [
            {
              id: 'desc',
              name: this.translationService.get('ACTIONS.DESCRIPTION'),
              placeholder: this.translationService.get('ACTIONS.PLACEHOLDER'),
            },
          ],
        })
        .use(Webcam, { target: Dashboard })
        .use(ScreenCapture, { target: Dashboard });

      if (this.recordId) {
        this.uppy = this.uppy.use(XHRUpload, {
          endpoint: `${environment.apiUrl}/dms/upload/?recordId=${this.recordId}&tagId=${this.tagId}`,
          headers: {
            Authorization: `Bearer ${this.authService.accessToken}`,
          },
          formData: true,
          fieldName: 'file',
        });
        const instance = this.uppy.getPlugin('XHRUpload');
        if (instance && this.tagId == 28) {
          this.uppy.removePlugin(instance);
        }
      }
      this.uppy.on('upload-success', (file, response) => {
        this.loadFiles();
      });
    }, 300);
  }

  openUploadModal() {
    const dashboard = this.uppy.getPlugin('uppy-uploader-' + this.tagId);
    dashboard.openModal();
  }

  async upload(id, modifyEndpoint = true) {
    if (modifyEndpoint) {
      this.uppy.use(XHRUpload, {
        endpoint: `${environment.apiUrl}/dms/upload/?recordId=${id}&tagId=${this.tagId}`,
        headers: {
          Authorization: `Bearer ${this.authService.accessToken}`,
        },
        formData: true,
        fieldName: 'file',
      });
    }
    await this.uppy.upload().then(
      (result) => {
        if (result.failed.length > 0) {
          result.failed.forEach((file) => {
            console.error(file.error);
          });
        }
      },
      (err) => {
        this.messageHelper.error({ error: err });
      }
    );
  }

  download(id, fileName) {
    this.attachmentsService
      .downloadFile(id)
      .subscribe((response: HttpResponse<Blob>) => {
        const binaryData = [];
        binaryData.push(response.body);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: 'blob' })
        );
        downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        this.alertService.openSuccessSnackBarWithMsg('downloading...');
      });
  }

  deleteFile(uuid: string) {
    if (this.recordId) {
      this.matDialog
        .open(ConfirmDialogComponent)
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            this.attachmentsService.deleteFile(uuid).subscribe(
              (data) => {
                this.attachments = this.attachments.filter(
                  (attachment) => attachment.uuid !== uuid
                );
                this.groupAttachmentsForUI();
                this.cd.detectChanges();
                this.alertService.openSuccessSnackBar();
              },
              (err) => {
                this.alertService.openFailureSnackBar();
              }
            );
          }
        });
    } else {
      this.loadFiles();
      this.cd.detectChanges();
    }
  }

  getFileExtension(fileName: string) {
    const ext = fileName.split('.').pop().toLowerCase();
    return this.files.includes(ext) ? ext : 'file';
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return sizes[i] + ' ' + parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  }

  viewImage(imageUUID: string) {
    this.matDialog.open(ViewImageComponent, {
      disableClose: false,
      panelClass: 'view-image-modal',
      data: { imageUUID },
    });
  }

  private loadIncidentFiles() {
    // let taskRequestNames = [];
    // this.incidentService
    //   .getIncidentTasks(this.recordId, { currentPage: 0, itemsPerPage: 10 })
    //   .pipe(
    //     map((result) => result['result']['content'] as any[]),
    //     map((res: any[]) => res.map((v) => v?.id)),
    //     tap((v) => {
    //       taskRequestNames = v.map((taskId) => `task${taskId}Res`);
    //     }),

    //     map((v: number[]) => {
    //       return v.map((taskId) => {
    //         return {
    //           [`task${taskId}Res`]:
    //             this.attachmentsService.getTaskAttachments(taskId),
    //         };
    //       });
    //     }),
    //     mergeMap((v) => this.groupAllRequests(v))
    //   )
    //   .subscribe((v) => {
    //   });
    forkJoin({
      logsAttachmentsRes: this.attachmentsService.getWorkLogsHasAttachment(
        this.recordId
      ),
      incidentsAttachmentsRes: this.attachmentsService.getIncidentAttachments(
        this.recordId
      ),
      incidentsReporterAttachmentsRes:
        this.attachmentsService.getReporterFilesList(this.recordId),
    }).subscribe(
      ({
        logsAttachmentsRes,
        incidentsAttachmentsRes,
        incidentsReporterAttachmentsRes,
      }) => {
        this.fillAttachmentsList(
          logsAttachmentsRes,
          incidentsAttachmentsRes,
          null,
          incidentsReporterAttachmentsRes
        ).finally(() => {
          this.groupAttachmentsForUI();
          this.cd.detectChanges();
        });
      },
      (e) => {
        console.log(e);
        this.loading = false;
        this.cd.detectChanges();
      }
    );
  }

  private groupAllRequests(requests: any[]) {
    requests.push({
      logsAttachmentsRes: this.attachmentsService.getWorkLogsHasAttachment(
        this.recordId
      ),
    });
    requests.push({
      incidentsAttachmentsRes: this.attachmentsService.getIncidentAttachments(
        this.recordId
      ),
    });
    return forkJoin(requests.values);
  }

  private getParentGroup(parentGroups: FileParentGroup[], title: string) {
    return parentGroups.find((g) => g.title === title);
  }

  private getGroup(groups: FileGroup[], description: string) {
    return groups.find((f) => f.description == description);
  }

  private getFile(files: File[], id: string) {
    return files.find((f) => f.id === id);
  }

  private loadFiles() {
    if ([null, undefined].includes(this.recordId)) {
      this.loading = false;
      return;
    }

    this.loading = true;
    this.filesGroupedByType = [];
    this.cd.detectChanges();

    switch (this.tagId) {
      case UploadTagIdConst.INCIDENT:
        return this.loadIncidentFiles();
      case UploadTagIdConst.TASKS:
        return this.loadTaskFiles();
      case UploadTagIdConst.INTERIM_INCIDENT:
        return this.loadInterimIncidentFiles();
      case UploadTagIdConst.ASSETS_IMAGE:
        return this.loadAsssestImageFiles();
      case UploadTagIdConst.PLAN_SITUATION:
        return this.loadSituationsAttachments();
      case UploadTagIdConst.SHIFT_SITUATION:
        return this.loadSituationsAttachments();
      default:
        return;
    }
  }

  private loadAsssestImageFiles() {
    this.attachmentsService.getAssestsFilesList(this.recordId).subscribe(
      (data) => {
        this.fillAttachmentsList(null, data);
        this.groupAttachmentsForUI();
        this.cd.detectChanges();
      },
      (err) => {},
      () => (this.loading = false)
    );
  }

  private loadSituationsAttachments() {
    this.attachmentsService.getFilesList(this.recordId, this.tagId).subscribe(
      (data) => {
        this.fillAttachmentsList(null, data);
        this.groupAttachmentsForUI();
        this.cd.detectChanges();
      },
      (err) => {},
      () => (this.loading = false)
    );
  }

  private loadInterimIncidentFiles() {
    this.attachmentsService
      .getInterimIncidentAttachments(this.recordId)
      .subscribe(
        (data) => {
          this.fillAttachmentsList(null, data);
          this.groupAttachmentsForUI();
          this.cd.detectChanges();
        },
        (err) => {},
        () => (this.loading = false)
      );
  }

  private async fillAttachmentsList(
    logsAttachmentsRes: any,
    attachmentsRes: any,
    moreAttachmentsRes?: any,
    reporterAttachment?: any
  ) {
    const tempAttachments = [];
    if (moreAttachmentsRes) {
      (moreAttachmentsRes && (moreAttachmentsRes['result'] as any[])).forEach(
        (doc) => {
          const attachment = doc?.documents ? doc.documents : doc;
          attachment['groupName'] =
            this.tagId == UploadTagIdConst.TASK_WORK_LOG
              ? this.translationService.get('TASK.INCIDENT_ATTACHMENT')
              : 'NONE';
          tempAttachments.push(attachment);
        }
      );
    }

    if (reporterAttachment) {
      (reporterAttachment['result'] as any[]).forEach((doc) => {
        const attachment = doc?.documents ? doc.documents : doc;
        attachment['groupName'] =
          this.reporterTagId == UploadTagIdConst.REPORTER_IMAGE
            ? this.translationService.get('TASK.INCIDENT_ATTACHMENT')
            : this.translationService.get('TASK.INCIDENT_ATTACHMENT');
        tempAttachments.push(attachment);
      });
    }

    if (logsAttachmentsRes) {
      (logsAttachmentsRes['result']['content'] as any[]).forEach((log) => {
        if (
          log.hasAttachments &&
          log.attachments &&
          log.attachments.length > 0
        ) {
          for (const attachment of log.attachments) {
            attachment['isLogAttachment'] = true;
            attachment['groupName'] =
              this.tagId == UploadTagIdConst.TASK_WORK_LOG
                ? this.translationService.get('TASK.TASK_ATTACHMENT')
                : this.translationService.get('TASK.INCIDENT_ATTACHMENT');
            tempAttachments.push(attachment);
          }
        }
      });
    }

    (attachmentsRes['result'] as any[]).forEach((doc) => {
      const attachment = doc?.documents ? doc.documents : doc;
      attachment['groupName'] =
        this.tagId == UploadTagIdConst.TASK_WORK_LOG
          ? this.translationService.get('TASK.TASK_ATTACHMENT')
          : this.translationService.get('TASK.INCIDENT_ATTACHMENT');
      tempAttachments.push(attachment);
    });
    this.attachments = tempAttachments.sort((a, b) => {
      return a.id - b.id;
    });
  }

  private groupAttachmentsForUI() {
    this.filesGroupedByType = [];
    const tempGroups: FileParentGroup[] = [];
    this.attachments.forEach((document) => {
      const parentGr = this.getParentGroup(tempGroups, document?.groupName);
      if (!parentGr) {
        tempGroups.push({
          title: document?.groupName,
          id: 1,
          groups: [
            {
              files: [document],
              description: document?.description,
              isLogAttachment: document?.isLogAttachment,
            },
          ],
        });
      } else {
        parentGr.groups.push({
          files: [document],
          description: document?.description,
          isLogAttachment: document?.isLogAttachment,
        });
      }
    });
    // this.attachments.forEach((document) => {
    //   const tasks = document.incidentTaskList;
    //   if (tasks && tasks.length > 0) {
    //     for (const task of tasks) {
    //       const parentGroup = this.getParentGroup(tempGroups, task.id);
    //       const description = document.description ?? '';
    //       if (parentGroup) {
    //         const taskGroup = this.getGroup(parentGroup.groups, description);
    //         if (taskGroup) {
    //           const file = this.getFile(taskGroup.files, document['id']);
    //           if (!file) {
    //             (taskGroup.files as any[]).push({
    //               id: document['id'],
    //               uuid: document['uuid'],
    //               recordId: document['recordId'],
    //               mimeType: document['mimeType'],
    //               fileName: document['fileName'],
    //             });
    //           }
    //         } else {
    //           parentGroup.groups.push({
    //             description,
    //             files: [
    //               {
    //                 id: document['id'],
    //                 uuid: document['uuid'],
    //                 recordId: document['recordId'],
    //                 mimeType: document['mimeType'],
    //                 fileName: document['fileName'],
    //               },
    //             ],
    //           });
    //         }
    //       } else {
    //         // create parent group for task
    //         let taskTitle = '';
    //         if (this.lang === 'ar') {
    //           taskTitle = `مرفقات مهمة "${task.title}"`;
    //         } else {
    //           taskTitle = `Attachments' Task "${task.title}"`;
    //         }
    //         const parentGroup: FileParentGroup = {
    //           title: taskTitle,
    //           id: task.id,
    //           groups: [
    //             {
    //               description,
    //               files: [
    //                 {
    //                   id: document['id'],
    //                   uuid: document['uuid'],
    //                   recordId: document['recordId'],
    //                   mimeType: document['mimeType'],
    //                   fileName: document['fileName'],
    //                 },
    //               ],
    //             },
    //           ],
    //         };
    //         tempGroups.push(parentGroup);
    //       }
    //     }
    //   } else {
    //     // normal incident attachment
    //     const description = document.description ?? '';
    //     const group = this.getGroup(incidentParentGroup.groups, description);
    //     if (group) {
    //       const file = this.getFile(group.files, document['id']);
    //       if (!file) {
    //         (group.files as any[]).push({
    //           id: document['id'],
    //           uuid: document['uuid'],
    //           recordId: document['recordId'],
    //           mimeType: document['mimeType'],
    //           fileName: document['fileName'],
    //         });
    //       }
    //     } else {
    //       incidentParentGroup.groups.push({
    //         description,
    //         files: [
    //           {
    //             id: document['id'],
    //             uuid: document['uuid'],
    //             recordId: document['recordId'],
    //             mimeType: document['mimeType'],
    //             fileName: document['fileName'],
    //           },
    //         ],
    //         isLogAttachment: document['isLogAttachment'],
    //       });
    //     }
    //   }
    // });
    //this.filesGroupedByType = [incidentParentGroup, ...tempGroups];
    this.filesGroupedByType = [...tempGroups];
    this.loading = false;
  }

  private loadTaskFiles() {
    forkJoin({
      logsAttachmentsRes: this.attachmentsService.getTaskWorkLogs(
        this.recordId
      ),
      tasksAttachmentsRes: this.attachmentsService.getTaskAttachments(
        this.recordId
      ),
      incidentsAttachmentsRes: this.attachmentsService.getIncidentAttachments(
        this.foreignHelperId ?? this.recordId
      ),
    }).subscribe(
      ({
        logsAttachmentsRes,
        tasksAttachmentsRes,
        incidentsAttachmentsRes,
      }) => {
        this.fillAttachmentsList(
          logsAttachmentsRes,
          tasksAttachmentsRes,
          incidentsAttachmentsRes
        );
        this.groupAttachmentsForUI();
        this.cd.detectChanges();
      },
      (e) => {
        console.log(e);
        this.loading = false;
        this.cd.detectChanges();
      }
    );
  }
}
