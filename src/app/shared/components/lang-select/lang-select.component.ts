import { DOCUMENT } from "@angular/common";
import { Component, Inject, NgModule, OnInit, ViewChild } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { ILangFacade } from "@core/facades/lang.facade";
import { NgbDropdown, NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { filter } from "rxjs/operators";
import { TranslationModule } from "src/app/modules/i18n/translation.module";
import { TranslationService } from "src/app/modules/i18n/translation.service";

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

@Component({
  selector: "app-lang-select",
  templateUrl: "./lang-select.component.html",
  styleUrls: ["./lang-select.component.scss"],
})
export class LangSelectComponent implements OnInit {
  @ViewChild('myDrop') myDrop: NgbDropdown;
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
    private langFacade: ILangFacade,
    @Inject(DOCUMENT) private document: Document
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
    this.myDrop.close();
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

@NgModule({
  declarations: [LangSelectComponent],
  imports: [TranslationModule, NgbDropdownModule],
  exports: [LangSelectComponent],
})
export class LangSelectModule {}
