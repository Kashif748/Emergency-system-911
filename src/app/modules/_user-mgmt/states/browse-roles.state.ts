import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelper } from '@core/helpers/api.helper';
import { MessageHelper } from '@core/helpers/message.helper';
import { PageRequestModel } from '@core/models/page-request.model';
import { RoleAction } from '@core/states';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { iif, patch } from '@ngxs/store/operators';
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { BrowseRolesAction } from './browse-roles.action';

export interface BrowseRolesStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_ROLES_UI_STATE_TOKEN =
  new StateToken<BrowseRolesStateModel>('browse_roles');

@State<BrowseRolesStateModel>({
  name: BROWSE_ROLES_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: ['nameAr', 'nameEn', 'org', 'inherited', 'privileges'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseRolesState {
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
  @Selector([BrowseRolesState])
  static state(state: BrowseRolesStateModel): BrowseRolesStateModel {
    return state;
  }

  @Selector([BrowseRolesState])
  static hasFilters(state: BrowseRolesStateModel): boolean {
    return (
      Object.keys(state.pageRequest.filters).filter((k) => k !== 'status')
        .length > 0
    );
  }
  /* ********************** ACTIONS ************************* */
  @Action(BrowseRolesAction.LoadRoles)
  loadRoles(
    { setState, dispatch, getState }: StateContext<BrowseRolesStateModel>,
    { payload }: BrowseRolesAction.LoadRoles
  ) {
    setState(
      patch<BrowseRolesStateModel>({
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
      new RoleAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
          orgIds: pageRequest.filters.orgIds?.map((o) => o.key),
        },
      })
    );
  }

  @Action(BrowseRolesAction.SortRoles)
  sortRoles(
    { setState, dispatch, getState }: StateContext<BrowseRolesStateModel>,
    { payload }: BrowseRolesAction.SortRoles
  ) {
    setState(
      patch<BrowseRolesStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new RoleAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
          orgIds: pageRequest.filters.orgIds?.map((o) => o.key),
        },
      })
    );
  }

  @Action(BrowseRolesAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseRolesStateModel>,
    { payload }: BrowseRolesAction.ChangeColumns
  ) {
    setState(
      patch<BrowseRolesStateModel>({
        columns: payload.columns,
      })
    );
  }

  @Action(BrowseRolesAction.ChangeView)
  changeView(
    { setState }: StateContext<BrowseRolesStateModel>,
    { payload }: BrowseRolesAction.ChangeView
  ) {
    setState(
      patch<BrowseRolesStateModel>({
        view: payload.view,
      })
    );
  }

  @Action(BrowseRolesAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowseRolesStateModel>,
    { payload }: BrowseRolesAction.UpdateFilter
  ) {
    setState(
      patch<BrowseRolesStateModel>({
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

  @Action(BrowseRolesAction.CreateRole)
  createRole(
    { dispatch }: StateContext<BrowseRolesStateModel>,
    { payload }: BrowseRolesAction.CreateRole
  ) {
    return dispatch(new RoleAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseRolesAction.LoadRoles());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseRolesAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseRolesAction.UpdateRole)
  updateRole(
    { dispatch }: StateContext<BrowseRolesStateModel>,
    { payload }: BrowseRolesAction.UpdateRole
  ) {
    return dispatch(new RoleAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseRolesAction.LoadRoles());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseRolesAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseRolesAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseRolesStateModel>,
    { payload }: BrowseRolesAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.roleId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseRolesAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseRolesStateModel>,
    { payload }: BrowseRolesAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.roleId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
