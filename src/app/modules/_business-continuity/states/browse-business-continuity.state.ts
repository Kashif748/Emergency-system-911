import {PageRequestModel} from '@core/models/page-request.model';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageHelper} from "@core/helpers/message.helper";
import {ApiHelper} from "@core/helpers/api.helper";
import {BrowseBusinessContinuityAction} from "./browse-business-continuity.action";
import {catchError, tap} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {BCAction} from "@core/states/bc/business-continuity/business-continuity.action";
import {patch} from "@ngxs/store/operators";
import {BrowseRtoAction} from "../rto/states/browse-rto.action";
import {BrowseLocationTypeAction} from "../location-type/states/browse-locationType.action";
import {
  BrowseImpLevelWorkingAction
} from "../importance-level-working/browse-imp-level-working/states/browse-imp-level-working.action";
import {BrowseActivityFrquencyAction} from "../activity-frquency/states/browse-activity-frquency.action";
import {BrowseImpactMatrixAction} from "../impact-matrix/states/browse-impact-matrix.action";
import {BrowseOrgDetailAction} from "../org-detail/states/browse-orgDetail.action";
import {BrowseImpactLevelAction} from "../impact-level/states/browse-impact-level.action";
import {
  BrowseActivityPrioritySeqAction
} from "../activity-priority-sequence/states/browse-activity-priority-seq.action";
import {IAuthService} from "@core/services/auth.service";

export interface BrowseBusinessContinuityStateModel {
  pageRequest: PageRequestModel;
  versionId: number;
  currentTab: string;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_BUSINESS_CONTINUITY_UI_STATE_TOKEN =
  new StateToken<BrowseBusinessContinuityStateModel>('browse_businessContinuity');

@State<BrowseBusinessContinuityStateModel>({
  name: BROWSE_BUSINESS_CONTINUITY_UI_STATE_TOKEN,
  defaults: {
    currentTab: '',
    versionId: null,
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: [
      'criticality',
      'rtoEn',
      'description'
    ],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseBusinessContinuityState {
  /**
   *
   */
  constructor(
    private messageHelper: MessageHelper,
    private router: Router,
    private apiHelper: ApiHelper,
    private route: ActivatedRoute,
    private auth: IAuthService
  ) {
  }

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseBusinessContinuityState])
  static state(state: BrowseBusinessContinuityStateModel): BrowseBusinessContinuityStateModel {
    return state;
  }

  @Selector([BrowseBusinessContinuityState])
  static versionId(state: BrowseBusinessContinuityStateModel): number {
    return state.versionId;
  }

  /* ********************** ACTIONS ************************* */
  /*@Action(BrowseRtoAction.LoadRto)
  LoadRto(
    { setState, dispatch, getState }: StateContext<BrowseBusinessContinuityStateModel>,
    { payload }: BrowseRtoAction.LoadRto
  ) {
    setState(
      patch<BrowseBusinessContinuityStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new RtoAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        // filters: this.filters(pageRequest),
      })
    );
  }*/

  @Action(BrowseBusinessContinuityAction.CreateBusinessContinuity)
  CreateBusinessContinuity(
    { dispatch }: StateContext<BrowseBusinessContinuityStateModel>,
    { payload }: BrowseBusinessContinuityAction.CreateBusinessContinuity
  ) {
    return dispatch(new BCAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          // new BrowseRtoAction.LoadRto(),
          // new BrowseRtoAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  /*@Action(BrowseRtoAction.UpdateRto)
  updateRto(
    { dispatch }: StateContext<BrowseBusinessContinuityStateModel>,
    { payload }: BrowseRtoAction.UpdateRto
  ) {
    return dispatch(new RtoAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseRtoAction.LoadRto());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseRtoAction.ToggleDialog({}));
      })
    );
  }*/

  @Action(BrowseBusinessContinuityAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseBusinessContinuityStateModel>,
    { payload }: BrowseBusinessContinuityAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.Id,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseBusinessContinuityAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseBusinessContinuityStateModel>,
    { payload }: BrowseBusinessContinuityAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.Id,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseBusinessContinuityAction.SetGlobalVersion, { cancelUncompleted: true })
  setGlobalVersion(
    { setState, getState, dispatch }: StateContext<BrowseBusinessContinuityStateModel>,
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
      })
    );
    if (payload.currentTab === undefined || payload.currentTab === '') {
      setState(
        patch<BrowseBusinessContinuityStateModel>({
          versionId: undefined,
        })
      );
      return;
    }
    setState(
      patch<BrowseBusinessContinuityStateModel>({
        currentTab: payload.currentTab,
      })
    );

    const activeTab = getState().currentTab;
    const pageRequest = getState().pageRequest;
    if (activeTab === 'rto-list') {
      return dispatch(
        new BrowseRtoAction.LoadRto()
      );
    }
    if (activeTab === 'loc-types') {
      return dispatch(
        new BrowseLocationTypeAction.LoadLocationType()
      );
    }
    if (activeTab === 'imp-level-working') {
      return dispatch(
        new BrowseImpLevelWorkingAction.LoadImpLevelWorking()
      );
    }
    if (activeTab === 'activey-frquency') {
      return dispatch(
        new BrowseActivityFrquencyAction.LoadActivityFrquency()
      );
    }
    if (activeTab === 'impact-analysis') {
      return dispatch([new BrowseImpactMatrixAction.LoadImpactMatrix(), new BrowseImpactLevelAction.LoadImpactLevel()]

      );

    }
    if (activeTab === 'org-details') {
        const loggedinUserId = this.auth.getClaim('orgId');
        return dispatch(
        new BrowseOrgDetailAction.GetOrgDetail({id: loggedinUserId})
      );
    }
    if (activeTab === 'impact-level') {
      return dispatch(
        new BrowseImpactLevelAction.LoadImpactLevel()
      );
    }
    if (activeTab === 'activey-priority') {
      return dispatch(
        new BrowseActivityPrioritySeqAction.LoadActivityPrioritySeq()
      );
    }
  }
}
