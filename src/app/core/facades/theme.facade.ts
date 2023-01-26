import { Injectable, OnInit, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

import { IStorageService } from "../services/storage.service";
export type ThemeType = "light" | "dark" | "adnoc-light" | "adnoc-dark";

export interface ThemeState {
  ActiveTheme?: ThemeType;
  DarkMode?: boolean;
}

@Injectable()
export abstract class IThemeFacade implements OnInit {
  abstract ngOnInit(): void;
  abstract setTheme(theme: ThemeType): void;
  abstract darkMode(on: boolean): void;
  abstract vm$: Observable<ThemeState>;
  abstract get stateSnapshot(): ThemeState;
}

@Injectable()
export class ThemeFacade implements IThemeFacade {
  private state: ThemeState = {
    ActiveTheme: "light",
  };
  private store = new BehaviorSubject<ThemeState>(this.state);
  public vm$ = this.store.asObservable().pipe(distinctUntilChanged());

  constructor(
    private storageService: IStorageService,
    @Inject(DOCUMENT) private document: Document
  ) {}
  get stateSnapshot(): ThemeState {
    return { ...this.state };
  }
  ngOnInit(): void {
    this.document.body.classList.remove("dark-background");
    this.document.body.classList.remove("light-background");
    // initialize active theme with the previously stored theme
    let state = this.storageService.getItem<ThemeState>("theme");

    if (!state) {
      state = {} as ThemeState;
    }
    if (state.DarkMode) {
      this.darkMode(true);
    }
    if (state.ActiveTheme) {
      this.setTheme(state.ActiveTheme);
    } else {
      state.ActiveTheme = this.state.ActiveTheme;
      this.storageService.setItem("theme", state);
    }
    this.setTheme(state.ActiveTheme);
  }

  darkMode(on: boolean): void {
    const classList = this.document?.body.classList;
    if (on) {
      classList.add("dark-mode");
    } else {
      classList.remove("dark-mode");
    }
    this.updateState({ ...this.state, DarkMode: on });
  }

  setTheme(theme: ThemeType): void {
    let darkMode = theme.endsWith("dark");
    const classList = this.document?.body.classList;
    if (darkMode) {
      classList.add("dark-mode");
    } else {
      classList.remove("dark-mode");
    }
    this.switchTheme(theme);
    this.updateState({
      ...this.state,
      ActiveTheme: theme,
      DarkMode: darkMode,
    });
  }

  private updateState(state: ThemeState) {
    this.storageService.setItem("theme", state);
    this.store.next((this.state = state));
  }

  private findStyle(theme: string) {
    const links = this.document.getElementsByTagName("link");
    for (const key in links) {
      if (links.hasOwnProperty(key)) {
        if (
          links[key].rel.indexOf("stylesheet") !== -1 &&
          links[key].title === theme
        ) {
          return true;
        }
      }
      return false;
    }
  }

  private switchTheme(theme: ThemeType) {
    if (theme && this.findStyle(theme)) {
      const links = this.document?.getElementsByTagName("link");
      for (const key in links) {
        if (links.hasOwnProperty(key)) {
          const link = links[key];
          if (link.rel.indexOf("stylesheet") !== -1 && link.title) {
            if (link.title === theme) {
              link.disabled = false;
            } else {
              link.disabled = true;
            }
          }
        }
      }
    }
  }
}
