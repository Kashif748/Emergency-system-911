import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelper } from '@core/helpers/api.helper';
import { MessageHelper } from '@core/helpers/message.helper';
import { PageRequestModel } from '@core/models/page-request.model';
import { IncidentAction, TaskAction } from '@core/states';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { patch, iif } from '@ngxs/store/operators';
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ReopenAction } from './reopen.action';

export interface ReopenStateModel {
  IncidentsPageRequest: PageRequestModel;
  TasksPageRequest: PageRequestModel;
  view: 'TABLE' | 'CARDS';
  tab: 'INCIDENTS' | 'TASKS';
}

export const BROWSE_INCIDENTS_UI_STATE_TOKEN = new StateToken<ReopenStateModel>(
  'browse_incidents'
);

@State<ReopenStateModel>({
  name: BROWSE_INCIDENTS_UI_STATE_TOKEN,
  defaults: {
    IncidentsPageRequest: {
      filters: {
        status: [{ id: 2 },{ id: 3 }, { id: 4 }],
      },
      first: 0,
      rows: 10,
      sortField: 'createdDate',
      sortOrder: 'desc',
    },

    TasksPageRequest: {
      filters: {
        status: [{ id: 4 },  { id: 7 }],
      },
      first: 0,
      rows: 10,
      sortField: 'createdOn',
      sortOrder: 'desc',
    },

    view: 'TABLE',
    tab :'INCIDENTS',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class ReopenState {
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
  @Selector([ReopenState])
  static state(state: ReopenStateModel): ReopenStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ReopenAction.LoadIncidentsPage)
  LoadIncidentsPage(
    { setState, dispatch, getState }: StateContext<ReopenStateModel>,
    { payload }: ReopenAction.LoadIncidentsPage
  ) {
    setState(
      patch<ReopenStateModel>({
        IncidentsPageRequest: patch<PageRequestModel>({
          first: iif(
            (_) => !!payload?.pageRequest,
            payload?.pageRequest?.first
          ),
          rows: iif((_) => !!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().IncidentsPageRequest;
    return dispatch(
      new IncidentAction.LoadPage({
        first: this.apiHelper.page(pageRequest),
        rows: pageRequest.rows,
        filters: {
          ...pageRequest.filters,
          status: pageRequest.filters.status?.map((o) => o.id),
        },
      })
    );
  }

  @Action(ReopenAction.reOpenIncidint)
  reOpenIncidint(
    { setState, dispatch, getState }: StateContext<ReopenStateModel>,
    { payload }: ReopenAction.reOpenIncidint
  ) {
    const pageRequest = getState().IncidentsPageRequest;
    return dispatch(
      new IncidentAction.reOpenIncident({ incidentId: payload.incidentId })
    );
  }

  @Action(ReopenAction.LoadTasksPage)
  LoadTasksPage(
    { setState, dispatch, getState }: StateContext<ReopenStateModel>,
    { payload }: ReopenAction.LoadTasksPage
  ) {
    setState(
      patch<ReopenStateModel>({
        TasksPageRequest: patch<PageRequestModel>({
          first: iif(
            (_) => !!payload?.pageRequest,
            payload?.pageRequest?.first
          ),
          rows: iif((_) => !!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().TasksPageRequest;
    return dispatch(
      new TaskAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
          status: pageRequest.filters.status?.map((o) => o.id),
        },
      })
    );
  }

  @Action(ReopenAction.UpdateTasksFilter, { cancelUncompleted: true })
  UpdateTasksFilter(
    { setState }: StateContext<ReopenStateModel>,
    { payload }: ReopenAction.UpdateTasksFilter
  ) {
    setState(
      patch<ReopenStateModel>({
        TasksPageRequest: patch<PageRequestModel>({
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

    return this.router.navigate([], {
      queryParams: {
        task_type: payload?.type,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(ReopenAction.reOpenTask)
  reOpenTask(
    { setState, dispatch, getState }: StateContext<ReopenStateModel>,
    { payload }: ReopenAction.reOpenTask
  ) {
    const pageRequest = getState().TasksPageRequest;
    return dispatch(new TaskAction.reOpenTask({ taskId: payload.taskId }));
  }

  @Action(ReopenAction.ChangeTab)
  changeTab(
    { setState }: StateContext<ReopenStateModel>,
    { payload }: ReopenAction.ChangeTab
  ) {
    setState(
      patch<ReopenStateModel>({
        tab: payload.tab,
      })
    );
  }
}
