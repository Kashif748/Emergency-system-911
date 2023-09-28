import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';

import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {debounceTime, skipWhile, tap,} from 'rxjs/operators';

import {DashboardService} from '../dashboard.service';
import {data} from '../random-data';

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
    let sub = combineLatest([this._dashboardService.statisticsChange$, this._dashboardService.bcStatisticsChange$])
      .pipe(
        skipWhile(([stats, bcStats]) => !stats),
        tap(([stats, bcStats]) => {
          this.checkChanges(this.statistics, this._dashboardService.statistics);
          this.statistics = { ...this._dashboardService.statistics, ...bcStats};

          if (this.statistics['delayedTasks'] >= 0) {
            this.statistics[
              'delayedTasks'
            ] = ` ${this.statistics?.incomingTasks} / ${this.statistics?.delayedTasks}`;
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
