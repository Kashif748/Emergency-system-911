import {PageRequestModel} from "@core/models/page-request.model";
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from "@ngxs/store";
import {MessageHelper} from "@core/helpers/message.helper";
import {ApiHelper} from "@core/helpers/api.helper";
import {ActivatedRoute, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {iif, patch} from "@ngxs/store/operators";
import {EMPTY} from "rxjs";
import {catchError, finalize, tap} from "rxjs/operators";
import {BrowseActivityFrquencyAction} from "./browse-activity-frquency.action";
import {ActivityFrquencyAction} from "@core/states";


export interface BrowseActivityFrquencyStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_ACTIVITY_FRQUENCY_UI_STATE_TOKEN =
  new StateToken<BrowseActivityFrquencyStateModel>('browse_activityFrquency');

@State<BrowseActivityFrquencyStateModel>({
  name: BROWSE_ACTIVITY_FRQUENCY_UI_STATE_TOKEN,
  defaults: {
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
export class BrowseActivityFrquencyState {
  /**
   *
   */
  constructor(
    private messageHelper: MessageHelper,
    private router: Router,
    private apiHelper: ApiHelper,
    private route: ActivatedRoute
  ) {
  }

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseActivityFrquencyState])
  static state(state: BrowseActivityFrquencyStateModel): BrowseActivityFrquencyStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseActivityFrquencyAction.LoadActivityFrquency)
  loadActivityFrquency(
    { setState, dispatch, getState }: StateContext<BrowseActivityFrquencyStateModel>,
    { payload }: BrowseActivityFrquencyAction.LoadActivityFrquency
  ) {
    setState(
      patch<BrowseActivityFrquencyStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new ActivityFrquencyAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        // filters: this.filters(pageRequest),
      })
    );
  }

  @Action(BrowseActivityFrquencyAction.CreateActivityFrquency)
  createActivityFrq(
    { dispatch }: StateContext<BrowseActivityFrquencyStateModel>,
    { payload }: BrowseActivityFrquencyAction.CreateActivityFrquency
  ) {
    return dispatch(new ActivityFrquencyAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseActivityFrquencyAction.LoadActivityFrquency(),
          new BrowseActivityFrquencyAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseActivityFrquencyAction.UpdateActivityFrquency)
  updateActivityFrq(
    { dispatch }: StateContext<BrowseActivityFrquencyStateModel>,
    { payload }: BrowseActivityFrquencyAction.UpdateActivityFrquency
  ) {
    return dispatch(new ActivityFrquencyAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseActivityFrquencyAction.LoadActivityFrquency());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseActivityFrquencyAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseActivityFrquencyAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseActivityFrquencyStateModel>,
    { payload }: BrowseActivityFrquencyAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.id,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseActivityFrquencyAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseActivityFrquencyStateModel>,
    { payload }: BrowseActivityFrquencyAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.id,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
