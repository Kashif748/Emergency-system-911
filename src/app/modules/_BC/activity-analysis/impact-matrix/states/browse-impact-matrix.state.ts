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
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_IMPACT_MATRIX_UI_STATE_TOKEN =
  new StateToken<BrowseActivityImpactMatrixStateModel>('browse_impactMatrix');

@State<BrowseActivityImpactMatrixStateModel>({
  name: BROWSE_IMPACT_MATRIX_UI_STATE_TOKEN,
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
export class BrowseActivityImpactMatrixState {
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
    const cycleId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.cycleId
    );
    const activityId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.activityId
    );

    return dispatch(
      new ActivityImapctMatrixAction.LoadPage({
        cycleId: cycleId,
        activityId: activityId,
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        // filters: this.filters(pageRequest),
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
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new RtoAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),

        // filters: this.filters(pageRequest),
      })
    );
  }

  @Action(BrowseActivityImpactMatrixAction.UpdateImpactMatrix)
  UpdateImpactMatrix(
    { dispatch }: StateContext<BrowseActivityImpactMatrixStateModel>,
    { payload }: BrowseActivityImpactMatrixAction.UpdateImpactMatrix
  ) {
    const cycleId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.cycleId
    );
    const activityId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.activityId
    );

    return dispatch(
      new ActivityImapctMatrixAction.Update({
        cycleId: cycleId,
        activityId: activityId,
        bcImpactTypes: payload,
      })
    ).pipe(
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
