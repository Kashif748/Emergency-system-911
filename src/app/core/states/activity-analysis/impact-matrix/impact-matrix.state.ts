import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import { BcImpactTypesResponse } from 'src/app/api/models';
import { ActivityImapctMatrixAction } from './impact-matrix.action';
import { BcActivityImpactMatrixControllerService } from 'src/app/api/services';

export interface ActivityImpactMatrixsStateModel {
  page: BcImpactTypesResponse[];
  loading: boolean;
  blocking: boolean;
}

const ACTIVITY_IMPACT_MATRIX_STATE_TOKEN =
  new StateToken<ActivityImpactMatrixsStateModel>('activityImpactMatrix');

@State<ActivityImpactMatrixsStateModel>({
  name: ACTIVITY_IMPACT_MATRIX_STATE_TOKEN,
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class ActivityImpactMatrixState {
  /**
   *
   */
  constructor(
    private activityImpactMatrix: BcActivityImpactMatrixControllerService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([ActivityImpactMatrixState])
  static page(state: ActivityImpactMatrixsStateModel): BcImpactTypesResponse[] {
    return state?.page;
  }

  @Selector([ActivityImpactMatrixState])
  static totalRecords(state: ActivityImpactMatrixsStateModel) {
    return state?.page?.length;
  }

  @Selector([ActivityImpactMatrixState])
  static loading(state: ActivityImpactMatrixsStateModel) {
    return state?.loading;
  }

  @Selector([ActivityImpactMatrixState])
  static blocking(state: ActivityImpactMatrixsStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ActivityImapctMatrixAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<ActivityImpactMatrixsStateModel>,
    { payload }: ActivityImapctMatrixAction.LoadPage
  ) {
    setState(
      patch<ActivityImpactMatrixsStateModel>({
        loading: true,
      })
    );
    return this.activityImpactMatrix
      .search23({
        cycleId: payload.cycleId,
        activityId: payload.activityId,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        // request: payload.filters,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<ActivityImpactMatrixsStateModel>({
              page: res.result.bcImpactTypes,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ActivityImpactMatrixsStateModel>({
              page: [],
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ActivityImpactMatrixsStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(ActivityImapctMatrixAction.Create)
  create(
    { setState }: StateContext<ActivityImpactMatrixsStateModel>,
    { payload }: ActivityImapctMatrixAction.Create
  ) {
    setState(
      patch<ActivityImpactMatrixsStateModel>({
        blocking: true,
      })
    );

    return this.activityImpactMatrix
      .insertOne32({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityImpactMatrixsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
  @Action(ActivityImapctMatrixAction.Update)
  update(
    { setState }: StateContext<ActivityImpactMatrixsStateModel>,
    { payload }: ActivityImapctMatrixAction.Update
  ) {
    setState(
      patch<ActivityImpactMatrixsStateModel>({
        blocking: true,
      })
    );

    return this.activityImpactMatrix
      .updateImpactLevels({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityImpactMatrixsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
}
