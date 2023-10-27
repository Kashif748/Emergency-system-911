import { PageRequestModel } from '@core/models/page-request.model';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { iif, patch } from '@ngxs/store/operators';
import { ApiHelper } from '@core/helpers/api.helper';

import { BrowseAnalysisSummaryAction } from './browse-summary.action';
import { ActivitySummaryAction } from '@core/states/activity-analysis/analysis-summary/analysis-summary.action';

export interface BrowseAnalysisSummaryStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_ANALYSIS_SUMMARY_UI_STATE_TOKEN =
  new StateToken<BrowseAnalysisSummaryStateModel>('browse_analysis_summary');

@State<BrowseAnalysisSummaryStateModel>({
  name: BROWSE_ANALYSIS_SUMMARY_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {
        isCritical: null,
      },
      first: 0,
      rows: 10,
    },
    columns: [
      'sector',
      'division',
      'section',
      'activity',
      'criticality',
      'rto',
      'capacity',
      'recoveryPrioritySequence',
    ],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseAnalysisSummaryState {
  /**
   *
   */
  constructor(private apiHelper: ApiHelper, private store: Store) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseAnalysisSummaryState])
  static state(
    state: BrowseAnalysisSummaryStateModel
  ): BrowseAnalysisSummaryStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */

  @Action(BrowseAnalysisSummaryAction.LoadAnalysisSummary)
  LoadEmployees(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseAnalysisSummaryStateModel>,
    { payload }: BrowseAnalysisSummaryAction.LoadAnalysisSummary
  ) {
    setState(
      patch<BrowseAnalysisSummaryStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new ActivitySummaryAction.LoadPage({
        filters: {
          ...pageRequest.filters,
          orgHierarchyId: pageRequest?.filters?.orgHierarchyId?.key,
        },
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
      })
    );
  }
  @Action(BrowseAnalysisSummaryAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseAnalysisSummaryStateModel>,
    { payload }: BrowseAnalysisSummaryAction.ChangeColumns
  ) {
    setState(
      patch<BrowseAnalysisSummaryStateModel>({
        columns: payload.columns,
      })
    );
  }
  @Action(BrowseAnalysisSummaryAction.Export, { cancelUncompleted: true })
  export(
    { getState, dispatch }: StateContext<BrowseAnalysisSummaryStateModel>,
    { payload }: BrowseAnalysisSummaryAction.Export
  ) {
    const pageRequest = getState().pageRequest;
    return dispatch(
      new ActivitySummaryAction.Export({
        type: payload.type,
        filters: {
          ...pageRequest.filters,
          orgHierarchyId: pageRequest?.filters?.orgHierarchyId?.key,
        },
      })
    );
  }
  @Action(BrowseAnalysisSummaryAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowseAnalysisSummaryStateModel>,
    { payload }: BrowseAnalysisSummaryAction.UpdateFilter
  ) {
    setState(
      patch<BrowseAnalysisSummaryStateModel>({
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

  @Action(BrowseAnalysisSummaryAction.SortActivities)
  sortLocation(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseAnalysisSummaryStateModel>,
    { payload }: BrowseAnalysisSummaryAction.SortActivities
  ) {
    setState(
      patch<BrowseAnalysisSummaryStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new ActivitySummaryAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
        },
      })
    );
  }
}
