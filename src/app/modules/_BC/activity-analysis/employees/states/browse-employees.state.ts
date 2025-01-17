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
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from '@core/helpers/message.helper';
import { iif, patch } from '@ngxs/store/operators';
import { ApiHelper } from '@core/helpers/api.helper';

import { BrowseActivityEmployeesAction } from './browse-employees.action';
import { BrowseActivityAnalysisState } from '../../states/browse-activity-analysis.state';
import { ActivityEmployeesAction } from '@core/states/activity-analysis/employees/employees.action';
import { catchError, finalize, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import {BrowseStaffStateModel} from "../../../resouces/staff-requirement/states/browse-staff.state";
import {BrowseStaffAction} from "../../../resouces/staff-requirement/states/browse-staff.action";
import {StaffAction} from "@core/states/bc-resources/staff/staff.action";

export interface BrowseActivityEmployeesStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_EMPLOYEES_UI_STATE_TOKEN =
  new StateToken<BrowseActivityEmployeesStateModel>('browse_employees');

@State<BrowseActivityEmployeesStateModel>({
  name: BROWSE_EMPLOYEES_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: ['criticality', 'rtoEn', 'description'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseActivityEmployeesState {
  /**
   *
   */
  constructor(
    private messageHelper: MessageHelper,
    private router: Router,
    private apiHelper: ApiHelper,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseActivityEmployeesState])
  static state(
    state: BrowseActivityEmployeesStateModel
  ): BrowseActivityEmployeesStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */

  @Action(BrowseActivityEmployeesAction.LoadEmployees)
  LoadEmployees(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseActivityEmployeesStateModel>,
    { payload }: BrowseActivityEmployeesAction.LoadEmployees
  ) {
    setState(
      patch<BrowseActivityEmployeesStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new ActivityEmployeesAction.LoadPage({
        cycleId: payload.cycleId,
        activityId: payload.activityId,
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
      })
    );
  }
  @Action(BrowseActivityEmployeesAction.Create)
  Create(
    { dispatch, getState }: StateContext<BrowseActivityEmployeesStateModel>,
    { payload }: BrowseActivityEmployeesAction.Create
  ) {
    return dispatch(new ActivityEmployeesAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseActivityEmployeesAction.LoadEmployees({
            cycleId: payload.cycle?.id,
            activityId: payload.activity?.id,
          }),
          new BrowseActivityEmployeesAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseActivityEmployeesAction.Update)
  Update(
    { dispatch }: StateContext<BrowseActivityEmployeesStateModel>,
    { payload }: BrowseActivityEmployeesAction.Update
  ) {
    return dispatch(new ActivityEmployeesAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(
          new BrowseActivityEmployeesAction.LoadEmployees({
            cycleId: payload.cycle?.id,
            activityId: payload.activity?.id,
          })
        );
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseActivityEmployeesAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseActivityEmployeesAction.ToggleDialog, {
    cancelUncompleted: true,
  })
  openDialog(
    {}: StateContext<BrowseActivityEmployeesStateModel>,
    { payload }: BrowseActivityEmployeesAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.id,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }
  @Action(BrowseActivityEmployeesAction.Delete)
  Delete(
    { dispatch }: StateContext<BrowseActivityEmployeesStateModel>,
    { payload }: BrowseActivityEmployeesAction.Delete
  ) {
    return dispatch(new ActivityEmployeesAction.Delete(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
}
