import {Component, Input, OnInit} from '@angular/core';
import {TranslationService} from '../../../i18n/translation.service';
import {ReportItem} from '../public-position.component';

@Component({
  selector: 'app-byimportance-chart',
  templateUrl: './by-importance-chart.component.html',
  styleUrls: ['./by-importance-chart.component.scss'],
})
export class ByImportanceChartComponent implements OnInit {
  lang = 'en';
  @Input() priorities: ReportItem[];

  constructor(private readonly translationService: TranslationService) {
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
  }
}
