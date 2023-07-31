import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILangFacade } from '@core/facades/lang.facade';
import {
  ActivityAnalysisState,
  ACTIVITY_STATUSES,
} from '@core/states/activity-analysis/activity-analysis.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { BcActivityAnalysis, BcCycles } from 'src/app/api/models';
import { BcActivityAnalysisChangeStatusDto } from 'src/app/api/models/bc-activity-analysis-change-status-dto';
import { BrowseActivityAnalysisAction } from '../states/browse-activity-analysis.action';
import { BrowseActivityAnalysisState } from '../states/browse-activity-analysis.state';
import { TABS } from '../tempData.conts';

@Component({
  selector: 'app-business-activity-analysis',
  templateUrl: './business-activity-analysis.component.html',
  styleUrls: ['./business-activity-analysis.component.scss'],
})
export class BusinessActivityAnalysisComponent implements OnInit, OnDestroy {
  ACTIVITY_STATUSES = ACTIVITY_STATUSES;
  @Select(ActivityAnalysisState.activityAnalysis)
  public activityAnalysis$: Observable<BcActivityAnalysis>;

  @Select(ActivityAnalysisState.cycle)
  public cycle$: Observable<BcCycles>;

  @Select(BrowseActivityAnalysisState.tabIndex)
  public tabIndex$: Observable<BcCycles>;


  @Select(ActivityAnalysisState.blocking)
  public blocking$: Observable<boolean>;


  @Select(BrowseActivityAnalysisState.impactTotal)
  public impactTotal$: Observable<number>;

  tabs = TABS;

  public dir$ = this.lang.vm$.pipe(
    map(({ ActiveLang: { key } }) => (key === 'ar' ? 'rtl' : 'ltr'))
  );
  private destroy$ = new Subject();
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private store: Store,
    private lang: ILangFacade
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
  changeStatus(id, status: ACTIVITY_STATUSES) {
    const newStatus: BcActivityAnalysisChangeStatusDto = {
      activityAnalysisId: id,
      statusId: status,
      notes: '',
    };
    this.store.dispatch([
      new BrowseActivityAnalysisAction.ChangeStatus(newStatus),
    ]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
