import {PageRequestModel} from '@core/models/page-request.model';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken,} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {MessageHelper} from '@core/helpers/message.helper';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiHelper} from '@core/helpers/api.helper';
import {TextUtils} from '@core/utils';
import {iif, patch} from '@ngxs/store/operators';
import {BrowseImpactAnalysisAction} from './browse-impact-analysis.action';
import {ImapactAnalysisAction} from '@core/states/impact-analysis/impact-analysis.action';
import {catchError, finalize, tap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {RtoAction} from "@core/states/bc/rto/rto.action";
import {BrowseRtoStateModel} from "../../bc-lists/rto/states/browse-rto.state";
import {BrowseRtoAction} from "../../bc-lists/rto/states/browse-rto.action";

export interface BrowseImpactAnalysisStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_IMPACT_ANALYSIS_UI_STATE_TOKEN =
  new StateToken<BrowseImpactAnalysisStateModel>('browse_impact_analysis');

@State<BrowseImpactAnalysisStateModel>({
  name: BROWSE_IMPACT_ANALYSIS_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: [
      'activityName',
      'activityFrequency',
      'analysisCycle',
      'rto',
      'priorityLevel',
      'status',
    ],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseImpactAnalysisState {
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
  @Selector([BrowseImpactAnalysisState])
  static state(
    state: BrowseImpactAnalysisStateModel
  ): BrowseImpactAnalysisStateModel {
    return state;
  }

  @Selector([BrowseImpactAnalysisState])
  static hasFilters(state: BrowseImpactAnalysisStateModel): boolean {
    const filters = state.pageRequest.filters;
    return !('orgHierarchyId' in filters && 'cycleId' in filters) ||
      (Object.keys(filters).filter(
        (k) =>
          k !== 'active' &&
          k !== 'orgHierarchyId' &&
          k !== 'cycleId' &&
          !TextUtils.IsEmptyOrWhiteSpaces(filters[k])
      ).length > 0
      );
  }


  /* ********************** ACTIONS ************************* */
  @Action(BrowseImpactAnalysisAction.LoadPage)
  LoadPage(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.LoadPage
  ) {
    setState(
      patch<BrowseImpactAnalysisStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new ImapactAnalysisAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
          orgHierarchyId: pageRequest?.filters?.orgHierarchyId?.id,
        },
      })
    );
  }
  @Action(BrowseImpactAnalysisAction.Sort)
  sort(
    { setState, dispatch, getState }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.Sort
  ) {
    setState(
      patch<BrowseImpactAnalysisStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new ImapactAnalysisAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
        },
      })
    );
  }

  @Action(BrowseImpactAnalysisAction.LoadActivitiesStatuses)
  LoadActivitiesStatuses(
    { dispatch }: StateContext<BrowseImpactAnalysisStateModel>,
    {}: BrowseImpactAnalysisAction.LoadActivitiesStatuses
  ) {
    return dispatch(new ImapactAnalysisAction.LoadActivitiesStatuses());
  }

  @Action(BrowseImpactAnalysisAction.LoadCycles)
  LoadCycles(
    { dispatch }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.LoadCycles
  ) {
    return dispatch(
      new ImapactAnalysisAction.LoadCycles({
        page: payload?.page,
        size: payload.size,
      })
    );
  }

  @Action(BrowseImpactAnalysisAction.LoadAnalysisStatusInfo)
  loadAnalysisStatusInfo(
    { dispatch }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.LoadAnalysisStatusInfo
  ) {
    return dispatch(
      new ImapactAnalysisAction.LoadAnalysisStatusInfo({
        orgHierarchyId: payload.orgHierarchyId,
        cycleId: payload.cycleId,
      })
    );
  }

  @Action(BrowseImpactAnalysisAction.CreateCycle)
  CreateCycle(
    { dispatch, getState }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.CreateCycle
  ) {
    return dispatch(new ImapactAnalysisAction.CreateCycle(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseImpactAnalysisAction.LoadPage(),
          new BrowseImpactAnalysisAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseImpactAnalysisAction.SetCycleActivities)
  SetCycleActivities(
    { dispatch, getState }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.SetCycleActivities
  ) {
    return dispatch(new ImapactAnalysisAction.SetCycleActivities(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseImpactAnalysisAction.LoadPage(),
          new BrowseImpactAnalysisAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseImpactAnalysisAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState, getState }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.UpdateFilter
  ) {
    const currentState = getState();
    const updatedFilters = { orgHierarchyId : undefined , cycleId: undefined };
    if (payload.clear) {
      if (currentState.pageRequest.filters.orgHierarchyId) {
        updatedFilters.orgHierarchyId = currentState.pageRequest.filters.orgHierarchyId;
      }
      if (currentState.pageRequest.filters.cycleId) {
        updatedFilters.cycleId = currentState.pageRequest.filters.cycleId;
      }
    }
    setState(
      patch<BrowseImpactAnalysisStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: 0,
          filters: iif(
            payload.clear === true,
            updatedFilters,
            patch({
              ...payload,
            })
          ),
        }),
      })
    );
  }

  @Action(BrowseImpactAnalysisAction.UpdateBulkTransaction)
  updatebulk(
    { dispatch }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.UpdateBulkTransaction
  ) {
    return dispatch(new ImapactAnalysisAction.UpdateBulkTransaction(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        // dispatch(new BrowseRtoAction.LoadRto());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseImpactAnalysisAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseImpactAnalysisAction.ToggleDialog, {
    cancelUncompleted: true,
  })
  openDialog(
    {}: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.ToggleDialog
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

  @Action(BrowseImpactAnalysisAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.ChangeColumns
  ) {
    setState(
      patch<BrowseImpactAnalysisStateModel>({
        columns: payload.columns,
      })
    );
  }
  @Action(BrowseImpactAnalysisAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'activities',
        _id: payload.id,
        _cycleId: payload.cycle,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
