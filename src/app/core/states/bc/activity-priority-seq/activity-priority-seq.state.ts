import {Action, Selector, SelectorOptions, State, StateContext, StateToken, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {EMPTY} from "rxjs";
import {catchError, finalize, tap} from "rxjs/operators";
import {patch} from "@ngxs/store/operators";
import {BcRecoveryPrioritiesControllerService} from "../../../../api/services/bc-recovery-priorities-controller.service";
import {BcRecoveryPriorities} from "../../../../api/models/bc-recovery-priorities";
import {ActivityPrioritySeqAction} from "@core/states/bc/activity-priority-seq/activity-priority-seq.action";
import {PageBcRecoveryPriorities} from "../../../../api/models/page-bc-recovery-priorities";
import {BrowseBusinessContinuityState} from "../../../../modules/_business-continuity/states/browse-business-continuity.state";


export interface ActivityPrioritySeqStateModel {
  page: PageBcRecoveryPriorities;
  singleActivity: BcRecoveryPriorities;
  loading: boolean;
  blocking: boolean;
}

const ACTIVITY_PRIORITY_SEQ_STATE_TOKEN = new StateToken<ActivityPrioritySeqStateModel>('activityPrioritySeq');

@State<ActivityPrioritySeqStateModel>({ name: ACTIVITY_PRIORITY_SEQ_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })

export class ActivityPrioritySeqState {
  /**
   *
   */
  constructor(
    private activityPrioritySeq: BcRecoveryPrioritiesControllerService,
    private store: Store,
  ) {
  }

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
  @Action(ActivityPrioritySeqAction.LoadPage, {cancelUncompleted: true})
  loadPage(
    {setState}: StateContext<ActivityPrioritySeqStateModel>,
    {payload}: ActivityPrioritySeqAction.LoadPage
  ) {
    setState(
      patch<ActivityPrioritySeqStateModel>({
        loading: true,
      })
    );
    const versionID = this.store.selectSnapshot(BrowseBusinessContinuityState.versionId);
    return this.activityPrioritySeq
      .getAll13({
        isActive: true,
        versionId: versionID,
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
    const versionID = this.store.selectSnapshot(BrowseBusinessContinuityState.versionId);
    payload.versionId = versionID;
    return this.activityPrioritySeq
      .insertOne4({
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
    const versionID = this.store.selectSnapshot(BrowseBusinessContinuityState.versionId);
    payload.versionId = versionID;
    return this.activityPrioritySeq
      .update83({
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

  @Action(ActivityPrioritySeqAction.GetActivityPrioritySeq, { cancelUncompleted: true })
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
    return this.activityPrioritySeq.getOne4({ id: payload.id }).pipe(
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
