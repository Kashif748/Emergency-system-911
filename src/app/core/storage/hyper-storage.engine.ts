import { Inject } from '@angular/core';
import { IAuthService } from '@core/services/auth.service';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { auditTime, catchError, map, take } from 'rxjs/operators';
import { UserPreferencesControllerService } from 'src/app/api/services';
import {
  AsyncStorageEngine,
  IGNORE_SYNC_STATES,
} from 'src/app/async-storage/symbols';

export class HyperStorageEngine implements AsyncStorageEngine {
  private $$queue: { [key: string]: Subject<any> } = {};
  /**
   *
   */
  constructor(
    private preferences: UserPreferencesControllerService,
    private auth: IAuthService,
    @Inject(IGNORE_SYNC_STATES) private ignoreSyncStates: string[]
  ) {}

  length(): Observable<number> {
    return of(localStorage.length);
  }
  getItem(key: any): Observable<any> {
    let item = localStorage.getItem(key);
    if (item) {
      return of(item);
    }
    if (!this.auth.isAuthorized()) {
      return of(undefined);
    }
    if (this.ignoreSyncStates?.includes(key)) {
      return of(undefined);
    }
    return this.preferences.getByStateKey({ stateKey: key }).pipe(
      map((r) => r.result.stateVal),
      catchError(() => of(undefined))
    );
  }
  setItem(key: any, val: any): void {
    const savedVal = localStorage.getItem(key);
    if (val === savedVal) {
      return;
    }
    localStorage.setItem(key, val);
    if (this.ignoreSyncStates.includes(key)) {
      return;
    }
    if (!this.auth.isAuthorized()) {
      return;
    }
    if (!this.$$queue[key]) {
      this.$$queue[key] = new Subject();
      this.$$queue[key].pipe(auditTime(10000)).subscribe((v) => {
        this.preferences
          .update3({
            body: {
              stateKey: key,
              stateVal: v,
            },
          })
          .pipe(
            take(1),
            catchError(() => EMPTY)
          )
          .subscribe();
      });
    }
    this.$$queue[key].next(val);
  }
  removeItem(key: any): void {
    localStorage.removeItem(key);
  }
  clear(): void {
    localStorage.clear();
  }
  key(val: number): Observable<string> {
    throw new Error('Method not implemented.');
  }
  // -0------------------------
}
