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
import { Router } from '@angular/router';
import { MessageHelper } from '@core/helpers/message.helper';
import {BrowseBusinessContinuityAction} from './browse-business-continuity.action';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import {BCAction} from '@core/states/bc/business-continuity/business-continuity.action';
import { patch } from '@ngxs/store/operators';

export interface BrowseBusinessContinuityStateModel {
  pageRequest: PageRequestModel;
  versionId: number;
  currentTab: string;
  columns: string[];
  versionsDialogOpend: boolean;
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_BUSINESS_CONTINUITY_UI_STATE_TOKEN =
  new StateToken<BrowseBusinessContinuityStateModel>(
    'browse_businessContinuity'
  );

@State<BrowseBusinessContinuityStateModel>({
  name: BROWSE_BUSINESS_CONTINUITY_UI_STATE_TOKEN,
  defaults: {
    currentTab: '',
    versionId: null,
    versionsDialogOpend: false,
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
export class BrowseBusinessContinuityState {
  /**
   *
   */
  constructor(private messageHelper: MessageHelper, private router: Router) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseBusinessContinuityState])
  static state(
    state: BrowseBusinessContinuityStateModel
  ): BrowseBusinessContinuityStateModel {
    return state;
  }

  @Selector([BrowseBusinessContinuityState])
  static versionId(state: BrowseBusinessContinuityStateModel): number {
    return state.versionId;
  }

  @Selector([BrowseBusinessContinuityState])
  static versionsDialogOpend(
    state: BrowseBusinessContinuityStateModel
  ): boolean {
    return state.versionsDialogOpend;
  }

  /* ********************** ACTIONS ************************* */

  @Action(BrowseBusinessContinuityAction.CreateBusinessContinuity)
  CreateBusinessContinuity(
    { dispatch }: StateContext<BrowseBusinessContinuityStateModel>,
    { payload }: BrowseBusinessContinuityAction.CreateBusinessContinuity
  ) {
    return dispatch(new BCAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([new BCAction.LoadPage({ page: 0, size: 20 })]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action (BrowseBusinessContinuityAction.GetStatus)
  getStatus(
    { dispatch }: StateContext<BrowseBusinessContinuityStateModel>,
    { payload }: BrowseBusinessContinuityAction.GetStatus
  ) {
    return dispatch(new BCAction.Status({versionId: payload.versionId, statusId: payload.statusId})).pipe(
      tap(() => {
        this.messageHelper.success();
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseBusinessContinuityAction.ToggleDialog, {
    cancelUncompleted: true,
  })
  openDialog({
    setState,
    getState,
  }: StateContext<BrowseBusinessContinuityStateModel>) {
    const currentStatus = getState()?.versionsDialogOpend;
    setState(
      patch<BrowseBusinessContinuityStateModel>({
        versionsDialogOpend: !currentStatus,
      })
    );
  }

  @Action(BrowseBusinessContinuityAction.SetGlobalVersion, {
    cancelUncompleted: true,
  })
  setGlobalVersion(
    { setState }: StateContext<BrowseBusinessContinuityStateModel>,
    { payload }: BrowseBusinessContinuityAction.SetGlobalVersion
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<BrowseBusinessContinuityStateModel>({
          versionId: undefined,
        })
      );
      return;
    }
    setState(
      patch<BrowseBusinessContinuityStateModel>({
        versionId: payload.id,
        // versionsDialogOpend: false,
      })
    );

    this.router.navigate([], {
      queryParams: {
        _version: payload.id,
      },
      queryParamsHandling: 'merge',
    });
  }
}
