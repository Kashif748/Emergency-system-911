import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelper } from '@core/helpers/api.helper';
import { MessageHelper } from '@core/helpers/message.helper';
import { PageRequestModel } from '@core/models/page-request.model';
import { UserAction } from '@core/states/user/user.action';
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
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { BrowseUsersAction } from './browse-users.action';

export interface BrowseUsersStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_USERS_UI_STATE_TOKEN =
  new StateToken<BrowseUsersStateModel>('browse_users');

@State<BrowseUsersStateModel>({
  name: BROWSE_USERS_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: [
      'nameAr',
      'nameEn',
      'org',
      'emiratesId',
      'userName',
      'title',
      'role',
    ],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseUsersState {
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
  @Selector([BrowseUsersState])
  static state(state: BrowseUsersStateModel): BrowseUsersStateModel {
    return state;
  }

  @Selector([BrowseUsersState])
  static hasFilters(state: BrowseUsersStateModel): boolean {
    return (
      Object.keys(state.pageRequest.filters).filter((k) => k !== 'active')
        .length > 0
    );
  }
  /* ********************** ACTIONS ************************* */
  @Action(BrowseUsersAction.LoadUsers)
  loadUsers(
    { setState, dispatch, getState }: StateContext<BrowseUsersStateModel>,
    { payload }: BrowseUsersAction.LoadUsers
  ) {
    setState(
      patch<BrowseUsersStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new UserAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
          orgIds: pageRequest.filters.orgIds?.map((o) => o.key),
          roleIds: pageRequest.filters.roleIds?.map((r) => r.id),
        },
      })
    );
  }

  @Action(BrowseUsersAction.SortUsers)
  sortUsers(
    { setState, dispatch, getState }: StateContext<BrowseUsersStateModel>,
    { payload }: BrowseUsersAction.SortUsers
  ) {
    setState(
      patch<BrowseUsersStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new UserAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
          orgIds: pageRequest.filters.orgIds?.map((o) => o.key),
          roleIds: pageRequest.filters.roleIds?.map((r) => r.id),
        },
      })
    );
  }

  @Action(BrowseUsersAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseUsersStateModel>,
    { payload }: BrowseUsersAction.ChangeColumns
  ) {
    setState(
      patch<BrowseUsersStateModel>({
        columns: payload.columns,
      })
    );
  }

  @Action(BrowseUsersAction.ChangeView)
  changeView(
    { setState }: StateContext<BrowseUsersStateModel>,
    { payload }: BrowseUsersAction.ChangeView
  ) {
    setState(
      patch<BrowseUsersStateModel>({
        view: payload.view,
      })
    );
  }

  @Action(BrowseUsersAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowseUsersStateModel>,
    { payload }: BrowseUsersAction.UpdateFilter
  ) {
    setState(
      patch<BrowseUsersStateModel>({
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

  @Action(BrowseUsersAction.Export, { cancelUncompleted: true })
  export(
    { getState, dispatch }: StateContext<BrowseUsersStateModel>,
    { payload }: BrowseUsersAction.Export
  ) {
    const pageRequest = getState().pageRequest;
    return dispatch(
      new UserAction.Export({
        type: payload.type,
        filters: pageRequest.filters,
      })
    );
  }

  @Action(BrowseUsersAction.CreateUser)
  createUser(
    { dispatch }: StateContext<BrowseUsersStateModel>,
    { payload }: BrowseUsersAction.CreateUser
  ) {
    return dispatch(new UserAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseUsersAction.LoadUsers());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseUsersAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseUsersAction.UpdateUser)
  updateUser(
    { dispatch }: StateContext<BrowseUsersStateModel>,
    { payload }: BrowseUsersAction.UpdateUser
  ) {
    return dispatch(new UserAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseUsersAction.LoadUsers());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseUsersAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseUsersAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseUsersStateModel>,
    { payload }: BrowseUsersAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.userId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseUsersAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseUsersStateModel>,
    { payload }: BrowseUsersAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.userId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseUsersAction.UploadSignature)
  uploadSignature(
    { dispatch }: StateContext<BrowseUsersStateModel>,
    { payload }: BrowseUsersAction.UploadSignature
  ) {
    return dispatch(new UserAction.UploadSignature(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseUsersAction.LoadUsers());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseUsersAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseUsersAction.UploadProfilePhoto)
  uploadProfilePhotoF(
    { dispatch }: StateContext<BrowseUsersStateModel>,
    { payload }: BrowseUsersAction.UploadSignature
  ) {
    return dispatch(new UserAction.UploadProfilePhoto(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseUsersAction.LoadUsers());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseUsersAction.ToggleDialog({}));
      })
    );
  }
}
