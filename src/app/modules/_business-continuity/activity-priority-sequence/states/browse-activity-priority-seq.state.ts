import {PageRequestModel} from "@core/models/page-request.model";
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from "@ngxs/store";
import {MessageHelper} from "@core/helpers/message.helper";
import {ApiHelper} from "@core/helpers/api.helper";
import {ActivatedRoute, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {iif, patch} from "@ngxs/store/operators";
import {EMPTY} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {BrowseActivityPrioritySeqAction} from "./browse-activity-priority-seq.action";
import {ActivityPrioritySeqAction} from "@core/states/bc/activity-priority-seq/activity-priority-seq.action";


export interface BrowseActivityPrioritySeqStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_ACTIVITY_PRIORITY_SEQ_UI_STATE_TOKEN =
  new StateToken<BrowseActivityPrioritySeqStateModel>('browse_ActivityPrioritySeq');

@State<BrowseActivityPrioritySeqStateModel>({
  name: BROWSE_ACTIVITY_PRIORITY_SEQ_UI_STATE_TOKEN,
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
export class BrowseActivityPrioritySeqState {
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
  @Selector([BrowseActivityPrioritySeqState])
  static state(state: BrowseActivityPrioritySeqStateModel): BrowseActivityPrioritySeqStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseActivityPrioritySeqAction.LoadActivityPrioritySeq)
  LoadActivityPrioritySeq(
    {setState, dispatch, getState}: StateContext<BrowseActivityPrioritySeqStateModel>,
    {payload}: BrowseActivityPrioritySeqAction.LoadActivityPrioritySeq
  ) {
    setState(
      patch<BrowseActivityPrioritySeqStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new ActivityPrioritySeqAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        // filters: this.filters(pageRequest),
      })
    );
  }

  @Action(BrowseActivityPrioritySeqAction.CreateActivityPrioritySeq)
  createRto(
    { dispatch }: StateContext<BrowseActivityPrioritySeqStateModel>,
    { payload }: BrowseActivityPrioritySeqAction.CreateActivityPrioritySeq
  ) {
    return dispatch(new ActivityPrioritySeqAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseActivityPrioritySeqAction.LoadActivityPrioritySeq(),
          new BrowseActivityPrioritySeqAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseActivityPrioritySeqAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseActivityPrioritySeqStateModel>,
    { payload }: BrowseActivityPrioritySeqAction.ToggleDialog
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

  @Action(BrowseActivityPrioritySeqAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseActivityPrioritySeqStateModel>,
    { payload }: BrowseActivityPrioritySeqAction.OpenView
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
