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
import { BrowseBCAction } from './browse-bc.action';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { BCAction } from '@core/states/bc/bc/bc.action';
import { patch } from '@ngxs/store/operators';
import { BcVersions } from 'src/app/api/models';

export interface BrowseBCStateModel {
  pageRequest: PageRequestModel;
  currentTab: string;
  versionsDialogOpend: boolean;
}

export const BROWSE_BUSINESS_CONTINUITY_UI_STATE_TOKEN =
  new StateToken<BrowseBCStateModel>('browse_businessContinuity');

@State<BrowseBCStateModel>({
  name: BROWSE_BUSINESS_CONTINUITY_UI_STATE_TOKEN,
  defaults: {
    currentTab: '',
    versionsDialogOpend: false,
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
  constructor(private messageHelper: MessageHelper, private router: Router) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseBCState])
  static state(state: BrowseBCStateModel): BrowseBCStateModel {
    return state;
  }

  @Selector([BrowseBCState])
  static versionsDialogOpend(state: BrowseBCStateModel): boolean {
    return state.versionsDialogOpend;
  }

  /* ********************** ACTIONS ************************* */

  @Action(BrowseBCAction.CreateBusinessContinuity)
  CreateBusinessContinuity(
    { dispatch }: StateContext<BrowseBCStateModel>,
    { payload }: BrowseBCAction.CreateBusinessContinuity
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

  @Action(BrowseBCAction.GetStatus)
  getStatus(
    { dispatch }: StateContext<BrowseBCStateModel>,
    { payload }: BrowseBCAction.GetStatus
  ) {
    return dispatch(
      new BCAction.Status({
        versionId: payload.versionId,
        statusId: payload.statusId,
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

  @Action(BrowseBCAction.GetVersion)
  GetVersion(
    { dispatch }: StateContext<BrowseBCStateModel>,
    { payload }: BrowseBCAction.GetVersion
  ) {
    return dispatch(
      new BCAction.GetVersion({
        id: payload.versionId,
      })
    ).pipe(
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseBCAction.ToggleDialog, {
    cancelUncompleted: true,
  })
  openDialog({ setState, getState }: StateContext<BrowseBCStateModel>) {
    const currentStatus = getState()?.versionsDialogOpend;
    setState(
      patch<BrowseBCStateModel>({
        versionsDialogOpend: !currentStatus,
      })
    );
  }
}
