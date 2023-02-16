import {
  NgModule,
  ModuleWithProviders,
  InjectionToken,
  TypeProvider,
} from '@angular/core';
import { NGXS_PLUGINS } from '@ngxs/store';

import { NgxsAsyncStoragePlugin } from './async-storage.plugin';
import {
  IGNORE_SYNC_STATES,
  NgxsStoragePluginOptions,
  NGXS_STORAGE_PLUGIN_OPTIONS,
  STORAGE_ENGINE,
} from './symbols';
import { storageOptionsFactory } from './internals';
import { UserPreferencesControllerService } from '../api/services';
import { IAuthService } from '@core/services/auth.service';

export const USER_OPTIONS = new InjectionToken('USER_OPTIONS');

@NgModule()
export class NgxsAsyncStoragePluginModule {
  static forRoot(
    engine: TypeProvider,
    options?: NgxsStoragePluginOptions,
    ignoreSyncStates?: string[]
  ): ModuleWithProviders<NgxsAsyncStoragePluginModule> {
    return {
      ngModule: NgxsAsyncStoragePluginModule,
      providers: [
        {
          provide: NGXS_PLUGINS,
          useClass: NgxsAsyncStoragePlugin,
          multi: true,
        },
        {
          provide: USER_OPTIONS,
          useValue: options,
        },
        {
          provide: NGXS_STORAGE_PLUGIN_OPTIONS,
          useFactory: storageOptionsFactory,
          deps: [USER_OPTIONS],
        },
        {
          provide: STORAGE_ENGINE,
          useClass: engine,
          deps: [UserPreferencesControllerService, IAuthService],
        },
        {
          provide: IGNORE_SYNC_STATES,
          useValue: ignoreSyncStates
        }
      ],
    };
  }
}
