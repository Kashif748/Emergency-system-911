import { ChangeDetectorRef, Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { isObject } from 'lodash';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilKeyChanged,
  skip,
  skipWhile,
  tap,
} from 'rxjs/operators';

import { DashboardService } from '../dashboard.service';
import { data } from '../random-data';

@Component({
  selector: 'app-widget1',
  templateUrl: './widget1.component.html',
  styleUrls: ['./widget1.component.scss'],
})
export class Widget1Component implements OnInit, OnDestroy {
  widgets = data.widget1;

  statistics: any = null;

  loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private _dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  private subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    let sub = this._dashboardService.statisticsChange$
      .pipe(
        skipWhile((res) => !res),
        tap((data) => {
          this.checkChanges(this.statistics, this._dashboardService.statistics);
          this.statistics = this._dashboardService.statistics;
          if (
            this.statistics?.delayedTasks &&
            !this.statistics?.delayedTasks.toString().includes('/')
          ) {
            this.statistics.delayedTasks = ` ${this.statistics?.incomingTasks} / ${this.statistics?.delayedTasks}`;
          }
          if (this.statistics !== null) {
            this.loadingSubject.next(true);
            this.loading$ = this.loadingSubject.asObservable();
          }
        }),
        debounceTime(5000),
        tap((_) => {
          this.widgets.forEach((element) => {
            element.changed = false;
          });
          this.cdr.detectChanges();
        })
      )
      .subscribe();

    this.subscriptions = [...this.subscriptions, sub];
  }

  isPrimitive(val) {
    if (val === null) {
      return true;
    }
    if (typeof val == 'object' || typeof val == 'function') {
      return false;
    } else {
      return true;
    }
  }

  checkChanges = (previous, current) => {
    if (this.isPrimitive(previous) || this.isPrimitive(current)) {
      if (previous === current) {
        return '';
      }

      return current;
    }

    for (const [key, value] of Object.entries(previous)) {
      if (current[key] !== value) {
        const widget = this.widgets.find((widget) => widget.value === key);
        if (widget) {
          widget.changed = true;
        }
      }
      this.cdr.detectChanges();

      return true;
    }
  };
}
