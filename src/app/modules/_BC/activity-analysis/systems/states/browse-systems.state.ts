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

import { BrowseActivityAnalysisState } from '../../states/browse-activity-analysis.state';
import { BrowseActivitySystemsAction } from './browse-systems.action';
import { ActivitySystemsAction } from '@core/states/activity-analysis/systems/systems.action';
import { catchError, finalize, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

export interface BrowseActivitySystemsStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_ACTIVITY_SYSTEMS_UI_STATE_TOKEN =
  new StateToken<BrowseActivitySystemsStateModel>('browse_systems');

@State<BrowseActivitySystemsStateModel>({
  name: BROWSE_ACTIVITY_SYSTEMS_UI_STATE_TOKEN,
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
export class BrowseActivitySystemsState {
  /**
   *
   */
  constructor(
    private router: Router,
    private apiHelper: ApiHelper,
    private route: ActivatedRoute,
    private store: Store,
    private messageHelper: MessageHelper
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseActivitySystemsState])
  static state(
    state: BrowseActivitySystemsStateModel
  ): BrowseActivitySystemsStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */

  @Action(BrowseActivitySystemsAction.LoadActivitySystems)
  LoadActivitySystems(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseActivitySystemsStateModel>,
    { payload }: BrowseActivitySystemsAction.LoadActivitySystems
  ) {
    setState(
      patch<BrowseActivitySystemsStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new ActivitySystemsAction.LoadPage({
        cycleId: payload.cycleId,
        activityId: payload.activityId,
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        // filters: this.filters(pageRequest),
      })
    );
  }

  @Action(BrowseActivitySystemsAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseActivitySystemsStateModel>,
    { payload }: BrowseActivitySystemsAction.ToggleDialog
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

  @Action(BrowseActivitySystemsAction.Create)
  Create(
    { dispatch, getState }: StateContext<BrowseActivitySystemsStateModel>,
    { payload }: BrowseActivitySystemsAction.Create
  ) {
    return dispatch(new ActivitySystemsAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseActivitySystemsAction.LoadActivitySystems({
            cycleId: payload.cycle?.id,
            activityId: payload.activity?.id,
          }),
          new BrowseActivitySystemsAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseActivitySystemsAction.Update)
  Update(
    { dispatch }: StateContext<BrowseActivitySystemsStateModel>,
    { payload }: BrowseActivitySystemsAction.Update
  ) {
    return dispatch(new ActivitySystemsAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(
          new BrowseActivitySystemsAction.LoadActivitySystems({
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
        dispatch(new BrowseActivitySystemsAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseActivitySystemsAction.Delete)
  Delete(
    { dispatch }: StateContext<BrowseActivitySystemsStateModel>,
    { payload }: BrowseActivitySystemsAction.Delete
  ) {
    return dispatch(new ActivitySystemsAction.Delete(payload)).pipe(
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
