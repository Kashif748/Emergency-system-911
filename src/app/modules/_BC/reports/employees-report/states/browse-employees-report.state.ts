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
import { BrowseEmployeesReportAction } from './browse-employees-report.action';
import { EmployeesReportAction } from '@core/states/bc-reports/employees-report/employees-report.action';
import {BrowseOrgActivityStateModel, BrowseOrganizationState} from "../../../organization-activities/states/browse-organization.state";
import {TextUtils} from "@core/utils";

export interface BrowseEmployeesReportStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_EMPLOYEES_REPORT_UI_STATE_TOKEN =
  new StateToken<BrowseEmployeesReportStateModel>('browse_employees_report');

@State<BrowseEmployeesReportStateModel>({
  name: BROWSE_EMPLOYEES_REPORT_UI_STATE_TOKEN,
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
      'name',
      'type',
      'landline',
      'mobile',
      'alternative',
      'email',
      'criticality',
    ],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseEmployeesReportState {
  /**
   *
   */
  constructor(private apiHelper: ApiHelper, private store: Store) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseEmployeesReportState])
  static state(
    state: BrowseEmployeesReportStateModel
  ): BrowseEmployeesReportStateModel {
    return state;
  }
  @Selector([BrowseEmployeesReportState])
  static hasFilters(state: BrowseEmployeesReportStateModel): boolean {
    return (
      Object.keys(state.pageRequest.filters).filter(
        (k) =>
          k !== 'type' &&
          !TextUtils.IsEmptyOrWhiteSpaces(state.pageRequest.filters[k])
      ).length > 0
    );
  }
  /* ********************** ACTIONS ************************* */

  @Action(BrowseEmployeesReportAction.LoadEmployeesReport)
  LoadEmployeesReport(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseEmployeesReportStateModel>,
    { payload }: BrowseEmployeesReportAction.LoadEmployeesReport
  ) {
    setState(
      patch<BrowseEmployeesReportStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new EmployeesReportAction.LoadPage({
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
  @Action(BrowseEmployeesReportAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseEmployeesReportStateModel>,
    { payload }: BrowseEmployeesReportAction.ChangeColumns
  ) {
    setState(
      patch<BrowseEmployeesReportStateModel>({
        columns: payload.columns,
      })
    );
  }
  @Action(BrowseEmployeesReportAction.Export, { cancelUncompleted: true })
  export(
    { getState, dispatch }: StateContext<BrowseEmployeesReportStateModel>,
    { payload }: BrowseEmployeesReportAction.Export
  ) {
    const pageRequest = getState().pageRequest;
    return dispatch(
      new EmployeesReportAction.Export({
        type: payload.type,
        filters: {
          ...pageRequest.filters,
          orgHierarchyId: pageRequest?.filters?.orgHierarchyId?.key,
        },
      })
    );
  }
  @Action(BrowseEmployeesReportAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowseEmployeesReportStateModel>,
    { payload }: BrowseEmployeesReportAction.UpdateFilter
  ) {
    setState(
      patch<BrowseEmployeesReportStateModel>({
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
  @Action(BrowseEmployeesReportAction.Sort)
  sortLocation(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseEmployeesReportStateModel>,
    { payload }: BrowseEmployeesReportAction.Sort
  ) {
    setState(
      patch<BrowseEmployeesReportStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new EmployeesReportAction.LoadPage({
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
