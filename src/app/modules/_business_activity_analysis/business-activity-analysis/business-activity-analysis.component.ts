import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BcActivities, BcActivityAnalysis, BcCycles } from 'src/app/api/models';
import { BrowseActivityAnalysisAction } from '../states/browse-activity-analysis.action';
import { BrowseActivityAnalysisState } from '../states/browse-activity-analysis.state';
import { TABS } from '../tempData.conts';

@Component({
  selector: 'app-business-activity-analysis',
  templateUrl: './business-activity-analysis.component.html',
  styleUrls: ['./business-activity-analysis.component.scss'],
})
export class BusinessActivityAnalysisComponent implements OnInit, OnDestroy {
  @Select(ActivityAnalysisState.activityAnalysis)
  public activityAnalysis$: Observable<BcActivityAnalysis>;

  @Select(ActivityAnalysisState.cycle)
  public cycle$: Observable<BcCycles>;

  @Select(BrowseActivityAnalysisState.tabIndex)
  public tabIndex$: Observable<BcCycles>;

  tabs = TABS;

  private destroy$ = new Subject();
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private store: Store
  ) {
    activeRoute.url
      .pipe(
        takeUntil(this.destroy$),
        filter((p) => !!activeRoute.snapshot?.firstChild),
        tap(() => {
          const params = activeRoute.snapshot.firstChild?.queryParams;
          const path = activeRoute.snapshot.firstChild.routeConfig?.path;
          const index = this.tabs.findIndex((item) => item.router == path);
          this.store.dispatch([
            new BrowseActivityAnalysisAction.GetActivityAnalysis({
              id: params['_activity'],
            }),
            new BrowseActivityAnalysisAction.GetCycle({
              id: params['_cycle'],
            }),
            new BrowseActivityAnalysisAction.ChangeTab({
              index,
            }),
          ]);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}
  changeTab(index: number) {
    this.store
      .dispatch([
        new BrowseActivityAnalysisAction.ChangeTab({
          index,
        }),
      ])
      .toPromise()
      .then(() => {
        this.router.navigate(
          ['business-activity-analysis/' + this.tabs[index].router],
          {
            queryParamsHandling: 'merge',
          }
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
