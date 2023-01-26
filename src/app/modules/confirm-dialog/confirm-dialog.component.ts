import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  public confirmMessage = 'GENERAL.DELETE_CONFIRM';
  public confirmSubMessage = '';
  public icon = 'error_outline';
  public actionName = 'ACTIONS.DELETE';
  
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
  }
}
