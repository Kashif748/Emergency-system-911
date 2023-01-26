import {HttpResponse} from '@angular/common/http';
import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TranslationService} from 'src/app/modules/i18n/translation.service';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {CorrService} from 'src/app/_metronic/core/services/correspondence.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnChanges {

  // UI
  // tslint:disable-next-line:no-input-rename
  @Input('message') message: any;
  // tslint:disable-next-line:no-input-rename
  @Input('attachments') attachments: any[];
  // tslint:disable-next-line:no-input-rename no-output-rename
  @Output('delete') delete$: EventEmitter<number> = new EventEmitter();
  // tslint:disable-next-line:no-input-rename no-output-rename
  @Output('reply') reply$: EventEmitter<number> = new EventEmitter();

  // Variables
  corr: any;
  lang: string;
  prevMessageId: number;
  displayAttachments: boolean;

  constructor(
    private ref: ChangeDetectorRef,
    private corrService: CorrService,
    public alertService: AlertsService,
    private translationService: TranslationService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.message) {
      this.loadAttachments();
    }
  }

  ngOnInit(): void {
    this.prevMessageId = this.message.id;
    this.lang = this.translationService.getSelectedLanguage();
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
          this.translationService.translateAWord(
            'CORRERSPONDENCE.PREPARE_TO_DOWNLOAD'
          )
        );
      });
  }

  loadAttachments() {
    this.displayAttachments = false;
    this.attachments = [];
    this.corrService.loadAttachmants(this.message.id).subscribe(
      (data) => {
        if (data) {
          this.attachments = [...data.result];
          this.displayAttachments = true;
          this.ref.detectChanges();
        }
      },
      (error) => {
      }
    );
  }

}
