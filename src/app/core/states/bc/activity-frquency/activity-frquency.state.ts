import {BcActivityFrequencies} from "../../../../api/models/bc-activity-frequencies";
import {Action, Selector, SelectorOptions, State, StateContext, StateToken, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {BcActivityFrequenciesControllerService} from "../../../../api/services/bc-activity-frequencies-controller.service";
import {EMPTY} from "rxjs";
import {catchError, finalize, tap} from "rxjs/operators";
import {patch} from "@ngxs/store/operators";
import {ActivityFrquencyAction} from "@core/states/bc/activity-frquency/activity-frquency.action";
import {PageBcActivityFrequencies} from "../../../../api/models/page-bc-activity-frequencies";
import {BrowseBusinessContinuityState} from "../../../../modules/_business-continuity/states/browse-business-continuity.state";


export interface ActivityFrquencyStateModel {
  page: PageBcActivityFrequencies;
  activityFrq: BcActivityFrequencies;
  loading: boolean;
  blocking: boolean;
}

const ACTIVITY_FRQUENCY_STATE_TOKEN = new StateToken<ActivityFrquencyStateModel>('activityFrquency');

@State<ActivityFrquencyStateModel>({ name: ACTIVITY_FRQUENCY_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })

export class ActivityFrquencyState {
  /**
   *
   */
  constructor(
    private activityFrquency: BcActivityFrequenciesControllerService,
    private store: Store,
  ) {
  }

  /* ************************ SELECTORS ******************** */
  @Selector([ActivityFrquencyState])
  static page(state: ActivityFrquencyStateModel) {
    return state?.page?.content;
  }

  @Selector([ActivityFrquencyState])
  static activityFrq(state: ActivityFrquencyStateModel) {
    return state?.activityFrq;
  }

  @Selector([ActivityFrquencyState])
    static totalRecords(state: ActivityFrquencyStateModel) {
    return state?.page?.totalElements;
    }

  @Selector([ActivityFrquencyState])
  static loading(state: ActivityFrquencyStateModel) {
    return state?.loading;
  }

  @Selector([ActivityFrquencyState])
  static blocking(state: ActivityFrquencyStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ActivityFrquencyAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<ActivityFrquencyStateModel>,
    { payload }: ActivityFrquencyAction.LoadPage
  ) {
    setState(
      patch<ActivityFrquencyStateModel>({
        loading: true,
      })
    );
    const versionID = this.store.selectSnapshot(BrowseBusinessContinuityState.versionId);
    return this.activityFrquency
      .getAll19({
        isActive: true,
        versionId: versionID,
        pageable: {
           page: payload.page,
           size: payload.size,
           sort: payload.sort,
         },
//         request: payload.filters,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<ActivityFrquencyStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ActivityFrquencyStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ActivityFrquencyStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(ActivityFrquencyAction.Create)
  create(
    { setState }: StateContext<ActivityFrquencyStateModel>,
    { payload }: ActivityFrquencyAction.Create
  ) {
    setState(
      patch<ActivityFrquencyStateModel>({
        blocking: true,
      })
    );
    return this.activityFrquency
      .insertOne10({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityFrquencyStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ActivityFrquencyAction.Update)
  update(
    { setState }: StateContext<ActivityFrquencyStateModel>,
    { payload }: ActivityFrquencyAction.Update
  ) {
    setState(
      patch<ActivityFrquencyStateModel>({
        blocking: true,
      })
    );
    return this.activityFrquency
      .update89({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityFrquencyStateModel>({
              blocking: false,
            })
          );
        })
      );
  }


  @Action(ActivityFrquencyAction.GetActivityFrq, { cancelUncompleted: true })
  getActivityFrq(
    { setState }: StateContext<ActivityFrquencyStateModel>,
    { payload }: ActivityFrquencyAction.GetActivityFrq
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ActivityFrquencyStateModel>({
          activityFrq: undefined,
        })
      );
      return;
    }
    setState(
      patch<ActivityFrquencyStateModel>({
        blocking: true,
      })
    );
    return this.activityFrquency.getOne10({ id: payload.id }).pipe(
      tap((activityFrq) => {
        setState(
          patch<ActivityFrquencyStateModel>({
            activityFrq: activityFrq.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ActivityFrquencyStateModel>({
            blocking: false,
          })
        );
      })
    );
  }

}
