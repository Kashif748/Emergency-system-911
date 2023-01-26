import {Component, Input, OnInit} from '@angular/core';
import {TranslationService} from 'src/app/modules/i18n/translation.service';

@Component({
  selector: 'app-event-log-item',
  templateUrl: './event-log-item.component.html',
  styleUrls: ['./event-log-item.component.scss'],
})
export class EventLogItemComponent implements OnInit {
  // UI
  @Input() item: any;
  // Variables
  lang = 'ar';

  constructor(private translationService: TranslationService) {
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
  }
}
