import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ILangFacade } from '@core/facades/lang.facade';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import { ActivityImpactMatrixState } from '@core/states/activity-analysis/impact-matrix/impact-matrix.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, skip, takeUntil, tap } from 'rxjs/operators';
import { BcActivityAnalysis, BcCycles, Bcrto } from 'src/app/api/models';
import { ActivityAnalysisStatusAction } from 'src/app/api/models/activity-analysis-status-action';
import { BcActivityAnalysisChangeStatusDto } from 'src/app/api/models/bc-activity-analysis-change-status-dto';
import { BrowseActivityAnalysisAction } from '../states/browse-activity-analysis.action';
import {
  BrowseActivityAnalysisState,
  BrowseActivityAnalysisStateModel,
} from '../states/browse-activity-analysis.state';
import { TABS } from '../tempData.conts';

@Component({
  selector: 'app-activity-analysis',
  templateUrl: './activity-analysis.component.html',
  styleUrls: ['./activity-analysis.component.scss'],
})
export class ActivityAnalysisComponent implements OnInit, OnDestroy {
  @Select(ActivityAnalysisState.activityAnalysis)
  public activityAnalysis$: Observable<BcActivityAnalysis>;

  @Select(ActivityAnalysisState.activityStatus)
  public activityStatus$: Observable<ActivityAnalysisStatusAction>;

  @Select(BrowseActivityAnalysisState.tabIndex)
  public tabIndex$: Observable<BcCycles>;

  @Select(ActivityAnalysisState.blocking)
  public blocking$: Observable<boolean>;

  @Select(ActivityImpactMatrixState.loading)
  public loadingImpactAnalysisRes$: Observable<boolean>;

  @Select(BrowseActivityAnalysisState.impactTotal)
  public impactTotal$: Observable<number>;
  
  @Select(BrowseActivityAnalysisState.impactAnalysisRes)
  public impactAnalysisRes$: Observable<Bcrto>;

  tabs = TABS;
  displayNote = false;
  notes: FormControl;
  newStatus: BcActivityAnalysisChangeStatusDto;
  public dir$ = this.lang.vm$.pipe(
    map(({ ActiveLang: { key } }) => (key === 'ar' ? 'rtl' : 'ltr'))
  );

  public icon$ = this.lang.vm$.pipe(
    map(({ ActiveLang: { key } }) =>
      key === 'ar' ? 'pi pi-arrow-right' : 'pi pi-arrow-left'
    )
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
            new BrowseActivityAnalysisAction.GetActivityAnalysisStatus({
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

  ngOnInit(): void {
    this.notes = new FormControl('', Validators.required);
  }
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
          ['bc/activity-analysis/' + this.tabs[index].router],
          {
            queryParamsHandling: 'merge',
          }
        );
      });
  }
  changeStatus(id, action) {
    this.newStatus = {
      activityAnalysisId: id,
      actionId: action?.id,
      notes: '',
    };
    if (action.requiresNote) {
      this.displayNote = true;
      return;
    } else {
      this.applyStatus();
    }
  }
  applyStatus() {
    this.newStatus = {
      ...this.newStatus,
      notes: this.notes.value,
    };
    this.store
      .dispatch([new BrowseActivityAnalysisAction.ChangeStatus(this.newStatus)])
      .toPromise()
      .then(() => {
        this.displayNote = false;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  back() {
    this.router.navigate(['/bc/impact-analysis'], {
      queryParams: {
        _activity: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }
}
