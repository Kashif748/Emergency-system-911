import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
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
import { ActivityAnalysisStatusAction } from 'src/app/api/models';
import { BrowseActivityDependenciesAction } from './states/browse-dependencies.action';
import { BrowseActivityDependenciesState } from './states/browse-dependencies.state';

@Component({
  selector: 'app-browse-dependencies',
  templateUrl: './browse-dependencies.component.html',
  styleUrls: ['./browse-dependencies.component.scss'],
})
export class BrowseDependenciesComponent implements OnInit, OnDestroy {
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

  @Select(ActivityAnalysisState.activityStatus)
  public activityStatus$: Observable<ActivityAnalysisStatusAction>;

  private destroy$ = new Subject();

  constructor(private store: Store, private lang: ILangFacade) {}

  ngOnInit(): void {
    combineLatest([
      this.store.select(ActivityAnalysisState.activityAnalysis),
      this.store.select(ActivityAnalysisState.cycle),
    ])
      .pipe(
        takeUntil(this.destroy$),
        tap(([activity, cycle]) => {
          this.loadPage(DEPENDENCIES_TYPES.DEPENDENCY_EXTERNAL);
          this.loadPage(DEPENDENCIES_TYPES.DEPENDENCY_INTERNAL);
          this.loadPage(DEPENDENCIES_TYPES.DEPENDENCY_ORG);
        })
      )
      .subscribe();
  }

  loadPage(dependType: DEPENDENCIES_TYPES, event?: LazyLoadEvent) {
    const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
    const activityAnalysis = this.store.selectSnapshot(
      ActivityAnalysisState.activityAnalysis
    );
    const payload = {
      pageRequest: {
        first: event?.first,
        rows: event?.rows,
      },
      cycleId: cycle?.id,
      activityId: activityAnalysis.activity.id,
    };
    switch (dependType) {
      case DEPENDENCIES_TYPES.DEPENDENCY_EXTERNAL:
        this.store.dispatch(
          new BrowseActivityDependenciesAction.LoadDependencyExternal(payload)
        );
        break;
      case DEPENDENCIES_TYPES.DEPENDENCY_INTERNAL:
        this.store.dispatch(
          new BrowseActivityDependenciesAction.LoadDependencyInternal(payload)
        );
        break;
      case DEPENDENCIES_TYPES.DEPENDENCY_ORG:
        this.store.dispatch(
          new BrowseActivityDependenciesAction.LoadDependencyOrg(payload)
        );
        break;

      default:
        break;
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
