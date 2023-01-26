import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { SplashScreenService } from './splash-screen.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
  @ViewChild('splashScreen', { static: true }) splashScreen: ElementRef;

  browsers = ['chrome', 'edge', 'safari', 'firefox', 'IE', 'opera'];

  lang = 'en';
  isSupportedBrowser: Observable<boolean>;
  constructor(
    private el: ElementRef,
    private splashScreenService: SplashScreenService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.splashScreenService.init(this.splashScreen);

    this.isSupportedBrowser =
      this.splashScreenService.isSupportedBrowser.asObservable();
  }
}
