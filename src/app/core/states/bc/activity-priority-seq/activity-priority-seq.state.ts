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
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import {
  BcRecoveryPriorities,
  PageBcRecoveryPriorities,
} from 'src/app/api/models';
import { BcRecoveryPrioritiesControllerService } from 'src/app/api/services';
import { ActivityPrioritySeqAction } from './activity-priority-seq.action';

export interface ActivityPrioritySeqStateModel {
  page: PageBcRecoveryPriorities;
  singleActivity: BcRecoveryPriorities;
  loading: boolean;
  blocking: boolean;
}

const ACTIVITY_PRIORITY_SEQ_STATE_TOKEN =
  new StateToken<ActivityPrioritySeqStateModel>('activity_priority_seq');

@State<ActivityPrioritySeqStateModel>({
  name: ACTIVITY_PRIORITY_SEQ_STATE_TOKEN,
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class ActivityPrioritySeqState {
  /**
   *
   */
  constructor(
    private activityPrioritySeq: BcRecoveryPrioritiesControllerService,
    private store: Store
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([ActivityPrioritySeqState])
  static page(state: ActivityPrioritySeqStateModel) {
    return state?.page?.content;
  }

  @Selector([ActivityPrioritySeqState])
  static singleActivity(state: ActivityPrioritySeqStateModel) {
    return state?.singleActivity;
  }

  @Selector([ActivityPrioritySeqState])
  static totalRecords(state: ActivityPrioritySeqStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([ActivityPrioritySeqState])
  static loading(state: ActivityPrioritySeqStateModel) {
    return state?.loading;
  }

  @Selector([ActivityPrioritySeqState])
  static blocking(state: ActivityPrioritySeqStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ActivityPrioritySeqAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<ActivityPrioritySeqStateModel>,
    { payload }: ActivityPrioritySeqAction.LoadPage
  ) {
    if (payload.versionId === undefined || payload.versionId === null) {
      return;
    }
    setState(
      patch<ActivityPrioritySeqStateModel>({
        loading: true,
      })
    );

    return this.activityPrioritySeq
      .getAll15({
        isActive: true,
        versionId: payload.versionId,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<ActivityPrioritySeqStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ActivityPrioritySeqStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ActivityPrioritySeqStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(ActivityPrioritySeqAction.Create)
  create(
    { setState }: StateContext<ActivityPrioritySeqStateModel>,
    { payload }: ActivityPrioritySeqAction.Create
  ) {
    setState(
      patch<ActivityPrioritySeqStateModel>({
        blocking: true,
      })
    );
    return this.activityPrioritySeq
      .insertOne18({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityPrioritySeqStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ActivityPrioritySeqAction.Update)
  update(
    { setState }: StateContext<ActivityPrioritySeqStateModel>,
    { payload }: ActivityPrioritySeqAction.Update
  ) {
    setState(
      patch<ActivityPrioritySeqStateModel>({
        blocking: true,
      })
    );
    return this.activityPrioritySeq
      .update99({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityPrioritySeqStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ActivityPrioritySeqAction.GetActivityPrioritySeq, {
    cancelUncompleted: true,
  })
  getActivityPrioritySeq(
    { setState }: StateContext<ActivityPrioritySeqStateModel>,
    { payload }: ActivityPrioritySeqAction.GetActivityPrioritySeq
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ActivityPrioritySeqStateModel>({
          singleActivity: undefined,
        })
      );
      return;
    }
    setState(
      patch<ActivityPrioritySeqStateModel>({
        blocking: true,
      })
    );
    return this.activityPrioritySeq.getOne18({ id: payload.id }).pipe(
      tap((rto) => {
        setState(
          patch<ActivityPrioritySeqStateModel>({
            singleActivity: rto.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ActivityPrioritySeqStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
