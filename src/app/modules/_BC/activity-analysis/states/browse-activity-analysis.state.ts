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
import { catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { patch } from '@ngxs/store/operators';
import { BrowseActivityAnalysisAction } from './browse-activity-analysis.action';
import { ActivityAnalysisAction } from '@core/states/activity-analysis/activity-analysis.action';

export interface BrowseActivityAnalysisStateModel {
  tabIndex: number;
  versionsDialogOpend: boolean;
  impactTotal: number;
}

export const BROWSE_ACTIVITY_ANALYSIS_UI_STATE_TOKEN =
  new StateToken<BrowseActivityAnalysisStateModel>('browse_activity_analysis');

@State<BrowseActivityAnalysisStateModel>({
  name: BROWSE_ACTIVITY_ANALYSIS_UI_STATE_TOKEN,
  defaults: {
    tabIndex: -1,
    versionsDialogOpend: false,
    impactTotal: 0,
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseActivityAnalysisState {
  /**
   *
   */
  constructor(private messageHelper: MessageHelper, private router: Router) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseActivityAnalysisState])
  static state(
    state: BrowseActivityAnalysisStateModel
  ): BrowseActivityAnalysisStateModel {
    return state;
  }

  @Selector([BrowseActivityAnalysisState])
  static tabIndex(state: BrowseActivityAnalysisStateModel): number {
    return state.tabIndex;
  }

  @Selector([BrowseActivityAnalysisState])
  static impactTotal(state: BrowseActivityAnalysisStateModel): number {
    return state.impactTotal;
  }

  @Selector([BrowseActivityAnalysisState])
  static versionsDialogOpend(state: BrowseActivityAnalysisStateModel): boolean {
    return state.versionsDialogOpend;
  }

  /* ********************** ACTIONS ************************* */

  @Action(BrowseActivityAnalysisAction.GetCycle)
  GetCycle(
    { dispatch, setState }: StateContext<BrowseActivityAnalysisStateModel>,
    { payload }: BrowseActivityAnalysisAction.GetCycle
  ) {
    return dispatch(new ActivityAnalysisAction.GetCycle(payload)).pipe(
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseActivityAnalysisAction.GetActivityAnalysis)
  GetActivityAnalysis(
    { dispatch, setState }: StateContext<BrowseActivityAnalysisStateModel>,
    { payload }: BrowseActivityAnalysisAction.GetActivityAnalysis
  ) {
    return dispatch(
      new ActivityAnalysisAction.GetActivityAnalysis(payload)
    ).pipe(
      tap(() => {}),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseActivityAnalysisAction.GetActivityAnalysisStatus)
  GetActivityAnalysisStatus(
    { dispatch, setState }: StateContext<BrowseActivityAnalysisStateModel>,
    { payload }: BrowseActivityAnalysisAction.GetActivityAnalysisStatus
  ) {
    return dispatch(
      new ActivityAnalysisAction.GetActivityAnalysisStatus(payload)
    ).pipe(
      tap(() => {}),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseActivityAnalysisAction.Update)
  Update(
    { dispatch }: StateContext<BrowseActivityAnalysisStateModel>,
    { payload }: BrowseActivityAnalysisAction.Update
  ) {
    return dispatch(new ActivityAnalysisAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        // dispatch(new ActivityAnalysisAction.GetActivity());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseActivityAnalysisAction.ChangeStatus)
  ChangeStatus(
    { dispatch }: StateContext<BrowseActivityAnalysisStateModel>,
    { payload }: BrowseActivityAnalysisAction.ChangeStatus
  ) {
    return dispatch(new ActivityAnalysisAction.ChangeStatus(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(
          new BrowseActivityAnalysisAction.GetActivityAnalysisStatus({
            id: payload.activityAnalysisId,
          })
        );
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseActivityAnalysisAction.ChangeTab, { cancelUncompleted: true })
  ChangeTab(
    { setState }: StateContext<BrowseActivityAnalysisStateModel>,
    { payload }: BrowseActivityAnalysisAction.ChangeTab
  ) {
    setState(
      patch<BrowseActivityAnalysisStateModel>({
        tabIndex: payload?.index,
      })
    );
  }

  @Action(BrowseActivityAnalysisAction.setImpactTotal, {
    cancelUncompleted: true,
  })
  setImpactTotal(
    { setState }: StateContext<BrowseActivityAnalysisStateModel>,
    { payload }: BrowseActivityAnalysisAction.setImpactTotal
  ) {
    setState(
      patch<BrowseActivityAnalysisStateModel>({
        impactTotal: payload?.impactTotal,
      })
    );
  }
}
