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
import { filter, map, takeUntil } from 'rxjs/operators';
import { IncidentTaskProjection } from 'src/app/api/models';
import { BrowseTasksAction } from '../states/browse-tasks.action';
import {
  BrowseTasksState,
  BrowseTasksStateModel,
} from '../states/browse-tasks.state';

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
  @Select(BrowseTasksState.state)
  public state$: Observable<BrowseTasksStateModel>;

  @Select(BrowseTasksState.hasFilters)
  public hasFilters$: Observable<boolean>;

  @Select(CommonDataState.priorities)
  public priorities$: Observable<any[]>;

  @Select(CommonDataState.taskStatuses)
  public statuses$: Observable<any[]>;

  public filterStatuses$: Observable<any[]>;

  private destroy$ = new Subject();

  public sortableColumns$ = this.langFacade.vm$.pipe(
    map(({ ActiveLang: { key } }) => {
      return [
        {
          name: 'SHARED.TITLE',
          code: 'title',
        },
        { name: 'SHARED.INCIDENT_ID', code: 'incident.id' },
        { name: 'SHARED.PRIORITY', code: 'priority' },
        { name: 'SHARED.DUE_DATE', code: 'dueDate' },
        { name: 'SHARED.STATUS', code: 'status.id' },
        {
          name: 'SHARED.CREATED_BY',
          code: `createdBy.firstName${key[0].toUpperCase()}${
            key[1]
          },createdBy.middleName${key[0].toUpperCase()}${
            key[1]
          },createdBy.lastName${key[0].toUpperCase()}${key[1]}`,
        },
      ];
    })
  );

  public columns = [
    {
      name: 'SHARED.TITLE',
      code: 'title',
      disabled: true,
    },
    {
      name: 'SHARED.DESC',
      code: 'desc',
      disabled: true,
    },
    { name: 'SHARED.INCIDENT_ID', code: 'incidentId' },
    { name: 'SHARED.PRIORITY', code: 'priority' },
    { name: 'SHARED.DUE_DATE', code: 'dueDate' },
    { name: 'SHARED.STATUS', code: 'status' },
    { name: 'SHARED.CREATED_BY', code: 'createdBy' },
    { name: 'SHARED.ASSIGNEE', code: 'assignee' },
  ];
  public type$: Observable<string>;
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
    this.type$ = this.route.queryParams.pipe(map((params) => params['_type']));
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        takeUntil(this.destroy$),
        filter((c) => c.matches)
      )
      .subscribe(() => {
        this.changeView('CARDS');
      });
    this.filterStatuses$ = this.statuses$.pipe(
      map(statuses => statuses.filter(status => status.id !== 8))
    );
    const taskActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
      // {
      //   label: this.translate.instant('ACTIONS.ACTIVATE'),
      //   icon: 'pi pi-check-square',
      // },
    ] as MenuItem[];

    this.page$ = this.store.select(TaskState.page).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...taskActions[0],
                command: () => {
                  this.openDialog(u.id);
                },
                // disabled: !u.isActive,
              },
              // {
              //   ...taskActions[1],
              //   command: () => {
              //     this.activate(u.id);
              //   },
              //   // disabled: u.isActive,
              // },
            ],
          };
        })
      )
    );
  }

  activate(id: number) {
    this.messageHelper.confirm({
      summary: 'SHARED.DIALOG.ARE_YOU_SURE',
      detail: 'SHARED.DIALOG.ACTIVATE.MESSAGE',
      yesCommand: () => {
        this.store.dispatch(new TaskAction.Activate({ id }));
        this.messageHelper.closeConfirm();
      },
      noCommand: () => {
        this.messageHelper.closeConfirm();
      },
    });
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseTasksAction.ToggleDialog({ taskId: id }));
  }

  search() {
    this.store.dispatch(new BrowseTasksAction.LoadTasks());
  }

  clear() {
    this.store.dispatch([
      new BrowseTasksAction.UpdateFilter({ clear: true }),
      new BrowseTasksAction.LoadTasks(),
    ]);
  }

  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }
    const keys = Object.keys(filter);
    if (keys.length > 0) {
      switch (keys[0]) {
        case 'orgIds':
          filter['orgIds'] = filter['orgIds']
            .map((o) => {
              return {
                key: o?.key,
                labelEn: o.labelEn,
                labelAr: o.labelAr,
              };
            })
            .filter((id) => ![undefined, null].includes(id));
          break;

        default:
          break;
      }
    }

    this.store
      .dispatch(new BrowseTasksAction.UpdateFilter(filter))
      .toPromise()
      .then(() => {
        if (filter.type) {
          this.search();
        }
      });
  }

  changeColumns(event) {
    this.store.dispatch(
      new BrowseTasksAction.ChangeColumns({ columns: event.value })
    );
  }

  changeView(view: 'TABLE' | 'CARDS') {
    this.store.dispatch(new BrowseTasksAction.ChangeView({ view }));
  }

  sort(event) {
    this.store.dispatch(
      new BrowseTasksAction.SortTasks({ field: event.value })
    );
  }

  order(event) {
    this.store.dispatch(
      new BrowseTasksAction.SortTasks({ order: event.checked ? 'desc' : 'asc' })
    );
  }

  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseTasksAction.LoadTasks({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }
}
