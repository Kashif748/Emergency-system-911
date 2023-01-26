import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '@shared/components/confirm-dialog/confirm-dialog.component';
import { ClosureIncidentPopupComponent } from '@shared/components/closure-incident-popup/closure-incident-popup.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  updateConfirm() {
    const dialogData = new ConfirmDialogModel(
      'SHARED.DIALOG.UPDATE.TITLE',
      'SHARED.DIALOG.UPDATE.MESSAGE',
      'SHARED.DIALOG.YES',
      'SHARED.DIALOG.NO',
      'warn_outline'
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    return dialogRef.afterClosed();
  }

  deleteConfirm(): Observable<any> {
    const dialogData = new ConfirmDialogModel(
      'SHARED.DIALOG.DELETE.TITLE',
      'SHARED.DIALOG.DELETE.MESSAGE',
      'SHARED.DIALOG.YES',
      'SHARED.DIALOG.NO',
      'error_outline'
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: '400px',
      data: dialogData,
    });

    return dialogRef.afterClosed();
  }

  noTeamsSelectedConfirmDialog(): Observable<any> {
    const dialogData = new ConfirmDialogModel(
      null,
      'SHARED.DIALOG.TEAMS_NOT_SELECTED.MESSAGE',
      'SHARED.DIALOG.YES',
      'SHARED.DIALOG.NO',
      'error_outline'
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: '400px',
      data: dialogData,
    });

    return dialogRef.afterClosed();
  }
}
