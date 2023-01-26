import {Component, Input, OnInit} from '@angular/core';
import {AssetStatistics} from '../public-position.component';
import {TranslationService} from '../../../i18n/translation.service';

@Component({
  selector: 'app-assets-statistics',
  templateUrl: './assets-statistics.component.html',
  styleUrls: ['./assets-statistics.component.scss']
})
export class AssetsStatisticsComponent implements OnInit {

  // Variables.
  @Input() assetsStatistics: AssetStatistics[];
  lang = 'en';


  constructor(private readonly translationService: TranslationService) {
    this.lang = this.translationService.getSelectedLanguage();
  }

  ngOnInit(): void {
  }

}
