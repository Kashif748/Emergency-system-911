import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';
import {TranslationService} from '../../i18n/translation.service';

@Component({
  selector: 'app-corr-receivers-list',
  templateUrl: './corr-receivers-list.component.html',
  styleUrls: ['./corr-receivers-list.component.scss']
})
export class CorrReceiversListComponent implements OnInit {

  // Variables.
  lang = '';
  items = [];

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private translationService: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: any[]) {
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    const corrStatus = this.getCorrStatus();
    this.data.forEach(item => {
      const corrId = item?.correspondenceStatus?.id || null;
      if (corrId) {
        const status = corrStatus.find(status => status.id === corrId);
        item['status'] = {
          name: this.lang === 'ar' ? status.nameAr : status.nameEn,
          id: status.id
        };
      }
    });

  }


  getCorrStatus() {
    const commonData = JSON.parse(localStorage.getItem('commonData'));
    return commonData.correspondenceStatus;
  }

}
