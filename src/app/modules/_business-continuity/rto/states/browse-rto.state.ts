import {PageRequestModel} from '@core/models/page-request.model';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageHelper} from "@core/helpers/message.helper";
import {iif, patch} from "@ngxs/store/operators";
import {BrowseRtoAction} from "./browse-rto.action";
import {RtoAction} from "@core/states/bc/rto/rto.action";
import {ApiHelper} from "@core/helpers/api.helper";
import {catchError, finalize, tap} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {Store} from "@ngrx/store";
import {BrowseBusinessContinuityState} from "../../states/browse-business-continuity.state";


export interface BrowseRtoStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_RTO_UI_STATE_TOKEN =
  new StateToken<BrowseRtoStateModel>('browse_rto');

@State<BrowseRtoStateModel>({
  name: BROWSE_RTO_UI_STATE_TOKEN,
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
export class BrowseRtoState {
  /**
   *
   */
  constructor(
    private messageHelper: MessageHelper,
    private router: Router,
    private apiHelper: ApiHelper,
    private route: ActivatedRoute,
    private store: Store
  ) {
  }

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseRtoState])
  static state(state: BrowseRtoStateModel): BrowseRtoStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseRtoAction.LoadRto)
  LoadRto(
    { setState, dispatch, getState }: StateContext<BrowseRtoStateModel>,
    { payload }: BrowseRtoAction.LoadRto
  ) {
    setState(
      patch<BrowseRtoStateModel>({
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
  }

  @Action(BrowseRtoAction.CreateRto)
  createRto(
    { dispatch, getState }: StateContext<BrowseRtoStateModel>,
    { payload }: BrowseRtoAction.CreateRto
  ) {
    // const versionId = this.store.selectSnapshot(BrowseBusinessContinuityState.getState).versionId;
    return dispatch(new RtoAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseRtoAction.LoadRto(),
          new BrowseRtoAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseRtoAction.UpdateRto)
  updateRto(
    { dispatch }: StateContext<BrowseRtoStateModel>,
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
  }

  @Action(BrowseRtoAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {dispatch}: StateContext<BrowseRtoStateModel>,
    { payload }: BrowseRtoAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.rtoId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseRtoAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseRtoStateModel>,
    { payload }: BrowseRtoAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.rtoId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
