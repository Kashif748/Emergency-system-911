import { Injectable, OnDestroy, Optional } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

import { TranslateService } from "@ngx-translate/core";

import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { IStorageService } from "src/app/core/services/storage.service";
import { ArI18N } from "src/assets/i18n/shared/ar.json";
import { EnI18N } from "src/assets/i18n/shared/en.json";

import { LangStateModel } from "./models/lang.model";

let _state: LangStateModel = {
  AvailableLangs: [
    { key: "ar", name: "العربية", dir: "rtl" },
    { key: "en", name: "English", dir: "ltr" },
  ],
  ActiveLang: { key: "ar", name: "العربية", dir: "rtl" },
};

@Injectable()
export abstract class ILangFacade {
  /**
   * Viewmodel that resolves once all the data is ready (or updated)...
   */
  readonly vm$: Observable<LangStateModel>;
  /**
   * Allows quick snapshot access to data for ngOnInit() purposes
   */
  abstract get stateSanpshot(): LangStateModel;
  /**
   * Allows change language of the application
   * @param langKey an key of the language
   */
  abstract changeLang(langKey: "ar" | "en" | string): void;
  /**
   * build lang form that used to catch lang data
   */
  abstract buildForm(): FormGroup;
  /**
   * Applay changes of form on application
   */
  abstract save(): void;
}

@Injectable()
export class LangFacade implements ILangFacade, OnDestroy {
  private subscriptions: Subscription[] = [];

  vm$: Observable<LangStateModel> = this.storageService.getState("lang").pipe(
    map((s) => {
      return {
        ActiveLang: _state.AvailableLangs.find((l) => l.key == s),
        AvailableLangs: _state.AvailableLangs,
      };
    })
  );

  // ------- Public Methods ------------------------

  public get stateSanpshot(): LangStateModel {
    return { ..._state, ActiveLang: { ..._state.ActiveLang } };
  }

  private langForm: FormGroup;

  public buildForm(): FormGroup {
    const displayLang = this.formBuilder.control(
      this.stateSanpshot.ActiveLang.key,
      []
    );
    this.langForm = this.formBuilder.group({
      displayLang: displayLang,
    });

    return this.langForm;
  }

  public changeLang(langKey: string): void {
    const lang = _state.AvailableLangs.find((l) => l.key == langKey);
    this.translateService.use(lang.key);
    document.body.dir = lang.dir;
    this.updateState({ ..._state, ActiveLang: lang });
  }

  public save(): void {
    this.changeLang(this.langForm.value.DisplayLang);
  }

  // ------- Private Methods ------------------------

  /** Update internal state cache and emit from store... */
  private updateState(state: LangStateModel) {
    // persist selected language to storage
    _state = state;
    this.storageService.setState("lang", state.ActiveLang.key);
  }

  private unSubscribeAll() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
    this.subscriptions = [];
  }

  constructor(
    private translateService: TranslateService,
    private storageService: IStorageService,
    @Optional() private formBuilder: FormBuilder
  ) {
    // initialize active language with the previously stored language
    let lang = this.storageService.getItem("lang");
    if (lang) {
      this.changeLang(lang);
    } else {
      lang = this.stateSanpshot.ActiveLang.key;
      this.storageService.setState("lang", lang);
    }
    const sub = this.storageService
      .getState<string>("lang")
      .subscribe((langKey) => {
        this.changeLang(langKey);
      });
    this.subscriptions = [...this.subscriptions, sub];

    this.loadTranslations(
      { lang: "ar", data: ArI18N },
      { lang: "en", data: EnI18N }
    );
  }

  ngOnDestroy(): void {
    this.unSubscribeAll();
  }

  private loadTranslations(...locales: { lang: string; data: any }[]) {
    locales.forEach((locale) => {
      // use setTranslation() with the third argument set to true
      // to append translations instead of replacing them
      this.translateService.setTranslation(locale.lang, locale.data, true);
    });
  }
}
