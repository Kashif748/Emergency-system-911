import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import {
  ActivityEmployeesState,
  ActivityEmployeesStateModel,
} from '@core/states/activity-analysis/employees/employees.state';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { BcActivityEmployees } from 'src/app/api/models';
import { BrowseActivityAnalysisState } from '../../states/browse-activity-analysis.state';
import { BrowseActivityEmployeesAction } from '../states/browse-employees.action';
import { BrowseActivityEmployeesState } from '../states/browse-employees.state';

@Component({
  selector: 'app-browse-employees',
  templateUrl: './browse-employees.component.html',
  styleUrls: ['./browse-employees.component.scss'],
})
export class BrowseEmployeesComponent implements OnInit  ,OnDestroy{
  public page$: Observable<BcActivityEmployees[]>;

  @Select(ActivityEmployeesState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ActivityEmployeesState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseActivityEmployeesState.state)
  public state$: Observable<ActivityEmployeesStateModel>;

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
        label: this.translate.instant('ACTIONS.ACTIVATE'),
        icon: 'pi pi-check-square',
      },
    ] as MenuItem[];
    this.page$ = this.store.select(ActivityEmployeesState.page).pipe(
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
            ],
          };
        })
      )
    );
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseActivityEmployeesAction.ToggleDialog({ id }));
  }
  public loadPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseActivityEmployeesAction.LoadEmployees({
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
