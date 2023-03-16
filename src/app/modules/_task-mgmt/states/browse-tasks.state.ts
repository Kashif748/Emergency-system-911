import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelper } from '@core/helpers/api.helper';
import { MessageHelper } from '@core/helpers/message.helper';
import { PageRequestModel } from '@core/models/page-request.model';
import { TaskAction } from '@core/states';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { patch, iif } from '@ngxs/store/operators';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BrowseTasksAction } from './browse-tasks.action';

export interface BrowseTasksStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_TASKS_UI_STATE_TOKEN =
  new StateToken<BrowseTasksStateModel>('browse_tasks');

@State<BrowseTasksStateModel>({
  name: BROWSE_TASKS_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {
        status: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 5 }, { id: 6 }],
      },
      first: 0,
      rows: 10,
      sortField: 'dueDate',
      sortOrder: 'desc',
    },
    columns: [
      'title',
      'desc',
      'incidentId',
      'priority',
      'dueDate',
      'status',
      'assignee',
      'createdBy',
    ],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseTasksState {
  /**
   *
   */
  constructor(
    private apiHelper: ApiHelper,
    private messageHelper: MessageHelper,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([BrowseTasksState])
  static state(state: BrowseTasksStateModel): BrowseTasksStateModel {
    return state;
  }

  @Selector([BrowseTasksState])
  static hasFilters(state: BrowseTasksStateModel): boolean {
    return (
      Object.keys(state.pageRequest.filters).filter((k) => k !== 'type')
        .length > 0
    );
  }
  /* ********************** ACTIONS ************************* */
  @Action(BrowseTasksAction.LoadTasks)
  loadTasks(
    { setState, dispatch, getState }: StateContext<BrowseTasksStateModel>,
    { payload }: BrowseTasksAction.LoadTasks
  ) {
    setState(
      patch<BrowseTasksStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(
            (_) => !!payload?.pageRequest,
            payload?.pageRequest?.first
          ),
          rows: iif((_) => !!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new TaskAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
          priority: pageRequest.filters.priority?.id,
          status: pageRequest.filters.status?.map((o) => o.id),
          type: this.route.snapshot.queryParams['_type'],
        },
      })
    );
  }

  @Action(BrowseTasksAction.SortTasks)
  sortTasks(
    { setState, dispatch, getState }: StateContext<BrowseTasksStateModel>,
    { payload }: BrowseTasksAction.SortTasks
  ) {
    setState(
      patch<BrowseTasksStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new TaskAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
          priority: pageRequest.filters.priority?.id,
          status: pageRequest.filters.status?.map((o) => o.id),
          type: this.route.snapshot.queryParams['_type'],
        },
      })
    );
  }

  @Action(BrowseTasksAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseTasksStateModel>,
    { payload }: BrowseTasksAction.ChangeColumns
  ) {
    setState(
      patch<BrowseTasksStateModel>({
        columns: payload.columns,
      })
    );
  }

  @Action(BrowseTasksAction.ChangeView)
  changeView(
    { setState }: StateContext<BrowseTasksStateModel>,
    { payload }: BrowseTasksAction.ChangeView
  ) {
    setState(
      patch<BrowseTasksStateModel>({
        view: payload.view,
      })
    );
  }

  @Action(BrowseTasksAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowseTasksStateModel>,
    { payload }: BrowseTasksAction.UpdateFilter
  ) {
    setState(
      patch<BrowseTasksStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: 0,
          filters: iif(
            payload.clear === true,
            {},
            patch({
              ...payload,
              type: undefined,
            })
          ),
        }),
      })
    );

    if (payload?.type) {
      return this.router.navigate([], {
        queryParams: {
          _type: payload?.type,
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  @Action(BrowseTasksAction.CreateTask)
  createTask(
    { dispatch }: StateContext<BrowseTasksStateModel>,
    { payload }: BrowseTasksAction.CreateTask
  ) {
    return dispatch(new TaskAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseTasksAction.LoadTasks());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return throwError(err);
      })
    );
  }

  @Action(BrowseTasksAction.UpdateTask)
  updateTask(
    { dispatch }: StateContext<BrowseTasksStateModel>,
    { payload }: BrowseTasksAction.UpdateTask
  ) {
    return dispatch(new TaskAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseTasksAction.LoadTasks());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return throwError(err);
      })
    );
  }

  @Action(BrowseTasksAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseTasksStateModel>,
    { payload }: BrowseTasksAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.taskId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseTasksAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseTasksStateModel>,
    { payload }: BrowseTasksAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.taskId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
