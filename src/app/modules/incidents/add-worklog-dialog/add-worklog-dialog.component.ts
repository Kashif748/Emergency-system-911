import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {TranslationService} from '../../i18n/translation.service';

@Component({
  selector: 'app-add-worklog-dialog',
  templateUrl: './add-worklog-dialog.component.html',
  styleUrls: ['./add-worklog-dialog.component.scss'],
})
export class AddWorklogDialogComponent {
  // Variables
  taskId: any;
  upload = false;
  lang = 'en';

  constructor(
    private dialogRef: MatDialogRef<AddWorklogDialogComponent>,
    private translationService: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: any }
  ) {
    this.taskId = data.taskId;
    this.lang = this.translationService.getSelectedLanguage();
  }

  uploading(event) {
    this.upload = event;
  }

  public complete() {
    this.dialogRef.close();
  }
}
