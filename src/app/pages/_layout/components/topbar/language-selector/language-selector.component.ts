import { Direction, Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ILangFacade } from '@core/facades/lang.facade';
import { filter } from 'rxjs/operators';
import { TranslationService } from '../../../../../modules/i18n/translation.service';

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  language: LanguageFlag;
  languages: LanguageFlag[] = [
    {
      lang: 'en',
      name: 'English',
      flag: './assets/media/svg/flags/260-united-kingdom.svg',
    },
    {
      lang: 'ar',
      name: 'العربية',
      flag: './assets/media/svg/flags/151-united-arab-emirates.svg',
    },
  ];

  direction = '';
  constructor(
    private translationService: TranslationService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private langFacade: ILangFacade,
    private dir: Directionality
  ) {}

  ngOnInit() {
    this.setSelectedLanguage();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        this.setSelectedLanguage();
      });
  }

  setLanguageWithRefresh(lang) {
    this.setLanguage(lang);
    this.langFacade.changeLang(lang);
    let dir = lang == 'ar' ? 'rtl' : ('ltr' as Direction);
    this.dir.change.emit(dir);
    window.location.reload();
  }

  setLanguage(lang) {
    this.languages.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    this.translationService.setLanguage(lang);
    if (lang == 'ar') {
      this.direction = 'rtl';
    } else {
      this.direction = 'ltr';
    }

    let htmlTag = document.querySelector('html');
    htmlTag.setAttribute('lang', this.translationService.getSelectedLanguage());
    htmlTag.setAttribute('dir', this.direction);
    htmlTag.setAttribute('direction', this.direction);
    htmlTag.style.direction = this.direction;
  }

  setSelectedLanguage(): any {
    this.setLanguage(this.translationService.getSelectedLanguage());
    this.document.documentElement.lang =
      this.translationService.getSelectedLanguage();
  }
}
