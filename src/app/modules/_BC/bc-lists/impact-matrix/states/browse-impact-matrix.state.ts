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
import { catchError, finalize, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { BrowseImpactMatrixAction } from './browse-impact-matrix.action';
import { ImpactLevelAction, ImpactMatrixAction } from '@core/states';
import {BrowseRtoStateModel} from "../../rto/states/browse-rto.state";
import {RtoAction} from "@core/states/bc/rto/rto.action";
import {BrowseRtoAction} from "../../rto/states/browse-rto.action";

export interface BrowseImpactMatrixStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_IMPACT_MATRIX_UI_STATE_TOKEN =
  new StateToken<BrowseImpactMatrixStateModel>('browse_bc_impact_matrix');

@State<BrowseImpactMatrixStateModel>({
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
export class BrowseImpactMatrixState {
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
  @Selector([BrowseImpactMatrixState])
  static state(
    state: BrowseImpactMatrixStateModel
  ): BrowseImpactMatrixStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseImpactMatrixAction.LoadImpactMatrix)
  loadImpactMatrix(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseImpactMatrixStateModel>,
    { payload }: BrowseImpactMatrixAction.LoadImpactMatrix
  ) {
    setState(
      patch<BrowseImpactMatrixStateModel>({
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

  @Action(BrowseImpactMatrixAction.CreateImpactMatrix)
  createImpactMatrix(
    { dispatch }: StateContext<BrowseImpactMatrixStateModel>,
    { payload }: BrowseImpactMatrixAction.CreateImpactMatrix
  ) {
    return dispatch(new ImpactMatrixAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseImpactMatrixAction.LoadImpactMatrix(),
          new BrowseImpactMatrixAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseImpactMatrixAction.UpdateImpactMatrix)
  updateImpactMatrix(
    { dispatch }: StateContext<BrowseImpactMatrixStateModel>,
    { payload }: BrowseImpactMatrixAction.UpdateImpactMatrix
  ) {
    return dispatch(new ImpactMatrixAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseImpactMatrixAction.LoadImpactMatrix());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseImpactMatrixAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseImpactMatrixAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseImpactMatrixStateModel>,
    { payload }: BrowseImpactMatrixAction.ToggleDialog
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

  @Action(BrowseImpactMatrixAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseImpactMatrixStateModel>,
    { payload }: BrowseImpactMatrixAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.id,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
  @Action(BrowseImpactMatrixAction.LoadImpactLevel)
  loadImpactLevel(
    {setState, dispatch, getState}: StateContext<BrowseImpactMatrixStateModel>,
    {payload}: BrowseImpactMatrixAction.LoadImpactLevel
  ) {
    setState(
      patch<BrowseImpactMatrixStateModel>({
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
        isActive: true
      })
    );
  }

  @Action(BrowseImpactMatrixAction.Export, { cancelUncompleted: true })
  export(
    { getState, dispatch }: StateContext<BrowseImpactMatrixStateModel>,
    { payload }: BrowseImpactMatrixAction.Export
  ) {
    return dispatch(
      new ImpactMatrixAction.Export({
        type: payload.type,
        versionId: payload.versionId
      })
    );
  }
}
