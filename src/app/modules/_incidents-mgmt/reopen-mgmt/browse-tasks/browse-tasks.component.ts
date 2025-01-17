import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILangFacade } from '@core/facades/lang.facade';
import { MessageHelper } from '@core/helpers/message.helper';
import { CommonDataState, TaskAction, TaskState } from '@core/states';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { IncidentTaskProjection } from 'src/app/api/models';
// import { BrowseTasksAction } from '../states/browse-tasks.action';
// import {
//   BrowseTasksState,
//   BrowseTasksStateModel,
// } from '../states/browse-tasks.state';

import { ReopenAction } from '../../states/reopen.action';
import { ReopenState, ReopenStateModel } from '../../states/reopen.state';
@Component({
  selector: 'app-browse-tasks',
  templateUrl: './browse-tasks.component.html',
  styleUrls: ['./browse-tasks.component.scss'],
})
export class BrowseTasksComponent implements OnInit {
  public page$: Observable<IncidentTaskProjection[]>;
  @Select(TaskState.loading)
  public loading$: Observable<boolean>;
  @Select(TaskState.totalRecords)
  public totalRecords$: Observable<number>;
  @Select(ReopenState.state)
  public state$: Observable<ReopenStateModel>;

  @Select(CommonDataState.priorities)
  public priorities$: Observable<any[]>;

  @Select(ReopenState.hasTaskFilters)
  public hasFilters$: Observable<boolean>;

  @Select(CommonDataState.taskStatuses)
  public statuses$: Observable<any[]>;

  private destroy$ = new Subject();

  public type$: Observable<string>;
  public sortableColumns$ = this.langFacade.vm$.pipe(
    map(({ ActiveLang: { key } }) => {
      return [
        {
          name: 'TASK.TASK_ID',
          code: 'id',
        },

        {
          name: 'INCIDENTS.SERIAL',
          code: 'serial',
        },

        { name: 'SHARED.DUE_DATE', code: 'dueDate' },
        { name: 'SHARED.STATUS', code: 'status' },
        {
          name: 'SHARED.ASSIGNEE',
          code: `assignee`,
        },
      ];
    })
  );

  public columns = [
    {
      name: 'TASK.TASK_ID',
      code: 'id',
    },

    {
      name: 'INCIDENTS.SERIAL',
      code: 'serial',
    },

    { name: 'SHARED.DUE_DATE', code: 'dueDate' },
    { name: 'SHARED.STATUS', code: 'status' },
    {
      name: 'SHARED.ASSIGNEE',
      code: `assignee`,
    },
  ];
  /**
   *
   */
  constructor(
    private store: Store,
    private translate: TranslateService,
    private messageHelper: MessageHelper,
    private breakpointObserver: BreakpointObserver,
    private langFacade: ILangFacade,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.type$ = this.route.queryParams.pipe(
      map((params) => params['task_type'])
    );

    this.page$ = this.store.select(TaskState.page).pipe(filter((p) => !!p));
  }

  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }
    const keys = Object.keys(filter);

    this.store
      .dispatch(new ReopenAction.UpdateTasksFilter(filter))
      .toPromise()
      .then(() => {
        if (filter.type) {
          this.search();
        }
      });
  }
  search() {
    this.store.dispatch(new ReopenAction.LoadTasksPage());
  }
  clear() {
    this.store.dispatch([
      new ReopenAction.UpdateTasksFilter({ clear: true }),
      new ReopenAction.LoadTasksPage(),
    ]);
  }

  sort(event) {
    this.store.dispatch(new ReopenAction.SortTasks({ field: event.value }));
  }
  changeColumns(event) {
    this.store.dispatch(
      new ReopenAction.ChangeColumns({ columns: event.value })
    );
  }

  order(event) {
    this.store.dispatch(
      new ReopenAction.SortTasks({ order: event.checked ? 'desc' : 'asc' })
    );
  }

  reOpenTask(id: number) {
    this.store
      .dispatch(new ReopenAction.reOpenTask({ taskId: id }))
      .toPromise()
      .then(() => {
        this.search();
      });
  }
  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new ReopenAction.LoadTasksPage({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }
}
