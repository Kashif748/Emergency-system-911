import { PLATFORM_ID, Inject, Injectable } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { PlainObject } from '@ngxs/store/internals';
import {
  NgxsPlugin,
  setValue,
  getValue,
  InitState,
  UpdateState,
  actionMatcher,
  NgxsNextPluginFn,
} from '@ngxs/store';
import { concatMap, map, reduce, switchMap, tap } from 'rxjs/operators';

import {
  AsyncStorageEngine,
  NgxsStoragePluginOptions,
  STORAGE_ENGINE,
  NGXS_STORAGE_PLUGIN_OPTIONS,
} from './symbols';
import { DEFAULT_STATE_KEY } from './internals';
import { Observable, from, of } from 'rxjs';

/**
 * @description Will be provided through Terser global definitions by Angular CLI
 * during the production build. This is how Angular does tree-shaking internally.
 */
declare const ngDevMode: boolean;

@Injectable()
export class NgxsStoragePlugin implements NgxsPlugin {
  // We cast to `string[]` here as we're sure that this option has been
  // transformed by the `storageOptionsFactory` function that provided token.
  private _keys = this._options.key as string[];
  // We default to `[DEFAULT_STATE_KEY]` if the user explicitly does not provide the `key` option.
  private _usesDefaultStateKey =
    this._keys.length === 1 && this._keys[0] === DEFAULT_STATE_KEY;

  constructor(
    @Inject(NGXS_STORAGE_PLUGIN_OPTIONS)
    private _options: NgxsStoragePluginOptions,
    @Inject(STORAGE_ENGINE) private _engine: AsyncStorageEngine,
    @Inject(PLATFORM_ID) private _platformId: string
  ) {}

  handle(state: any, event: any, next: NgxsNextPluginFn) {
    if (isPlatformServer(this._platformId) && this._engine === null) {
      return next(state, event);
    }

    const matches = actionMatcher(event);
    const isInitAction = matches(InitState);
    const isUpdateAction = matches(UpdateState);
    const isInitOrUpdateAction = isInitAction || isUpdateAction;
    let hasMigration = false;
    let initAction: Observable<any> = of(state);

    if (isInitOrUpdateAction) {
      const addedStates = isUpdateAction && event.addedStates;

      // We're checking what states have been added by NGXS and if any of these states should be handled by
      // the storage plugin. For instance, we only want to deserialize the `auth` state, NGXS has added
      // the `user` state, the storage plugin will be rerun and will do redundant deserialization.
      // `usesDefaultStateKey` is necessary to check since `event.addedStates` never contains `@@STATE`.
      const keysToBeLoaded =
        !this._usesDefaultStateKey && addedStates
          ? this._keys.filter((key) => {
              // We support providing keys that can be deeply nested via dot notation, for instance,
              // `keys: ['myState.myProperty']` is a valid key.
              // The state name should always go first. The below code checks if the `key` includes dot
              // notation and extracts the state name out of the key.
              // Given the `key` is `myState.myProperty`, the `addedStates` will only contain `myState`.
              const dotNotationIndex = key.indexOf(DOT);
              const stateName =
                dotNotationIndex > -1 ? key.slice(0, dotNotationIndex) : key;
              return addedStates.hasOwnProperty(stateName);
            })
          : [];
      initAction = from(keysToBeLoaded).pipe(
        concatMap((key) =>
          this._engine.getItem(key).pipe(map((val) => [key, val]))
        ),
        reduce((previousState, [key, storedValue]) => {
          let nextState = previousState;
          if (storedValue !== 'undefined' && storedValue != null) {
            try {
              const newVal = this._options.deserialize!(storedValue);
              storedValue = this._options.afterDeserialize!(newVal, key);
            } catch {
              // Caretaker note: we have still left the `typeof` condition in order to avoid
              // creating a breaking change for projects that still use the View Engine.
              if (typeof ngDevMode === 'undefined' || ngDevMode) {
                console.error(
                  `Error ocurred while deserializing the ${key} store value, falling back to empty object, the value obtained from the store: `,
                  storedValue
                );
              }
              storedValue = {};
            }

            if (this._options.migrations) {
              this._options.migrations.forEach((strategy) => {
                const versionMatch =
                  strategy.version ===
                  getValue(storedValue, strategy.versionKey || 'version');
                const keyMatch =
                  (!strategy.key && this._usesDefaultStateKey) ||
                  strategy.key === key;
                if (versionMatch && keyMatch) {
                  storedValue = strategy.migrate(storedValue);
                  hasMigration = true;
                }
              });
            }

            if (!this._usesDefaultStateKey) {
              nextState = setValue(previousState, key!, storedValue);
            } else {
              // The `UpdateState` action is dispatched whenever the feature state is added.
              // The below condition is met only when the `UpdateState` is dispatched.
              // Let's assume that we have 2 states `counter` and `@ngxs/router-plugin` state.
              // `CounterState` is provided on the root level when calling `NgxsModule.forRoot()`
              // and `@ngxs/router-plugin` is provided as a feature state.
              // The storage plugin may save the `counter` state value as `10` before.
              // The `CounterState` may implement the `ngxsOnInit` hook and call `ctx.setState(999)`.
              // The storage plugin will re-hydrate the whole state when the `RouterState` is registered,
              // and the `counter` state will again equal `10` (not `999`).
              if (
                storedValue &&
                addedStates &&
                Object.keys(addedStates).length > 0
              ) {
                storedValue = Object.keys(addedStates).reduce(
                  (accumulator, addedState) => {
                    // The `storedValue` may equal the whole state (when the default state key is used).
                    // If `addedStates` contains only `router` then we want to merge the state only
                    // with the `router` value.
                    // Let's assume that the `storedValue` is an object:
                    // `{ counter: 10, router: {...} }`
                    // This will pick only the `router` object from the `storedValue` and `counter`
                    // state will not be re-hydrated unnecessary.
                    if (storedValue.hasOwnProperty(addedState)) {
                      accumulator[addedState] = storedValue[addedState];
                    }
                    return accumulator;
                  },
                  <PlainObject>{}
                );
              }

              nextState = { ...previousState, ...storedValue };
            }
          }
          return nextState;
        }, state)
      );
    }

    return initAction.pipe(
      concatMap((stateAfterInit) => next(stateAfterInit, event)),
      tap((nextState) => {
        if (!isInitOrUpdateAction || (isInitOrUpdateAction && hasMigration)) {
          for (const key of this._keys) {
            let val = nextState;

            if (key !== DEFAULT_STATE_KEY) {
              val = getValue(nextState, key!);
            }

            try {
              const newVal = this._options.beforeSerialize!(val, key);
              const sval = this._options.serialize!(newVal);
              !!sval && this._engine.setItem(key!, sval);
            } catch (error) {
              // Caretaker note: we have still left the `typeof` condition in order to avoid
              // creating a breaking change for projects that still use the View Engine.
              if (typeof ngDevMode === 'undefined' || ngDevMode) {
                if (
                  error &&
                  (error.name === 'QuotaExceededError' ||
                    error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
                ) {
                  console.error(
                    `The ${key} store value exceeds the browser storage quota: `,
                    val
                  );
                } else {
                  console.error(
                    `Error ocurred while serializing the ${key} store value, value not updated, the value obtained from the store: `,
                    val
                  );
                }
              }
            }
          }
        }
      })
    );
  }
}

const DOT = '.';
