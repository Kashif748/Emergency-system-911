import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiHelper} from '@core/helpers/api.helper';
import {MessageHelper} from '@core/helpers/message.helper';
import {PageRequestModel} from '@core/models/page-request.model';
import {TextUtils} from '@core/utils';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {iif, patch} from '@ngxs/store/operators';
import {EMPTY, throwError} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {BrowseVenderAction} from "./browse-vender.action";
import {VenderAction} from "@core/states/bc-setup/venders/vender.action";
import {SystemsAction} from "@core/states/bc-setup/systems/systems.action";
import {BrowseLocationsAction} from "../../location/states/browse-locations.action";
import {BrowseLocationsStateModel} from "../../location/states/browse-locations.state";

export interface BrowseVenderStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_VENDER_UI_STATE_TOKEN =
  new StateToken<BrowseVenderStateModel>('browse_vender');

@State<BrowseVenderStateModel>({
  name: BROWSE_VENDER_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: [
      'id',
      'companyName',
      'critical',
      'address',
    ],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseVenderState {
  /**
   *
   */
  constructor(
    private apiHelper: ApiHelper,
    private messageHelper: MessageHelper,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([BrowseVenderState])
  static state(state: BrowseVenderState): BrowseVenderState {
    return state;
  }

  @Selector([BrowseVenderState])
  static hasFilters(state: BrowseVenderStateModel): boolean {
    return (
      Object.keys(state.pageRequest.filters).filter(
        (k) =>
          k !== 'type' &&
          !TextUtils.IsEmptyOrWhiteSpaces(state.pageRequest.filters[k])
      ).length > 0
    );
  }
  /* ********************** ACTIONS ************************* */
  @Action(BrowseVenderAction.LoadVender)
  loadVender(
    { setState, dispatch, getState }: StateContext<BrowseVenderStateModel>,
    { payload }: BrowseVenderAction.LoadVender
  ) {
    setState(
      patch<BrowseVenderStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(
            (_) => !!payload?.pageRequest,
            payload?.pageRequest?.first
          ),
          rows: iif((_) => !!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new VenderAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
          isCritical: pageRequest.filters?.isCritical ? pageRequest.filters.isCritical?.id === 1 ? true : false : pageRequest.filters?.isCritical,
        },
      })
    );
  }

  @Action(BrowseVenderAction.SortVender)
  sortVender(
    { setState, dispatch, getState }: StateContext<BrowseVenderStateModel>,
    { payload }: BrowseVenderAction.SortVender
  ) {
    setState(
      patch<BrowseVenderStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new VenderAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
        },
      })
    );
  }

  @Action(BrowseVenderAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseVenderStateModel>,
    { payload }: BrowseVenderAction.ChangeColumns
  ) {
    setState(
      patch<BrowseVenderStateModel>({
        columns: payload.columns,
      })
    );
  }

  @Action(BrowseVenderAction.ChangeView)
  changeView(
    { setState }: StateContext<BrowseVenderStateModel>,
    { payload }: BrowseVenderAction.ChangeView
  ) {
    setState(
      patch<BrowseVenderStateModel>({
        view: payload.view,
      })
    );
  }

  @Action(BrowseVenderAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowseVenderStateModel>,
    { payload }: BrowseVenderAction.UpdateFilter
  ) {
    setState(
      patch<BrowseVenderStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: 0,
          filters: iif(
            payload.clear === true,
            {},
            patch({
              ...payload,
            })
          ),
        }),
      })
    );
  }

  @Action(BrowseVenderAction.CreateVender)
  createVender(
    { dispatch }: StateContext<BrowseVenderStateModel>,
    { payload }: BrowseVenderAction.CreateVender
  ) {
    return dispatch(new VenderAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(
          [new BrowseVenderAction.LoadVender(),
            new BrowseVenderAction.ToggleDialog({})]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return throwError(err);
      })
    );
  }

  @Action(BrowseVenderAction.UpdateVender)
  updateVender(
    { dispatch }: StateContext<BrowseVenderStateModel>,
    { payload }: BrowseVenderAction.UpdateVender
  ) {
    return dispatch(new VenderAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseVenderAction.LoadVender());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return throwError(err);
      }),
      finalize(() => {
        dispatch(new BrowseVenderAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseVenderAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseVenderStateModel>,
    { payload }: BrowseVenderAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.venderId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseVenderAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseVenderStateModel>,
    { payload }: BrowseVenderAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.venderId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
  @Action(BrowseVenderAction.DeleteVender)
  deleteVender(
    { dispatch }: StateContext<BrowseVenderStateModel>,
    { payload }: BrowseVenderAction.DeleteVender
  ) {
    return dispatch(new VenderAction.Delete(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseVenderAction.LoadVender());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
}
