import {Component, Input, OnInit} from '@angular/core';
import {TranslationService} from '../../../i18n/translation.service';
import {ReportItem} from '../public-position.component';

@Component({
  selector: 'app-bycategory-chart',
  templateUrl: './by-category-chart.component.html',
  styleUrls: ['./by-category-chart.component.scss'],
})
export class ByCategoryChartComponent implements OnInit {
  lang = 'en';
  @Input() categories: ReportItem[];

  constructor(private readonly translationService: TranslationService) {
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
  }
}
