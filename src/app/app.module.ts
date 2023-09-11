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
import {
  GroupState,
  AssetState,
  CommonDataState,
  OrgState,
  RoleState,
  TaskState,
  UserState,
  RtoState,
  ImpactMatrixState,
} from '@core/states';
import { IncidentState } from '@core/states/incident/incident.state';
import { PhonebookState } from '@core/states/phonebook/phonebook.state';
import { CenterState } from '@core/states/service-center-area/centers/center.state';
import { IncidentLocInfoState } from '@core/states/incident-location-info/incidentLocInfo.state';
import { SituationsState } from '@core/states/situations/situations.state';
import { NewsState } from '@core/states/news/news.state';
import { ImpLevelWorkingState } from '@core/states/bc/imp-level-working/imp-level-working.state';
import { ActivityPrioritySeqState } from '@core/states/bc/activity-priority-seq/activity-priority-seq.state';
import { ActivityFrquencyState } from '@core/states/bc/activity-frquency/activity-frquency.state';
import { LocationTypeState } from '@core/states/bc/location-type/locationType.state';
import { ImpactLevelState } from '@core/states/bc/impact-level/impact-level.state';
import { OrgDetailState } from '@core/states/bc/org-details/org-detail.state';
import { BCState } from '@core/states/bc/bc/bc.state';
import { LocationsState } from '@core/states/bc-setup/locations/locations.state';
import { OrgActivityState } from '@core/states/org-activities/orgActivity.state';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import { ActivitySystemsState } from '@core/states/activity-analysis/systems/systems.state';
import { ActivityImpactMatrixState } from '@core/states/activity-analysis/impact-matrix/impact-matrix.state';
import { ActivityEmployeesState } from '@core/states/activity-analysis/employees/employees.state';
import { ActivityLocationsState } from '@core/states/activity-analysis/locations/locations.state';
import { ActivityDependenciesState } from '@core/states/activity-analysis/dependencies/dependencies.state';
import { ImpactAnalysisState } from '@core/states/impact-analysis/impact-analysis.state';
import { NgxsStoragePluginModule } from './_async-storage/storage.module';
import {VenderState} from "@core/states/bc-setup/venders/vender.state";
import { SystemsState } from '@core/states/bc-setup/systems/systems.state';
import { ActivityWorklogsState } from '@core/states/activity-analysis/worklogs/worklogs.state';
import {RemoteWorkState} from "@core/states/bc-resources/remote-work/remote-work.state";
import {RecordsState} from "@core/states/bc-resources/records/records.state";
import {AppSystemState} from "@core/states/bc-resources/app-system/app-system.state";
import {InfraState} from "@core/states/bc-resources/infra-req/infra.state";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {StaffState} from "@core/states/bc-resources/staff/staff.state";
import {OtherState} from "@core/states/bc-resources/other/other.state";
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
    // ------------------
    NgxsModule.forRoot(
      [
        RootState,
        UserState,
        RoleState,
        OrgState,
        TaskState,
        GroupState,
        CenterState,
        IncidentLocInfoState,
        IncidentState,
        CommonDataState,
        AssetState,
        PhonebookState,
        SituationsState,
        NewsState,
        RtoState,
        ImpLevelWorkingState,
        ActivityPrioritySeqState,
        ActivityFrquencyState,
        LocationTypeState,
        ImpactLevelState,
        ImpactMatrixState,
        OrgDetailState,
        BCState,
        LocationsState,
        SystemsState,
        OrgActivityState,
        ActivityAnalysisState,
        ActivitySystemsState,
        ActivityEmployeesState,
        ActivityLocationsState,
        ActivityDependenciesState,
        ActivityWorklogsState,
        ImpactAnalysisState,
        ActivityImpactMatrixState,
        VenderState,
        RemoteWorkState,
        RecordsState,
        AppSystemState,
        InfraState,
        ResourceAnalysisState,
        StaffState,
        OtherState
      ],
      {
        developmentMode: !environment.production,
      }
    ),
    NgxsStoragePluginModule.forRoot(
      {
        key: [
          'browse_users',
          'browse_roles',
          'common_data',
          'browse_tasks',
          'browse_groups',
          'browse_bc',
          'browse_activity_analysis',
          'browse_impact_analysis',
          'browse_org_activities',
          'browse_vender',
          'browse_remote_work',
          'browse_record',
          'browse_app_system',
          'browse_infra',
          'browse_resource_analysis',
          'browse_staff',
          'browse_other'
        ],
      },
      ['common_data']
    ),
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
