import { PageRequestModel } from '@core/models/page-request.model';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from '@core/helpers/message.helper';
import { iif, patch } from '@ngxs/store/operators';
import { ApiHelper } from '@core/helpers/api.helper';
import { catchError, finalize, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import { BrowseSystemsAction } from './browse-systems.action';
import { SystemsAction } from '@core/states/bc-setup/systems/systems.action';

export interface BrowseSystemsStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_SYSTEMS_UI_STATE_TOKEN =
  new StateToken<BrowseSystemsStateModel>('bc_setup_browse_systems');

@State<BrowseSystemsStateModel>({
  name: BROWSE_SYSTEMS_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: ['dept', 'name'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseSystemsState {
  /**
   *
   */
  constructor(
    private messageHelper: MessageHelper,
    private router: Router,
    private apiHelper: ApiHelper,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseSystemsState])
  static state(state: BrowseSystemsStateModel): BrowseSystemsStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseSystemsAction.LoadSystems)
  loadSystems(
    { setState, dispatch, getState }: StateContext<BrowseSystemsStateModel>,
    { payload }: BrowseSystemsAction.LoadSystems
  ) {
    setState(
      patch<BrowseSystemsStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new SystemsAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: pageRequest.filters,
      })
    );
  }

  @Action(BrowseSystemsAction.CreateSystem)
  CreateSystem(
    { dispatch, getState }: StateContext<BrowseSystemsStateModel>,
    { payload }: BrowseSystemsAction.CreateSystem
  ) {
    // const versionId = this.store.selectSnapshot(BrowseBusinessContinuityState.getState).versionId;
    return dispatch(new SystemsAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseSystemsAction.LoadSystems(),
          new BrowseSystemsAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseSystemsAction.UpdateSystem)
  UpdateSystem(
    { dispatch }: StateContext<BrowseSystemsStateModel>,
    { payload }: BrowseSystemsAction.UpdateSystem
  ) {
    return dispatch(new SystemsAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseSystemsAction.LoadSystems());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseSystemsAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseSystemsAction.DeleteSystem)
  DeleteSystem(
    { dispatch }: StateContext<BrowseSystemsStateModel>,
    { payload }: BrowseSystemsAction.DeleteSystem
  ) {
    return dispatch(new SystemsAction.Delete(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseSystemsAction.LoadSystems());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseSystemsAction.GetSystem, { cancelUncompleted: true })
  GetSystem(
    { dispatch }: StateContext<BrowseSystemsStateModel>,
    { payload }: SystemsAction.GetSystem
  ) {
    return dispatch(new SystemsAction.GetSystem(payload));
  }
  @Action(BrowseSystemsAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    { dispatch }: StateContext<BrowseSystemsStateModel>,
    { payload }: BrowseSystemsAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.systemId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseSystemsAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseSystemsStateModel>,
    { payload }: BrowseSystemsAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.systemId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
  @Action(BrowseSystemsAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseSystemsStateModel>,
    { payload }: BrowseSystemsAction.ChangeColumns
  ) {
    setState(
      patch<BrowseSystemsStateModel>({
        columns: payload.columns,
      })
    );
  }

  @Action(BrowseSystemsAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowseSystemsStateModel>,
    { payload }: BrowseSystemsAction.UpdateFilter
  ) {
    setState(
      patch<BrowseSystemsStateModel>({
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
  @Action(BrowseSystemsAction.ChangeView)
  changeView(
    { setState }: StateContext<BrowseSystemsStateModel>,
    { payload }: BrowseSystemsAction.ChangeView
  ) {
    setState(
      patch<BrowseSystemsStateModel>({
        view: payload.view,
      })
    );
  }

  @Action(BrowseSystemsAction.SortSystems)
  sortLocation(
    { setState, dispatch, getState }: StateContext<BrowseSystemsStateModel>,
    { payload }: BrowseSystemsAction.SortSystems
  ) {
    setState(
      patch<BrowseSystemsStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new SystemsAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: pageRequest.filters,
      })
    );
  }
}
