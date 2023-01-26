import { BehaviorSubject } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { Injectable, Inject, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  currentTheme: "dark" | "light";
  onCurrentThemeChange: BehaviorSubject<string>;

  private renderer: Renderer2;
  constructor(@Inject(DOCUMENT) document, rendererFactory: RendererFactory2) {
    this.onCurrentThemeChange = new BehaviorSubject("");
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  changeTheme(theme: "dark" | "light") {
    this.currentTheme = theme;
    this.onCurrentThemeChange.next(theme);
    if (this.currentTheme == "dark") {
      this.renderer.addClass(document.body, "dark-mode");
      this.renderer.removeClass(document.body, "light-mode");
    } else {
      this.renderer.addClass(document.body, "light-mode");
      this.renderer.removeClass(document.body, "dark-mode");
    }
  }

  setADNOCTheme() {
    this.renderer.addClass(document.body, "adnoc-theme");
  }
}
