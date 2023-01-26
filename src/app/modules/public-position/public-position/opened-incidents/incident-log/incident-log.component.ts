import {Component, Input, OnInit} from '@angular/core';
import {TranslationService} from '../../../../i18n/translation.service';
import {CustomDatePipe} from '@shared/pipes/custom-date.pipe';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-incident-log',
  templateUrl: './incident-log.component.html',
  styleUrls: ['./incident-log.component.scss']
})
export class IncidentLogComponent implements OnInit {

  @Input() log: any;
  lang = 'en';

  constructor(private readonly translationService: TranslationService,
              private customDatePipe: CustomDatePipe,
              private datePipe: DatePipe
  ) {
    this.lang = this.translationService.getSelectedLanguage();
  }

  ngOnInit(): void {
  }

  getLogCreatedBy() {
    if (this.lang === 'ar') {
      return this.log.createdBy?.firstNameAr + ' ' + this.log.createdBy?.lastNameAr;
    } else {
      return this.log.createdBy?.firstNameEn + ' ' + this.log.createdBy?.lastNameEn;
    }
  }

  getCreationTime() {
    return this.datePipe.transform(this.customDatePipe.transform(this.log.createdOn), 'medium');
  }

  getCreatorOrg() {
    if (this.lang === 'ar') {
      return this.log.createdBy.orgStructure.nameAr;
    } else {
      return this.log.createdBy.orgStructure.nameEn;
    }
  }
}
