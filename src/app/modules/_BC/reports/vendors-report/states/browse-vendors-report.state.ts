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
import { BrowseVendorsReportAction } from './browse-vendors-report.action';
import { VendorsReportAction } from '@core/states/bc-reports/vendors-report/vendors-report.action';

export interface BrowseVendorsReportStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_VENDORS_REPORT_UI_STATE_TOKEN =
  new StateToken<BrowseVendorsReportStateModel>('browse_vendors_report');

@State<BrowseVendorsReportStateModel>({
  name: BROWSE_VENDORS_REPORT_UI_STATE_TOKEN,
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
      'vendor',
      'contact',
      'supplies',
      'primary_contact',
      'secondary_contact',
      'criticality',
    ],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseVendorsReportState {
  /**
   *
   */
  constructor(private apiHelper: ApiHelper, private store: Store) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseVendorsReportState])
  static state(
    state: BrowseVendorsReportStateModel
  ): BrowseVendorsReportStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */

  @Action(BrowseVendorsReportAction.LoadVendorsReport)
  LoadVendorsReport(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseVendorsReportStateModel>,
    { payload }: BrowseVendorsReportAction.LoadVendorsReport
  ) {
    setState(
      patch<BrowseVendorsReportStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new VendorsReportAction.LoadPage({
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
  @Action(BrowseVendorsReportAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseVendorsReportStateModel>,
    { payload }: BrowseVendorsReportAction.ChangeColumns
  ) {
    setState(
      patch<BrowseVendorsReportStateModel>({
        columns: payload.columns,
      })
    );
  }
  @Action(BrowseVendorsReportAction.Export, { cancelUncompleted: true })
  export(
    { getState, dispatch }: StateContext<BrowseVendorsReportStateModel>,
    { payload }: BrowseVendorsReportAction.Export
  ) {
    const pageRequest = getState().pageRequest;
    return dispatch(
      new VendorsReportAction.Export({
        type: payload.type,
        filters: {
          ...pageRequest.filters,
          orgHierarchyId: pageRequest?.filters?.orgHierarchyId?.key,
        },
      })
    );
  }
  @Action(BrowseVendorsReportAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowseVendorsReportStateModel>,
    { payload }: BrowseVendorsReportAction.UpdateFilter
  ) {
    setState(
      patch<BrowseVendorsReportStateModel>({
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
  @Action(BrowseVendorsReportAction.Sort)
  sortLocation(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseVendorsReportStateModel>,
    { payload }: BrowseVendorsReportAction.Sort
  ) {
    setState(
      patch<BrowseVendorsReportStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new VendorsReportAction.LoadPage({
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
