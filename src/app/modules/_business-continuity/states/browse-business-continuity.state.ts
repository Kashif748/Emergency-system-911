import {PageRequestModel} from '@core/models/page-request.model';
import {Selector, SelectorOptions, State, StateToken} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageHelper} from "@core/helpers/message.helper";
import {ApiHelper} from "@core/helpers/api.helper";


export interface BrowseBusinessContinuityStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_BUSINESS_CONTINUITY_UI_STATE_TOKEN =
  new StateToken<BrowseBusinessContinuityStateModel>('browse_businessContinuity');

@State<BrowseBusinessContinuityStateModel>({
  name: BROWSE_BUSINESS_CONTINUITY_UI_STATE_TOKEN,
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
export class BrowseBusinessContinuityState {
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
  @Selector([BrowseBusinessContinuityState])
  static state(state: BrowseBusinessContinuityStateModel): BrowseBusinessContinuityStateModel {
    return state;
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

  /*@Action(BrowseRtoAction.CreateRto)
  createRto(
    { dispatch }: StateContext<BrowseBusinessContinuityStateModel>,
    { payload }: BrowseRtoAction.CreateRto
  ) {
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
  }*/

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

  /*@Action(BrowseRtoAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseBusinessContinuityStateModel>,
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
  }*/

  /*@Action(BrowseRtoAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseBusinessContinuityStateModel>,
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
  }*/
}
