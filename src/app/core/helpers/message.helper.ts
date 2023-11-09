import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class MessageHelper {
  constructor(
    private messageService: MessageService,
    private translate: TranslateService
  ) {}
  success(param?: { summary?: string; detail?: string }) {
    this.messageService.add({
      severity: 'success',
      summary:
        param?.summary ?? this.translate.instant('SHARED.DIALOG.SUCCESS.TITLE'),
      detail:
        param?.detail ??
        this.translate.instant('SHARED.DIALOG.SUCCESS.MESSAGE'),
    });
  }

  cError(param?: { summary?: string; detail?: string }) {
    this.messageService.add({
      severity: 'error',
      summary:
        param?.summary ?? this.translate.instant('SHARED.DIALOG.ERROR.TITLE'),
      detail:
        param?.detail ??
          this.translate.instant('SHARED.DIALOG.ERROR.CMESSAGE'),
    })
  }

  error(param?: {
    summary?: string;
    detail?: string;
    error?: any;
    severity?: 'error' | 'warn';
  }) {
    param.severity = param.severity ?? 'error';

    if (param?.error instanceof HttpErrorResponse) {
      const err = param.error?.error?.error;
      if (err) {
        param.detail =
          err[
            `message_${this.translate.currentLang[0].toUpperCase()}${
              this.translate.currentLang[1]
            }`
          ] ??
          err[
            `message${this.translate.currentLang[0].toUpperCase()}${
              this.translate.currentLang[1]
            }`
          ];
      }
    }
    this.messageService.add({
      severity: param.severity,
      summary:
        param?.summary ??
        this.translate.instant(
          `SHARED.DIALOG.${param.severity?.toUpperCase()}.TITLE`
        ),
      detail:
        param?.detail ??
        this.translate.instant(
          `SHARED.DIALOG.${param.severity?.toUpperCase()}.MESSAGE`
        ),
    });
  }
  confirm(param: {
    summary: 'SHARED.DIALOG.ARE_YOU_SURE';
    detail: 'SHARED.DIALOG.ACTIVATE.MESSAGE';
    yesCommand?: () => void;
    noCommand?: () => void;
  }) {
    this.messageService.add({
      key: 'confirm_dialog',
      sticky: true,
      severity: 'warn',
      summary: param.summary,
      detail: param.detail,
      data: {
        yesCommand: param.yesCommand ?? this.closeConfirm,
        noCommand: param.noCommand ?? this.closeConfirm,
      },
    });
  }

  delete(param: {
    summary: 'SHARED.DIALOG.DELETE.TITLE';
    detail: 'SHARED.DIALOG.DELETE.MESSAGE';
    yesCommand?: () => void;
    noCommand?: () => void;
  }) {
    this.messageService.add({
      key: 'confirm_dialog',
      sticky: true,
      severity: 'warn',
      summary: param.summary,
      detail: param.detail,
      data: {
        yesCommand: param.yesCommand ?? this.closeConfirm,
        noCommand: param.noCommand ?? this.closeConfirm,
      },
    });
  }

  closeConfirm() {
    this.messageService.clear('confirm_dialog');
  }
}
