import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";

import { Observable } from "rxjs";

import * as _ from "lodash";

import { AlertsService } from "src/app/_metronic/core/services/alerts.service";

import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";
import { AttachmentsService } from "../../../_metronic/core/services/attachments.service";

@Component({
  selector: "app-attachments",
  templateUrl: "./attachments.component.html",
  styleUrls: ["./attachments.component.scss"],
})
export class AttachmentsComponent implements OnInit, OnChanges {
  selectedFiles: File[] = [];
  selectedFilesList: any[] = [];
  progressInfos = [];
  message = "";

  fileInfos: Observable<any>;

  @Input("incidentId") incidentId: number = 0;
  @Input("files") uploadedFiles: [] = [];
  @Output("filesChanged") filesChanged$: EventEmitter<File[]> =
    new EventEmitter<File[]>();

  constructor(
    public _matDialog: MatDialog,
    private cd: ChangeDetectorRef,
    private alterService: AlertsService,
    private uploadService: AttachmentsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.uploadedFiles?.length) {
      this.uploadedFiles.forEach((item) => {
        this.selectedFilesList.push(item);
      });
    }
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFiles(event): void {
    this.selectedFiles = event.target.files;
    _.forEach(event.target.files, (file) => {
      this.selectedFilesList.push(file);
    });
  }

  removeSelectedFile(index) {
    this.selectedFilesList.splice(index, 1);
  }

  uploadFiles(files: FileList) {
    for (var i = 0; i < files.length; i++) {
      let _file: File = files[i];
      let formData: FormData = new FormData();
      formData.append("file", _file);

      if (this.incidentId) {
        this.uploadService
          .uploadIncidentFiles(this.incidentId, formData)
          .subscribe(
            (data) => {
              this.selectedFilesList.push(data.result);
              this.cd.markForCheck();
              this.alterService.openSuccessSnackBar();
            },
            (error) => {
              this.alterService.openFailureSnackBar();
            }
          );
      } else {
        let temp = {
          fileName: _file.name,
        };

        this.selectedFilesList.push(temp);
        this.selectedFiles.push(_file);

        this.filesChanged$.emit(this.selectedFiles);
      }
    }
  }

  downloadFile(uid, fileName) {
    this.uploadService
      .downloadFile(uid)
      .subscribe((response: HttpResponse<Blob>) => {
        let binaryData = [];
        binaryData.push(response.body);

        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: "blob" })
        );

        downloadLink.setAttribute("download", fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  deleteFile(uid) {
    if (this.incidentId) {
      this._matDialog
        .open(ConfirmDialogComponent)
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            this.uploadService.deleteFile(uid).subscribe(
              (data) => {
                this.selectedFilesList = this.selectedFilesList.filter(
                  (item) => item.uuid != uid
                );

                this.cd.markForCheck();
                this.alterService.openSuccessSnackBar();
              },
              (err) => {
                this.alterService.openFailureSnackBar();
              }
            );
          }
        });
    } else {
      this.selectedFiles.splice(uid, 1);
      this.selectedFilesList.splice(uid, 1);

      this.cd.markForCheck();
      this.filesChanged$.emit(this.selectedFiles);
    }
  }
}
