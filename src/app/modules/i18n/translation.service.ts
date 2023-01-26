// Localization is based on '@ngx-translate/core';
// Please be familiar with official documentations first => https://github.com/ngx-translate/core

import {Inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Direction} from '@angular/cdk/bidi';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {SplashScreenService} from 'src/app/_metronic/partials/layout/splash-screen/splash-screen.service';
import {map} from 'rxjs/operators';

export interface Locale {
  lang: string;
  data: any;
}

export const LOCALIZATION_LOCAL_STORAGE_KEY = 'language';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  dir: Direction = 'ltr';
  // Private properties
  private langChangeStartSubject = new Subject<any>();
  private langChangedSubject = new Subject<string>();
  private directionChangedSubject = new BehaviorSubject<Direction>(this.dir);
  private langIds: any = [];
  private subject = new BehaviorSubject<{ lang: 'ar' | 'en' }>({lang: 'ar'});
  // Public properties
  langChangeStart$: Observable<any>;
  langChanged$: Observable<string>;
  directionChanged$: Observable<Direction>;
  public dir$ = this.subject.pipe(map((s) => (s.lang == 'ar' ? 'rtl' : 'ltr')));
  public lang$ = this.subject.pipe(map((s) => s.lang));
  // UI
  private htmlTag: HTMLHtmlElement;

  constructor(
    private translate: TranslateService,
    private splashScreenService: SplashScreenService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.langChangeStart$ = this.langChangeStartSubject.asObservable();
    this.langChanged$ = this.langChangedSubject.asObservable();
    this.directionChanged$ = this.directionChangedSubject.asObservable();
    this.translate.addLangs(['en']);
    this.translate.setDefaultLang('ar');
    this.htmlTag = this.document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;
  }

  get(key: string) {
    return this.translate.instant(key);
  }

  getWithArgs(key: string, args = null) {
    return this.translate.instant(key, args);
  }

  loadTranslations(...args: Locale[]): void {
    const locales = [...args];
    locales.forEach((locale) => {
      this.translate.setTranslation(locale.lang, locale.data, true);
      this.langIds.push(locale.lang);
    });
    this.translate.addLangs(this.langIds);
  }

  setLanguage(lang) {
    this.subject.next({lang});
    const styleLink = this.document.getElementById('langCss') as HTMLLinkElement;
    const bundleName = lang === 'ar' ? 'arabicStyle.css' : 'englishStyle.scss';
    if (styleLink && !styleLink.href.includes(bundleName)) {
      this.splashScreenService.show();
      setTimeout(() => {
        this.langChangeStartSubject.next();
        this.useLanguage(lang);
        styleLink.href = bundleName;
        this.langChangedSubject.next(lang);
        // wait 1000ms until switching styles complete.
        setTimeout(() => this.splashScreenService.hide(), 1000);
      }, 1000);
    } else {
      this.useLanguage(lang);
    }
  }

  private useLanguage(lang) {
    if (lang) {
      this.translate.use(this.translate.getDefaultLang());
      this.translate.use(lang);
      this.dir = lang === 'ar' ? 'rtl' : 'ltr';
      this.htmlTag.dir = this.dir;
      if (this.dir != this.directionChangedSubject.value) {
        // emit langChanged value
        this.directionChangedSubject.next(this.dir);
      }
      localStorage.setItem('language', lang);
    }
  }

  translateAWord(word: string) {
    let translatedWord: string;
    this.translate.stream(word).subscribe((data) => {
      translatedWord = data;
    });
    return translatedWord;
  }


  getSelectedLanguage(): any {
    return (
      localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY) ||
      this.translate.getDefaultLang()
    );
  }
}
