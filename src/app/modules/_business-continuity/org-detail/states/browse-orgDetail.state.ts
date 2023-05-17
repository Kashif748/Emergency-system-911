import {PageRequestModel} from "@core/models/page-request.model";
import {iif, patch} from "@ngxs/store/operators";
import {EMPTY} from "rxjs";
import {MessageHelper} from "@core/helpers/message.helper";
import {ApiHelper} from "@core/helpers/api.helper";
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from "@ngxs/store";
import {catchError, finalize, tap} from "rxjs/operators";
import {RtoAction} from "@core/states/bc/rto/rto.action";
import {ActivatedRoute, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {BrowseOrgDetailAction} from "./browse-orgDetail.action";
import {OrgDetailAction} from "@core/states";


export interface BrowseOrgDetailModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}


export const BROWSE_ORG_DETAIL_UI_STATE_TOKEN =
  new StateToken<BrowseOrgDetailModel>('browse_orgDetail');

@State<BrowseOrgDetailModel>({
  name: BROWSE_ORG_DETAIL_UI_STATE_TOKEN,
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
export class BrowseOrgDetailState {
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
  @Selector([BrowseOrgDetailState])
  static state(state: BrowseOrgDetailModel): BrowseOrgDetailModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseOrgDetailAction.LoadOrgDetail)
  orgDetail(
    { setState, dispatch, getState }: StateContext<BrowseOrgDetailModel>,
    { payload }: BrowseOrgDetailAction.LoadOrgDetail
  ) {
    setState(
      patch<BrowseOrgDetailModel>({
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

 /* @Action(BrowseOrgDetailAction.CreateOrgDetail)
  createRto(
    { dispatch }: StateContext<BrowseOrgDetailModel>,
    { payload }: BrowseOrgDetailAction.CreateOrgDetail
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

  @Action(BrowseOrgDetailAction.UpdateOrgDetail)
  updateOrgDetail(
    { dispatch }: StateContext<BrowseOrgDetailModel>,
    { payload }: BrowseOrgDetailAction.UpdateOrgDetail
  ) {
    return dispatch(new OrgDetailAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseOrgDetailAction.LoadOrgDetail());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        // dispatch(new BrowseRtoAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseOrgDetailAction.GetOrgDetail)
  getOrgDetail(
    { dispatch }: StateContext<BrowseOrgDetailModel>,
    { payload }: BrowseOrgDetailAction.GetOrgDetail
  ) {
    return dispatch(new OrgDetailAction.GetOrgDetail(payload)).pipe(
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        // dispatch(new BrowseRtoAction.ToggleDialog({}));
      })
    );
  }

  /*@Action(BrowseRtoAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseOrgDetailModel>,
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
    {}: StateContext<BrowseOrgDetailModel>,
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
