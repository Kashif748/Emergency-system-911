import { EMPTY } from 'rxjs';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { finalize, map, tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
import {
  BcActivityAnalysis,
  BcCycles,
  PageBcActivityAnalysis,
} from 'src/app/api/models';
import {
  BcActivitiesControllerService,
  BcActivityAnalysisControllerService,
  BcCyclesControllerService,
} from 'src/app/api/services';
import { ActivityAnalysisAction } from './activity-analysis.action';
import { ActivityAnalysisStatusAction } from 'src/app/api/models/activity-analysis-status-action';

export interface ActivityAnalysisStateModel {
  page: PageBcActivityAnalysis;
  activityAnalysis: BcActivityAnalysis;
  activityStatus: ActivityAnalysisStatusAction;
  cycle: BcCycles;
  loading: boolean;
  loadingStatus: boolean;
  blocking: boolean;
}

const ACTIVITY_ANALYSIS_STATE_TOKEN = new StateToken<ActivityAnalysisState>(
  'activity_analysis'
);

@State<ActivityAnalysisState>({ name: ACTIVITY_ANALYSIS_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class ActivityAnalysisState {
  /**
   *
   */
  constructor(
    private activitiesController: BcActivitiesControllerService,
    private activitiesAnalysisController: BcActivityAnalysisControllerService,

    private cyclesController: BcCyclesControllerService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([ActivityAnalysisState])
  static page(state: ActivityAnalysisStateModel) {
    return state?.page.content;
  }
  @Selector([ActivityAnalysisState])
  static activityAnalysis(state: ActivityAnalysisStateModel) {
    return state?.activityAnalysis;
  }
  @Selector([ActivityAnalysisState])
  static activityStatus(state: ActivityAnalysisStateModel) {
    return state?.activityStatus;
  }

  @Selector([ActivityAnalysisState])
  static cycle(state: ActivityAnalysisStateModel) {
    return state?.cycle;
  }

  @Selector([ActivityAnalysisState])
  static loading(state: ActivityAnalysisStateModel) {
    return state?.loading;
  }
  @Selector([ActivityAnalysisState])
  static loadingStatus(state: ActivityAnalysisStateModel) {
    return state?.loadingStatus;
  }

  @Selector([ActivityAnalysisState])
  static blocking(state: ActivityAnalysisStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ActivityAnalysisAction.LoadPage, { cancelUncompleted: true })
  LoadPage(
    { setState }: StateContext<ActivityAnalysisStateModel>,
    { payload }: ActivityAnalysisAction.LoadPage
  ) {
    return this.activitiesAnalysisController
      .search27({
        pageable: {
          page: payload?.page,
          size: payload?.size,
        },
      })
      .pipe(
        tap((bc) => {
          setState(
            patch<ActivityAnalysisStateModel>({
              page: bc.result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<ActivityAnalysisStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ActivityAnalysisAction.GetActivityAnalysis, {
    cancelUncompleted: true,
  })
  GetActivityAnalysis(
    { setState }: StateContext<ActivityAnalysisStateModel>,
    { payload }: ActivityAnalysisAction.GetActivityAnalysis
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ActivityAnalysisStateModel>({
          activityAnalysis: undefined,
        })
      );
      return;
    }
    setState(
      patch<ActivityAnalysisStateModel>({
        loading: true,
      })
    );
    return this.activitiesAnalysisController.getOne34({ id: payload.id }).pipe(
      tap((bc) => {
        setState(
          patch<ActivityAnalysisStateModel>({
            activityAnalysis: bc.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ActivityAnalysisStateModel>({
            loading: false,
          })
        );
      })
    );
  }

  @Action(ActivityAnalysisAction.GetActivityAnalysisStatus, {
    cancelUncompleted: true,
  })
  GetActivityAnalysisStatus(
    { setState }: StateContext<ActivityAnalysisStateModel>,
    { payload }: ActivityAnalysisAction.GetActivityAnalysis
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ActivityAnalysisStateModel>({
          activityAnalysis: undefined,
        })
      );
      return;
    }
    setState(
      patch<ActivityAnalysisStateModel>({
        loadingStatus: true,
      })
    );
    return this.activitiesAnalysisController
      .getOneByIdContainingActions({ id: payload.id })
      .pipe(
        tap((bc) => {
          setState(
            patch<ActivityAnalysisStateModel>({
              activityStatus: bc.result?.status,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<ActivityAnalysisStateModel>({
              loadingStatus: false,
            })
          );
        })
      );
  }

  @Action(ActivityAnalysisAction.GetCycle, { cancelUncompleted: true })
  GetCycle(
    { setState }: StateContext<ActivityAnalysisStateModel>,
    { payload }: ActivityAnalysisAction.GetCycle
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ActivityAnalysisStateModel>({
          cycle: undefined,
        })
      );
      return;
    }
    setState(
      patch<ActivityAnalysisStateModel>({
        blocking: true,
      })
    );
    return this.cyclesController.getOne24({ id: payload.id }).pipe(
      map((response) => response.result),
      tap((cycle) => {
        setState(
          patch<ActivityAnalysisStateModel>({
            cycle,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ActivityAnalysisStateModel>({
            blocking: false,
          })
        );
      })
    );
  }

  @Action(ActivityAnalysisAction.Update, { cancelUncompleted: true })
  Update(
    { setState }: StateContext<ActivityAnalysisStateModel>,
    { payload }: ActivityAnalysisAction.Update
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ActivityAnalysisStateModel>({
          activityAnalysis: undefined,
        })
      );
      return;
    }
    setState(
      patch<ActivityAnalysisStateModel>({
        blocking: true,
      })
    );
    return this.activitiesAnalysisController.update115({ body: payload }).pipe(
      map((response) => response.result),
      tap((activityAnalysis) => {
        setState(
          patch<ActivityAnalysisStateModel>({
            activityAnalysis,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ActivityAnalysisStateModel>({
            blocking: false,
          })
        );
      })
    );
  }

  @Action(ActivityAnalysisAction.ChangeStatus, { cancelUncompleted: true })
  ChangeStatus(
    { setState }: StateContext<ActivityAnalysisStateModel>,
    { payload }: ActivityAnalysisAction.ChangeStatus
  ) {
    setState(
      patch<ActivityAnalysisStateModel>({
        blocking: true,
      })
    );
    return this.activitiesAnalysisController
      .changeStatus1({ body: payload })
      .pipe(
        tap((res) => {
          console.log(res);

          // setState(
          //   patch<ActivityAnalysisStateModel>({
          //     activityStatus : res,
          //   })
          // );
        }),
        finalize(() => {
          setState(
            patch<ActivityAnalysisStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
}
