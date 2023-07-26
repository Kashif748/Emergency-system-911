import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import {
  ActivityDependenciesState,
  ActivityDependenciesStateModel,
  DEPENDENCIES_TYPES,
} from '@core/states/activity-analysis/dependencies/dependencies.state';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { BrowseActivityAnalysisState } from '../../states/browse-activity-analysis.state';
import { BrowseActivityDependenciesAction } from './states/browse-dependencies.action';
import { BrowseActivityDependenciesState } from './states/browse-dependencies.state';

@Component({
  selector: 'app-browse-dependencies',
  templateUrl: './browse-dependencies.component.html',
  styleUrls: ['./browse-dependencies.component.scss'],
})
export class BrowseDependenciesComponent implements OnInit  ,OnDestroy{
  DEPENDENCIES_TYPES = DEPENDENCIES_TYPES;

  @Select(ActivityDependenciesState.activityDependencyInternal)
  public activityDependencyInternal$: Observable<boolean>;

  @Select(ActivityDependenciesState.activityDependencyExternal)
  public activityDependencyExternal$: Observable<boolean>;

  @Select(ActivityDependenciesState.activityDependencyOrg)
  public activityDependencyOrg$: Observable<boolean>;
  // @Select(ActivityDependenciesState.totalRecords)
  // public totalRecords$: Observable<number>;

  @Select(BrowseActivityDependenciesState.state)
  public state$: Observable<ActivityDependenciesStateModel>;

  private destroy$ = new Subject();

  constructor(
    private store: Store,
    private translate: TranslateService,
    private lang: ILangFacade
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.store.select(BrowseActivityAnalysisState.cycleId),
      this.store.select(BrowseActivityAnalysisState.activityId),
    ])
      .pipe(
        takeUntil(this.destroy$),
        tap(([activity, cycle]) => {
          this.loadInternalPage();
          this.loadExternalPage();
          this.loadOrgPage();
        })
      )
      .subscribe();
  }

  public loadInternalPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseActivityDependenciesAction.LoadDependencyInternal({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }

  public loadExternalPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseActivityDependenciesAction.LoadDependencyExternal({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }

  public loadOrgPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseActivityDependenciesAction.LoadDependencyOrg({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
