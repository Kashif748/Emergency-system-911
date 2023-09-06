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
import {BrowseInfraAction} from "./browse-infra.action";
import {InfraAction} from "@core/states/bc-resources/infra-req/infra.action";

export interface BrowseInfraStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_INFRA_UI_STATE_TOKEN = new StateToken<BrowseInfraStateModel>(
  'browse_infra'
);

@State<BrowseInfraStateModel>({
  name: BROWSE_INFRA_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: ['details', 'requiredCount', 'availableCount', 'toBePurchased'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseInfraState {
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
  @Selector([BrowseInfraState])
  static state(state: BrowseInfraStateModel): BrowseInfraStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseInfraAction.LoadInfra)
  loadRecord(
    { setState, dispatch, getState }: StateContext<BrowseRemoteWorkStateModel>,
    { payload }: BrowseInfraAction.LoadInfra
  ) {
    setState(
      patch<BrowseRemoteWorkStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new InfraAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        resourceId: payload.resourceId,
      })
    );
  }
  @Action(BrowseInfraAction.CreateInfra)
  createRecord(
    { dispatch }: StateContext<BrowseRemoteWorkStateModel>,
    { payload }: BrowseInfraAction.CreateInfra
  ) {
    return dispatch(new InfraAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseInfraAction.LoadInfra(),
          new BrowseInfraAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseInfraAction.UpdateInfra)
  updateRecord(
    { dispatch }: StateContext<BrowseRemoteWorkStateModel>,
    { payload }: BrowseInfraAction.UpdateInfra
  ) {
    return dispatch(new InfraAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseInfraAction.LoadInfra());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseInfraAction.ToggleDialog({}));
      })
    );
  }
  @Action(BrowseInfraAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    { dispatch }: StateContext<BrowseInfraStateModel>,
    { payload }: BrowseInfraAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.infraId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseInfraAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseInfraStateModel>,
    { payload }: BrowseInfraAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.infraId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
