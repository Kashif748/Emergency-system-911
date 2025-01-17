import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import { ActivitySystemsState } from '@core/states/activity-analysis/systems/systems.state';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import {LazyLoadEvent, MenuItem} from 'primeng/api';
import { combineLatest, Observable, Subject } from 'rxjs';
import {filter, map, takeUntil, tap} from 'rxjs/operators';
import { ActivityAnalysisStatusAction, BcActivitySystems } from 'src/app/api/models';
import { BrowseActivitySystemsAction } from '../states/browse-systems.action';
import {
  BrowseActivitySystemsState,
  BrowseActivitySystemsStateModel,
} from '../states/browse-systems.state';

@Component({
  selector: 'app-browse-systems',
  templateUrl: './browse-systems.component.html',
  styleUrls: ['./browse-systems.component.scss'],
})
export class BrowseSystemsComponent implements OnInit, OnDestroy {
  public page$: Observable<BcActivitySystems[]>;

  @Select(ActivitySystemsState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ActivitySystemsState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseActivitySystemsState.state)
  public state$: Observable<BrowseActivitySystemsStateModel>;

  @Select(ActivityAnalysisState.activityStatus)
  public activityStatus$: Observable<ActivityAnalysisStatusAction>;

  private destroy$ = new Subject();

  constructor(private store: Store, private langFacade: ILangFacade, private translate: TranslateService,) {}

  ngOnInit(): void {
    combineLatest([
      this.store.select(ActivityAnalysisState.activityAnalysis),
      this.store.select(ActivityAnalysisState.cycle),
    ])
      .pipe(
        takeUntil(this.destroy$),
        tap(([activity, cycle]) => {
          this.loadPage();
        })
      )
      .subscribe();

    const userActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
      {
        label: this.translate.instant('ACTIONS.DELETE'),
        icon: 'pi pi pi-trash',
      },
    ] as MenuItem[];

    this.page$ = this.store.select(ActivitySystemsState.page).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...userActions[0],
                command: () => {
                  this.openDialog(u.id);
                },
                disabled: !u.isActive,
              },
              {
                ...userActions[1],
                command: () => {
                  this.delete(u.id);
                },
                disabled: !u.isActive,
              }
            ],
          };
        })
      )
    );
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseActivitySystemsAction.ToggleDialog({ id }));
  }
  public loadPage(event?: LazyLoadEvent) {
    const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
    const activityAnalysis = this.store.selectSnapshot(
      ActivityAnalysisState.activityAnalysis
    );
    this.store.dispatch(
      new BrowseActivitySystemsAction.LoadActivitySystems({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
        cycleId: cycle?.id,
        activityId: activityAnalysis.activity.id,
      })
    );
  }
  delete(id) {
    this.store
      .dispatch(new BrowseActivitySystemsAction.Delete({ id }))
      .toPromise()
      .then(() => {
        this.loadPage();
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
