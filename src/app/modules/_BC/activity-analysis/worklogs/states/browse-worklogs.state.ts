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

import { BrowseActivityWorklogsAction } from './browse-worklogs.action';
import { catchError, finalize, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ActivityWorklogsAction } from '@core/states/activity-analysis/worklogs/worklogs.action';

export interface BrowseActivityWorklogsStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_ACTIVITY_WORKLOGS_UI_STATE_TOKEN =
  new StateToken<BrowseActivityWorklogsStateModel>('browse_activity_worklogs');

@State<BrowseActivityWorklogsStateModel>({
  name: BROWSE_ACTIVITY_WORKLOGS_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 100,
    },
    columns: ['criticality', 'rtoEn', 'description'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseActivityWorklogsState {
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
  @Selector([BrowseActivityWorklogsState])
  static state(
    state: BrowseActivityWorklogsStateModel
  ): BrowseActivityWorklogsStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */

  @Action(BrowseActivityWorklogsAction.LoadActivityWorklogs)
  LoadActivityWorklogs(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseActivityWorklogsStateModel>,
    { payload }: BrowseActivityWorklogsAction.LoadActivityWorklogs
  ) {
    setState(
      patch<BrowseActivityWorklogsStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new ActivityWorklogsAction.LoadPage({
        actionTypeId: payload?.actionTypeId,
        activityAnalysisId: payload.activityAnalysisId,
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        // filters: this.filters(pageRequest),
        resetPage: payload.resetPage
      })
    );
  }

  @Action(BrowseActivityWorklogsAction.LoadActivityWorklogsTypes)
  LoadActivityWorklogsTypes({
    dispatch,
  }: StateContext<BrowseActivityWorklogsStateModel>) {
    return dispatch(new ActivityWorklogsAction.LoadWorklogsTypes());
  }

  @Action(BrowseActivityWorklogsAction.Create)
  Create(
    { dispatch, getState }: StateContext<BrowseActivityWorklogsStateModel>,
    { payload }: BrowseActivityWorklogsAction.Create
  ) {
    return dispatch(new ActivityWorklogsAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        // dispatch(
        //   new BrowseActivityWorklogsAction.LoadActivityWorklogs({
        //     actionTypeId: payload.actionType.id,
        //     activityAnalysisId: payload.activityAnalysis?.id,
        //   })
        // );
      }),
      catchError((err) => {
        console.log(err);

        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseActivityWorklogsAction.Update)
  Update(
    { dispatch }: StateContext<BrowseActivityWorklogsStateModel>,
    { payload }: BrowseActivityWorklogsAction.Update
  ) {
    return dispatch(new ActivityWorklogsAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(
          new BrowseActivityWorklogsAction.LoadActivityWorklogs({
            actionTypeId: payload.actionType.id,
            activityAnalysisId: payload.activityAnalysis?.id,
            resetPage: true,
          })
        );
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseActivityWorklogsAction.ToggleEditMode, {
    cancelUncompleted: true,
  })
  openDialog(
    {}: StateContext<BrowseActivityWorklogsStateModel>,
    { payload }: BrowseActivityWorklogsAction.ToggleEditMode
  ) {
    this.router.navigate([], {
      queryParams: {
        _mode:
          this.route.snapshot.queryParams['_mode'] == 'edit'
            ? undefined
            : 'edit',
        _id: payload.log?.id,
      },
      queryParamsHandling: 'merge',
    });
  }
}
