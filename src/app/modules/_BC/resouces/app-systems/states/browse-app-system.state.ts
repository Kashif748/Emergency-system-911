import {PageRequestModel} from '@core/models/page-request.model';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageHelper} from '@core/helpers/message.helper';
import {ApiHelper} from '@core/helpers/api.helper';
import {iif, patch} from "@ngxs/store/operators";
import {BrowseRemoteWorkStateModel} from "../../remote-work/states/browse-remote-work.state";
import {EMPTY} from "rxjs";
import {catchError, finalize, tap} from "rxjs/operators";
import {BrowseAppSystemAction} from "./browse-app-system.action";
import {AppSystemAction} from "@core/states/bc-resources/app-system/app-system.action";

export interface BrowseAppSystemStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_APP_SYSTEM_UI_STATE_TOKEN = new StateToken<BrowseAppSystemStateModel>(
  'browse_app_system'
);

@State<BrowseAppSystemStateModel>({
  name: BROWSE_APP_SYSTEM_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: ['recordName', 'recordType', 'criticality'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseAppSystemState {
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
  @Selector([BrowseAppSystemState])
  static state(state: BrowseAppSystemStateModel): BrowseAppSystemStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseAppSystemAction.LoadAppSys)
  loadAppSys(
    { setState, dispatch, getState }: StateContext<BrowseAppSystemStateModel>,
    { payload }: BrowseAppSystemAction.LoadAppSys
  ) {
    setState(
      patch<BrowseAppSystemStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new AppSystemAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        resourceId: payload.resourceId,
      })
    );
  }

  @Action(BrowseAppSystemAction.LoadMinLicense)
  loadMinLicense(
    { setState, dispatch, getState }: StateContext<BrowseAppSystemStateModel>,
    { payload }: BrowseAppSystemAction.LoadMinLicense
  ) {
    setState(
      patch<BrowseAppSystemStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new AppSystemAction.LoadMinLicense({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
      })
    );
  }
  @Action(BrowseAppSystemAction.CreateAppSys)
  createAppSys(
    { dispatch }: StateContext<BrowseRemoteWorkStateModel>,
    { payload }: BrowseAppSystemAction.CreateAppSys
  ) {
    return dispatch(new AppSystemAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseAppSystemAction.LoadAppSys(),
          new BrowseAppSystemAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseAppSystemAction.UpdateAppSys)
  updateAppSys(
    { dispatch }: StateContext<BrowseRemoteWorkStateModel>,
    { payload }: BrowseAppSystemAction.UpdateAppSys
  ) {
    return dispatch(new AppSystemAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseAppSystemAction.LoadAppSys());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseAppSystemAction.ToggleDialog({}));
      })
    );
  }
  @Action(BrowseAppSystemAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    { dispatch }: StateContext<BrowseAppSystemStateModel>,
    { payload }: BrowseAppSystemAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.appSystemId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseAppSystemAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseAppSystemStateModel>,
    { payload }: BrowseAppSystemAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.appSystemId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
