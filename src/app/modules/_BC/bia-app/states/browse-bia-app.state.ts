import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelper } from '@core/helpers/api.helper';
import { MessageHelper } from '@core/helpers/message.helper';
import { PageRequestModel } from '@core/models/page-request.model';
import { TextUtils } from '@core/utils';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { iif, patch } from '@ngxs/store/operators';
import { BrowseBiaAppAction } from './browse-bia-app.action';
import { BiaAction } from '@core/states/bia-apps/bia-apps.action';
import { ImapactAnalysisAction } from '@core/states/impact-analysis/impact-analysis.action';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BrowseBCStateModel } from '../../states/browse-bc.state';

export interface BrowseBiaAppStateModel {
  pageRequest: PageRequestModel;
  cyclePageRequest?: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_BIA_APP_UI_STATE_TOKEN =
  new StateToken<BrowseBiaAppStateModel>('browse_bia_app');

@State<BrowseBiaAppStateModel>({
  name: BROWSE_BIA_APP_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    cyclePageRequest: {
      filters: {},
      first: 0,
      rows: 50,
    },
    columns: [
      'application',
      'divisionName',
      'cycle',
      'analysisCyclePercentage',
      'state',
    ],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseBiaAppState {
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
  @Selector([BrowseBiaAppState])
  static state(state: BrowseBiaAppState): BrowseBiaAppState {
    return state;
  }

  @Selector([BrowseBiaAppState])
  static hasFilters(state: BrowseBiaAppStateModel): boolean {
    return (
      Object.keys(state.pageRequest.filters).filter(
        (k) =>
          k !== 'type' &&
          !TextUtils.IsEmptyOrWhiteSpaces(state.pageRequest.filters[k])
      ).length > 0
    );
  }
  /* ********************** ACTIONS ************************* */
  @Action(BrowseBiaAppAction.LoadBia)
  loadBia(
    { setState, dispatch, getState }: StateContext<BrowseBiaAppStateModel>,
    { payload }: BrowseBiaAppAction.LoadBia
  ) {
    setState(
      patch<BrowseBiaAppStateModel>({
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
      new BiaAction.LoadPage({
        cycleId: payload.cycleId,
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
        },
      })
    );
  }

  @Action(BrowseBiaAppAction.SortBia)
  sortBia(
    { setState, dispatch, getState }: StateContext<BrowseBiaAppStateModel>,
    { payload }: BrowseBiaAppAction.SortBia
  ) {
    setState(
      patch<BrowseBiaAppStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new BiaAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        cycleId: payload?.cycle['id'],
        filters: {
          ...pageRequest.filters,
          orgHierarchyId: pageRequest.filters.orgHierarchyId?.id,
        },
      })
    );
  }

  @Action(BrowseBiaAppAction.LoadActivitiesStatuses)
  LoadActivitiesStatuses(
    { dispatch }: StateContext<BrowseBiaAppStateModel>,
    {}: BrowseBiaAppAction.LoadActivitiesStatuses
  ) {
    return dispatch(new ImapactAnalysisAction.LoadActivitiesStatuses());
  }

  @Action(BrowseBiaAppAction.LoadCycles)
  LoadCycles(
    { dispatch, getState, setState }: StateContext<BrowseBiaAppStateModel>,
    { payload }: BrowseBiaAppAction.LoadCycles
  ) {
    setState(
      patch<BrowseBiaAppStateModel>({
        cyclePageRequest: iif(
          (v) => !!v,
          patch({
            first: iif(
              (_) => !!payload?.pageRequest,
              payload?.pageRequest?.first
            ),
            rows: iif(
              (_) => !!payload?.pageRequest,
              payload?.pageRequest?.rows
            ),
          }),
          {
            first: 0,
            rows: 50,
          }
        ),
      })
    );
    const pageRequest = getState().cyclePageRequest;
    return dispatch(
      new ImapactAnalysisAction.LoadCycles({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
        },
      })
    );
  }

  @Action(BrowseBiaAppAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseBiaAppStateModel>,
    { payload }: BrowseBiaAppAction.ChangeColumns
  ) {
    setState(
      patch<BrowseBiaAppStateModel>({
        columns: payload.columns,
      })
    );
  }

  @Action(BrowseBiaAppAction.ChangeView)
  changeView(
    { setState }: StateContext<BrowseBiaAppStateModel>,
    { payload }: BrowseBiaAppAction.ChangeView
  ) {
    setState(
      patch<BrowseBiaAppStateModel>({
        view: payload.view,
      })
    );
  }

  @Action(BrowseBiaAppAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowseBiaAppStateModel>,
    { payload }: BrowseBiaAppAction.UpdateFilter
  ) {
    setState(
      patch<BrowseBiaAppStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: 0,
          filters: iif(
            payload.clear === true,
            {},
            patch({
              ...payload,
            })
          ),
        }),
      })
    );
  }

  @Action(BrowseBiaAppAction.CreateCycle)
  CreateCycle(
    { dispatch }: StateContext<BrowseBiaAppStateModel>,
    { payload }: BrowseBiaAppAction.CreateCycle
  ) {
    return dispatch(new ImapactAnalysisAction.CreateCycle(payload.form)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseBiaAppAction.LoadBia({
            pageRequest: undefined,
            cycleId: payload.cycle,
          }),
          new BrowseBiaAppAction.LoadCycles({}),
          new BrowseBiaAppAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseBiaAppAction.ToggleDialog, {
    cancelUncompleted: true,
  })
  openDialog(
    {}: StateContext<BrowseBiaAppStateModel>,
    { payload }: BrowseBiaAppAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == payload?.dialog
            ? undefined
            : payload?.dialog,
        _id: payload.id,
        _cycleId: payload.cycle,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseBiaAppAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseBiaAppStateModel>,
    { payload }: BrowseBiaAppAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.BiaId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseBiaAppAction.UpdateCycle, {
    cancelUncompleted: true,
  })
  updateCycle(
    { getState }: StateContext<BrowseBiaAppStateModel>,
    { payload }: BrowseBiaAppAction.UpdateCycle
  ) {
    this.router.navigate([], {
      queryParams: {
        _cycle: payload.cycle,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseBiaAppAction.SetCycleActivities)
  SetCycleActivities(
    { dispatch, getState }: StateContext<BrowseBiaAppStateModel>,
    { payload }: BrowseBiaAppAction.SetCycleActivities
  ) {
    return dispatch(new ImapactAnalysisAction.SetCycleActivities(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseBiaAppAction.LoadBia(),
          new BrowseBiaAppAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseBiaAppAction.SortCycle)
  sortCycle(
    { setState, dispatch, getState }: StateContext<BrowseBiaAppStateModel>,
    { payload }: BrowseBiaAppAction.SortCycle
  ) {
    setState(
      patch<BrowseBiaAppStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new ImapactAnalysisAction.LoadCycles({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
      })
    );
  }
  @Action(BrowseBiaAppAction.Delete)
  Delete(
    { dispatch }: StateContext<BrowseBiaAppStateModel>,
    { payload }: BrowseBiaAppAction.Delete
  ) {
    return dispatch(new BiaAction.Delete(payload)).pipe(
      tap(() => {
        dispatch(new ImapactAnalysisAction.LoadCycles());
        this.messageHelper.success();
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseBiaAppAction.ChangeCycleStatus)
  ChangeStatus(
    { dispatch }: StateContext<BrowseBCStateModel>,
    { payload }: BrowseBiaAppAction.ChangeCycleStatus
  ) {
    return dispatch(
      new ImapactAnalysisAction.CycleStatus({
        cycleId: payload.cycleId,
        statusId: payload.statusId,
      })
    ).pipe(
      tap(() => {
        dispatch([
          new ImapactAnalysisAction.LoadCycles(),
          new ImapactAnalysisAction.GetCycle({ id: payload.cycleId }),
        ]);
        this.messageHelper.success();
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
}
