import { PageRequestModel } from '@core/models/page-request.model';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from '@core/helpers/message.helper';
import { BrowseBCAction } from './browse-bc.action';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { BCAction } from '@core/states/bc/bc/bc.action';
import { ApiHelper } from '@core/helpers/api.helper';
import { iif, patch } from '@ngxs/store/operators';
import { TranslateService } from '@ngx-translate/core';
export interface BrowseBCStateModel {
  pageRequest: PageRequestModel;
  currentTab: string;
}

export const BROWSE_BUSINESS_CONTINUITY_UI_STATE_TOKEN =
  new StateToken<BrowseBCStateModel>('browse_bc');

@State<BrowseBCStateModel>({
  name: BROWSE_BUSINESS_CONTINUITY_UI_STATE_TOKEN,
  defaults: {
    currentTab: '',
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseBCState {
  /**
   *
   */
  constructor(
    private messageHelper: MessageHelper,
    private router: Router,
    private route: ActivatedRoute,
    private apiHelper: ApiHelper,
    private translate: TranslateService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseBCState])
  static state(state: BrowseBCStateModel): BrowseBCStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseBCAction.LoadPage)
  LoadPage(
    { setState, dispatch, getState }: StateContext<BrowseBCStateModel>,
    { payload }: BrowseBCAction.LoadPage
  ) {
    setState(
      patch<BrowseBCStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new BCAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        statusId:payload?.statusId
      })
    );
  }

  @Action(BrowseBCAction.Sort)
  sort(
    { setState, dispatch, getState }: StateContext<BrowseBCStateModel>,
    { payload }: BrowseBCAction.Sort
  ) {
    setState(
      patch<BrowseBCStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new BCAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
        },
      })
    );
  }

  @Action(BrowseBCAction.CreateBusinessContinuity)
  CreateBusinessContinuity(
    { dispatch }: StateContext<BrowseBCStateModel>,
    { payload }: BrowseBCAction.CreateBusinessContinuity
  ) {
    return dispatch(new BCAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseBCAction.ChangeStatus)
  ChangeStatus(
    { dispatch }: StateContext<BrowseBCStateModel>,
    { payload }: BrowseBCAction.ChangeStatus
  ) {
    return dispatch(
      new BCAction.Status({
        versionId: payload.versionId,
        statusId: payload.statusId,
      })
    ).pipe(
      tap(() => {
        dispatch(
          new BrowseBCAction.GetVersion({ versionId: payload.versionId })
        );
        this.messageHelper.success();
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseBCAction.GetVersion)
  GetVersion(
    { dispatch }: StateContext<BrowseBCStateModel>,
    { payload }: BrowseBCAction.GetVersion
  ) {
    return dispatch([
      new BrowseBCAction.LoadPage(),
      new BCAction.GetVersion({
        id: payload.versionId,
      }),
    ]).pipe(
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseBCAction.SetVersionId, {
    cancelUncompleted: true,
  })
  setVersionId(
    {}: StateContext<BrowseBCStateModel>,
    { payload }: BrowseBCAction.SetVersionId
  ) {
    console.log(payload);

    this.router.navigate([], {
      queryParams: {
        _version: payload.versionId,
      },
      queryParamsHandling: 'merge',
    });
  }
  @Action(BrowseBCAction.ToggleDialog, {
    cancelUncompleted: true,
  })
  openDialog({}: StateContext<BrowseBCStateModel>) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'version_dialog'
            ? undefined
            : 'version_dialog',
      },
      queryParamsHandling: 'merge',
    });
  }
  @Action(BrowseBCAction.Delete)
  Delete(
    { dispatch }: StateContext<BrowseBCStateModel>,
    { payload }: BrowseBCAction.Delete
  ) {
    return dispatch(new BCAction.Delete(payload)).pipe(
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
