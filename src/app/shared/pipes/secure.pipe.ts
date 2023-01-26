import {
  Pipe,
  PipeTransform,
  OnDestroy,
  WrappedValue,
  ChangeDetectorRef,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Subscription, Observable, BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UrlHelperService } from '../../core/services/url-helper.service';

// Using similarity from AsyncPipe to avoid having to pipe |secure|async in HTML.
@Pipe({
  name: 'secure',
  pure: false,
})
export class SecurePipe implements PipeTransform, OnDestroy {
  private _latestValue: any = null;
  private _latestReturnedValue: any = null;
  private _subscription: Subscription = null;
  private _obj: Observable<any> = null;

  private previousUrl: string;
  private _result: BehaviorSubject<any> = new BehaviorSubject(null);
  private result: Observable<any> = this._result.asObservable();
  private _internalSubscription: Subscription = null;

  destroy$: Subject<boolean> = new Subject();

  constructor(
    private _ref: ChangeDetectorRef,
    private urlHelperService: UrlHelperService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnDestroy(): void {
    if (this._subscription) {
      this._dispose();
    }
  }

  transform(uuid: string): any {
    if (uuid?.startsWith('data:')) {
      return uuid;
    }
    let obj = this.internalTransform(uuid);

    const result = this.asyncTrasnform(obj);

    return result;
  }

  private internalTransform(uuid: string): Observable<any> {
    if (!uuid) {
      return this.result;
    }

    if (this.previousUrl !== uuid) {
      this.previousUrl = uuid;
      this._internalSubscription = this.urlHelperService
        .getImprovised(uuid)
        .pipe(takeUntil(this.destroy$))
        .subscribe((m) => {
          let sanitized = this.sanitizer.bypassSecurityTrustResourceUrl(m);
          this._result.next(sanitized);
        });
    }

    return this.result;
  }

  private asyncTrasnform(obj: Observable<any>): any {
    if (!this._obj) {
      if (obj) {
        this._subscribe(obj);
      }
      this._latestReturnedValue = this._latestValue;
      return this._latestValue;
    }
    if (obj !== this._obj) {
      this._dispose();
      return this.asyncTrasnform(obj);
    }
    if (this._latestValue === this._latestReturnedValue) {
      return this._latestReturnedValue;
    }
    this._latestReturnedValue = this._latestValue;
    return WrappedValue.wrap(this._latestValue);
  }

  private _subscribe(obj: Observable<any>) {
    var _this = this;
    this._obj = obj;

    obj.pipe(takeUntil(this.destroy$)).subscribe({
      next: function (value) {
        return _this._updateLatestValue(obj, value);
      },
      error: (e: any) => {
        throw e;
      },
    });
  }

  private _dispose() {
    // this._subscription.unsubscribe();
    // this._internalSubscription.unsubscribe();

    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();

    this._internalSubscription = null;
    this._latestValue = null;
    this._latestReturnedValue = null;
    this._subscription = null;
    this._obj = null;
  }

  private _updateLatestValue(async: any, value: Object) {
    if (async === this._obj) {
      this._latestValue = value;
      this._ref.markForCheck();
    }
  }
}
