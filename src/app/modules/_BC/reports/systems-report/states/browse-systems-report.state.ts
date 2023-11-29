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
import { BrowseSystemsReportAction } from './browse-systems-report.action';
import { SystemsReportAction } from '@core/states/bc-reports/systems-report/systems-report.action';

export interface BrowseSystemsReportStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_SYSTEMS_REPORT_UI_STATE_TOKEN =
  new StateToken<BrowseSystemsReportStateModel>('browse_systems_report');

@State<BrowseSystemsReportStateModel>({
  name: BROWSE_SYSTEMS_REPORT_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {
        isCritical: null,
      },
      first: 0,
      rows: 10,
    },
    columns: ['name', 'criticality', 'activity', 'division'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseSystemsReportState {
  /**
   *
   */
  constructor(private apiHelper: ApiHelper, private store: Store) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseSystemsReportState])
  static state(
    state: BrowseSystemsReportStateModel
  ): BrowseSystemsReportStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */

  @Action(BrowseSystemsReportAction.LoadSystemsReport)
  LoadEmployees(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseSystemsReportStateModel>,
    { payload }: BrowseSystemsReportAction.LoadSystemsReport
  ) {
    setState(
      patch<BrowseSystemsReportStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new SystemsReportAction.LoadPage({
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
  @Action(BrowseSystemsReportAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseSystemsReportStateModel>,
    { payload }: BrowseSystemsReportAction.ChangeColumns
  ) {
    setState(
      patch<BrowseSystemsReportStateModel>({
        columns: payload.columns,
      })
    );
  }
  @Action(BrowseSystemsReportAction.Export, { cancelUncompleted: true })
  export(
    { getState, dispatch }: StateContext<BrowseSystemsReportStateModel>,
    { payload }: BrowseSystemsReportAction.Export
  ) {
    const pageRequest = getState().pageRequest;
    return dispatch(
      new SystemsReportAction.Export({
        type: payload.type,
        filters: {
          ...pageRequest.filters,
          orgHierarchyId: pageRequest?.filters?.orgHierarchyId?.key,
        },
      })
    );
  }
  @Action(BrowseSystemsReportAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowseSystemsReportStateModel>,
    { payload }: BrowseSystemsReportAction.UpdateFilter
  ) {
    setState(
      patch<BrowseSystemsReportStateModel>({
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
  @Action(BrowseSystemsReportAction.Sort)
  sortLocation(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseSystemsReportStateModel>,
    { payload }: BrowseSystemsReportAction.Sort
  ) {
    setState(
      patch<BrowseSystemsReportStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new SystemsReportAction.LoadPage({
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
