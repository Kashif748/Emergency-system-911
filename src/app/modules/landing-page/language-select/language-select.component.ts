import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { ILangFacade } from "@core/facades/lang.facade";
import { filter } from "rxjs/internal/operators/filter";
import { TranslationService } from "../../i18n/translation.service";
interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}
@Component({
  selector: "app-language-select",
  templateUrl: "./language-select.component.html",
  styleUrls: ["./language-select.component.scss"],
})
export class LanguageSelectComponent implements OnInit {
  language: LanguageFlag;
  languages: LanguageFlag[] = [
    {
      lang: "en",
      name: "English",
      flag: "./assets/media/svg/flags/260-united-kingdom.svg",
    },
    {
      lang: "ar",
      name: "العربية",
      flag: "./assets/media/svg/flags/151-united-arab-emirates.svg",
    },
  ];
  direction = "";
  constructor(
    private translationService: TranslationService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private langFacade: ILangFacade
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
    //window.location.reload();
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
    if (lang == "ar") {
      this.direction = "rtl";
    } else {
      this.direction = "ltr";
    }

    let htmlTag = document.querySelector("html");
    htmlTag.setAttribute("lang", this.translationService.getSelectedLanguage());
    htmlTag.setAttribute("dir", this.direction);
    htmlTag.setAttribute("direction", this.direction);
    htmlTag.style.direction = this.direction;
  }

  setSelectedLanguage(): any {
    this.setLanguage(this.translationService.getSelectedLanguage());
    this.document.documentElement.lang =
      this.translationService.getSelectedLanguage();
  }
}
