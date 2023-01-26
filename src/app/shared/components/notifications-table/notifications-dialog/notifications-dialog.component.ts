import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslationService } from 'src/app/modules/i18n/translation.service';

@Component({
  selector: 'app-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class NotificationsDialogComponent implements OnInit {

  @ViewChild('emailBody') emailBodyEl: ElementRef;
  lang: string;
  body;
  mode: 'emailBody' | 'recivers';
  recivers = [];
  constructor(
    private translation: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<NotificationsDialogComponent>,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.lang = this.translation.getSelectedLanguage();
    if (this.data && this.data.mode === 'emailBody') {
      this.mode = 'emailBody';
      this.body = this.sanitizer.bypassSecurityTrustHtml(this.data?.emailBody);
      this.setLinksBlank();
    } else {
      this.mode = 'recivers';
      this.recivers = this.data.recivers;
    }
  }

  setLinksBlank(): void {
    setTimeout(() => {
      let links = this.emailBodyEl.nativeElement.getElementsByTagName(
        'a'
      ) as HTMLCollection;
      if (links?.length > 0) {
        for (let i = 0; i < links.length; i++) {
          const element = links[i];
          element.setAttribute('target', '_blank');
        }
      }
    }, 1000);
  }


}
