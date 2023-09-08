import {PageRequestModel} from '@core/models/page-request.model';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageHelper} from '@core/helpers/message.helper';
import {ApiHelper} from '@core/helpers/api.helper';
import {EMPTY} from "rxjs";
import {catchError, finalize, tap} from "rxjs/operators";
import {iif, patch} from "@ngxs/store/operators";
import {BrowseOtherAction} from "./browse-other.action";
import {OtherAction} from "@core/states/bc-resources/other/other.action";

export interface BrowseOtherStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_OTHER_UI_STATE_TOKEN = new StateToken<BrowseOtherStateModel>(
  'browse_other'
);

@State<BrowseOtherStateModel>({
  name: BROWSE_OTHER_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: ['details', 'requireCount'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseOtherState {
  /**
   *
   */
  constructor(
    private messageHelper: MessageHelper,
    private router: Router,
    private apiHelper: ApiHelper,
    private route: ActivatedRoute
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseOtherState])
  static state(state: BrowseOtherStateModel): BrowseOtherStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseOtherAction.LoadOther)
  loadOther(
    { setState, dispatch, getState }: StateContext<BrowseOtherStateModel>,
    { payload }: BrowseOtherAction.LoadOther
  ) {
    setState(
      patch<BrowseOtherStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new OtherAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        resourceId: payload.resourceId,
      })
    );
  }
  @Action(BrowseOtherAction.CreateOther)
  createRecord(
    { dispatch }: StateContext<BrowseOtherStateModel>,
    { payload }: BrowseOtherAction.CreateOther
  ) {
    return dispatch(new OtherAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseOtherAction.LoadOther({
            resourceId: payload.resource?.id,
          }),
          new BrowseOtherAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseOtherAction.UpdateOther)
  updateRecord(
    { dispatch }: StateContext<BrowseOtherStateModel>,
    { payload }: BrowseOtherAction.UpdateOther
  ) {
    return dispatch(new OtherAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseOtherAction.LoadOther({
          resourceId: payload.resource?.id,
        }));
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseOtherAction.ToggleDialog({}));
      })
    );
  }
  @Action(BrowseOtherAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    { dispatch }: StateContext<BrowseOtherStateModel>,
    { payload }: BrowseOtherAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.otherId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseOtherAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseOtherStateModel>,
    { payload }: BrowseOtherAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.otherId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
