import {Component, OnDestroy, OnInit} from '@angular/core';
import {skipWhile, tap} from "rxjs/operators";
import {combineLatest, Subscription} from "rxjs";
import {DashboardService} from "../dashboard.service";

@Component({
  selector: 'app-bc-widget',
  templateUrl: './bc-widget.component.html',
  styleUrls: ['./bc-widget.component.scss']
})
export class BcWidgetComponent implements OnInit, OnDestroy {
  sections: any = null;
  constructor(
    private dashboardService: DashboardService,
  ) { }
  private subscriptions: Subscription[] = [];
  ngOnInit(): void {
    const sub = this.dashboardService.statisticsChange$
      .pipe(
        skipWhile((stats) => !stats),
        tap((stats) => {
          // this.checkChanges(this.statistics, this._dashboardService.statistics);
           this.sections = stats;
        })
      ).subscribe();
    this.subscriptions = [...this.subscriptions, sub];
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
