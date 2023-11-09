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
import { BrowseActivityImpactMatrixAction } from './browse-impact-matrix.action';
import { ImpactLevelAction, ImpactMatrixAction, RtoAction } from '@core/states';
import { BrowseActivityAnalysisState } from '../../states/browse-activity-analysis.state';
import { ActivityImapctMatrixAction } from '@core/states/activity-analysis/impact-matrix/impact-matrix.action';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

export interface BrowseActivityImpactMatrixStateModel {
  pageRequest: PageRequestModel;
}

export const BROWSE_IMPACT_MATRIX_UI_STATE_TOKEN =
  new StateToken<BrowseActivityImpactMatrixStateModel>(
    'browse_activity_impact_matrix'
  );

@State<BrowseActivityImpactMatrixStateModel>({
  name: BROWSE_IMPACT_MATRIX_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseActivityImpactMatrixState {
  /**
   *
   */
  constructor(
    private messageHelper: MessageHelper,
    private apiHelper: ApiHelper
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseActivityImpactMatrixState])
  static state(
    state: BrowseActivityImpactMatrixStateModel
  ): BrowseActivityImpactMatrixStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseActivityImpactMatrixAction.LoadPage)
  LoadPage(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseActivityImpactMatrixStateModel>,
    { payload }: BrowseActivityImpactMatrixAction.LoadPage
  ) {
    setState(
      patch<BrowseActivityImpactMatrixStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new ActivityImapctMatrixAction.LoadPage({
        cycleId: payload.cycleId,
        activityId: payload.activityId,
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
      })
    );
  }
  @Action(BrowseActivityImpactMatrixAction.LoadImpactLevel)
  loadImpactLevel(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseActivityImpactMatrixStateModel>,
    { payload }: BrowseActivityImpactMatrixAction.LoadImpactLevel
  ) {
    setState(
      patch<BrowseActivityImpactMatrixStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new ImpactLevelAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        versionId: payload.versionId,
        isActive: true,
        filters: { isActive: true },
      })
    );
  }
  @Action(BrowseActivityImpactMatrixAction.LoadImpactMatrix)
  loadImpactMatrix(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseActivityImpactMatrixStateModel>,
    { payload }: BrowseActivityImpactMatrixAction.LoadImpactMatrix
  ) {
    setState(
      patch<BrowseActivityImpactMatrixStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new ImpactMatrixAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        versionId: payload.versionId,
      })
    );
  }

  @Action(BrowseActivityImpactMatrixAction.LoadRto)
  loadRto(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseActivityImpactMatrixStateModel>,
    { payload }: BrowseActivityImpactMatrixAction.LoadRto
  ) {
    setState(
      patch<BrowseActivityImpactMatrixStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
          sortField: iif(
            !!payload?.pageRequest,
            payload?.pageRequest?.sortField
          ),
          sortOrder: iif(
            !!payload?.pageRequest,
            payload?.pageRequest?.sortOrder
          ),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new RtoAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        versionId: payload.versionId,
        // filters: this.filters(pageRequest),
      })
    );
  }

  @Action(BrowseActivityImpactMatrixAction.UpdateImpactMatrix)
  UpdateImpactMatrix(
    { dispatch }: StateContext<BrowseActivityImpactMatrixStateModel>,
    { payload }: BrowseActivityImpactMatrixAction.UpdateImpactMatrix
  ) {
    return dispatch(new ActivityImapctMatrixAction.Update(payload)).pipe(
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
