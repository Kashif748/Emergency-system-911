import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar-AE';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ClipboardModule } from 'ngx-clipboard';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgMarqueeModule } from 'ng-marquee';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { LayoutDataService } from './pages/layout.service';
import { AlertsService } from './_metronic/core/services/alerts.service';
import { PushNotificationsService } from './_metronic/core/services/push.notifications.service';
import { SplashScreenModule } from './_metronic/partials/layout/splash-screen/splash-screen.module';
import { DropdownListModule } from 'ngx-dropdown-list';
import { PropTranslatorPipe } from '@shared/pipes/prop-translator.pipe';
import {
  LiquidCacheStorageTypes,
  NgxLiquidCacheModule,
} from 'ngx-liquid-cache';

import firebase from 'firebase/compat/app';
import initializeApp = firebase.initializeApp;
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducer } from './modules/incidents/new-incidents-view/store/incidents-dashboard.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatIconRegistry } from '@angular/material/icon';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
import { NgxsModule } from '@ngxs/store';
import { RootState } from './states/root.state';
import { ApiModule } from './api/api.module';
import { ApiConfiguration } from './api/api-configuration';
initializeApp(environment.firebase);
registerLocaleData(localeAr);
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { OrgState, RoleState, TaskState, UserState } from '@core/states';
import { HyperStorageEngine } from '@core/storage/hyper-storage.engine';
import { NgxsAsyncStoragePluginModule } from './async-storage/async-storage.module';
import { PhonebookState } from '@core/states/phonebook/phonebook.state';
// export function TranslateHttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
// }

/**
 * Import specific languages to avoid importing everything
 * The following will lazy load highlight.js core script (~9.6KB) + the selected languages bundle (each lang. ~1kb)
 */
export function getHighlightLanguages() {
  return [
    { name: 'typescript', func: typescript },
    { name: 'scss', func: scss },
    { name: 'xml', func: xml },
    { name: 'json', func: json },
  ];
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    SplashScreenModule,
    ApiModule,
    HttpClientModule,
    HighlightModule,
    ClipboardModule,
    NgMarqueeModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    ChartsModule,
    AppRoutingModule,
    CoreModule,
    TranslateModule.forRoot({
      extend: true,
      isolate: true,
    }),
    InlineSVGModule.forRoot(),
    NgbModule,
    NgxLiquidCacheModule.forRoot({
      duration: 60 * 60 * 24, // 1 day
      storageType: LiquidCacheStorageTypes.localStorage,
    }),
    StoreModule.forRoot({ incidentDashboard: reducer }, {}),
    DropdownListModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    //------------------
    NgxsModule.forRoot([RootState, UserState, RoleState, OrgState, TaskState ,PhonebookState], {
      developmentMode: !environment.production,
    }),
    NgxsAsyncStoragePluginModule.forRoot(HyperStorageEngine, {
      key: ['browse_users', 'browse_roles'],
    }),
    ToastModule,
    ButtonModule,
  ],
  providers: [
    AlertsService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages,
      },
    },
    { provide: ApiConfiguration, useFactory: apiConfig },
    DatePipe,
    PropTranslatorPipe,
    PushNotificationsService,
    { provide: ILangFacade, useClass: LangFacade },
    { provide: LayoutDataService, useClass: LayoutDataService, multi: false },
    {
      provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
      useValue: MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
    },
    // -----------------------
    {
      provide: APP_INITIALIZER,
      deps: [PrimeNGConfig, TranslateService],
      useFactory: initApp,
      multi: true,
    },
    // {
    //   provide: STORAGE_ENGINE,
    //   useClass: HyperStorageEngine,
    //   deps: [UserPreferencesControllerService],
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private iconRegistery: MatIconRegistry, sanitizer: DomSanitizer) {
    this.iconRegistery.addSvgIcon(
      'ads_click',
      sanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/media/svg/icons/Electric/ads_click.svg'
      )
    );
    this.iconRegistery.addSvgIcon(
      'flash_on',
      sanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/media/svg/icons/Electric/flash_on.svg'
      )
    );
    this.iconRegistery.addSvgIcon(
      'person',
      sanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/media/svg/icons/Electric/ads_click.svg'
      )
    );
  }
}

export function apiConfig(): ApiConfiguration {
  return { rootUrl: 'ecms' };
}

export function initApp(config: PrimeNGConfig, translate: TranslateService) {
  return () => {
    config.ripple = true;
    translate.get('PRIMENG').subscribe((trans) => config.setTranslation(trans));
    return Promise.all([config]);
  };
}
