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
  versionId: number;
  cycleId: number;
  activityId: number;
  tabIndex: number;
  versionsDialogOpend: boolean;
}

export const BROWSE_ACTIVITY_ANALYSIS_UI_STATE_TOKEN =
  new StateToken<BrowseActivityAnalysisStateModel>('browse_ActivityAnalysis');

@State<BrowseActivityAnalysisStateModel>({
  name: BROWSE_ACTIVITY_ANALYSIS_UI_STATE_TOKEN,
  defaults: {
    tabIndex: -1,
    versionId: null,
    activityId: null,
    cycleId: null,
    versionsDialogOpend: false,
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
  static versionId(state: BrowseActivityAnalysisStateModel): number {
    return state.versionId;
  }

  @Selector([BrowseActivityAnalysisState])
  static cycleId(state: BrowseActivityAnalysisStateModel): number {
    return state.cycleId;
  }

  @Selector([BrowseActivityAnalysisState])
  static activityId(state: BrowseActivityAnalysisStateModel): number {
    return state.activityId;
  }

  @Selector([BrowseActivityAnalysisState])
  static tabIndex(state: BrowseActivityAnalysisStateModel): number {
    return state.tabIndex;
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
    setState(
      patch<BrowseActivityAnalysisStateModel>({
        cycleId: payload.id,
      })
    );
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
    setState(
      patch<BrowseActivityAnalysisStateModel>({
        activityId: payload.id,
      })
    );
    return dispatch(new ActivityAnalysisAction.GetActivityAnalysis(payload)).pipe(
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
}
