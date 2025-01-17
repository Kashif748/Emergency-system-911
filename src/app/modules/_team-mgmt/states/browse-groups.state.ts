import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelper } from '@core/helpers/api.helper';
import { MessageHelper } from '@core/helpers/message.helper';
import { PageRequestModel } from '@core/models/page-request.model';
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
import { GroupAction } from '@core/states';
import { BrowseGroupsAction } from './browse-groups.action';
import { IncicentLocationInfoAction } from '@core/states/incident-location-info/incidentLocInfo.action';
import { GisAction } from '@core/states/gis/gis.action';

export interface BrowseGroupsStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_GROUPS_UI_STATE_TOKEN =
  new StateToken<BrowseGroupsStateModel>('browse_groups');

@State<BrowseGroupsStateModel>({
  name: BROWSE_GROUPS_UI_STATE_TOKEN,
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
      'leader',
      'shift_schedule',
      'usersnumber',
    ],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseGroupsState {
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
  @Selector([BrowseGroupsState])
  static state(state: BrowseGroupsStateModel): BrowseGroupsStateModel {
    return state;
  }

  @Selector([BrowseGroupsState])
  static hasFilters(state: BrowseGroupsStateModel): boolean {
    return (
      Object.keys(state.pageRequest.filters).filter((k) => k !== 'active')
        .length > 0
    );
  }
  /* ********************** ACTIONS ************************* */
  @Action(BrowseGroupsAction.LoadGroups)
  loadGroups(
    { setState, dispatch, getState }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.LoadGroups
  ) {
    setState(
      patch<BrowseGroupsStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new GroupAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
          orgId: pageRequest.filters.orgId?.key,
          incidentLocation: pageRequest.filters.incidentLocation?.id,
          incidentCategoryId: pageRequest.filters.incidentCategoryId?.id,
        },
      })
    );
  }

  @Action(BrowseGroupsAction.SortGroups)
  sortGroups(
    { setState, dispatch, getState }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.SortGroups
  ) {
    setState(
      patch<BrowseGroupsStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new GroupAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
          orgId: pageRequest.filters.orgId?.map((o) => o.key),
          incidentLocation: pageRequest.filters.incidentLocation?.id,
          incidentCategoryId: pageRequest.filters.incidentCategoryId?.id,
        },
      })
    );
  }

  @Action(BrowseGroupsAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.ChangeColumns
  ) {
    setState(
      patch<BrowseGroupsStateModel>({
        columns: payload.columns,
      })
    );
  }

  @Action(BrowseGroupsAction.ChangeView)
  changeView(
    { setState }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.ChangeView
  ) {
    setState(
      patch<BrowseGroupsStateModel>({
        view: payload.view,
      })
    );
  }

  @Action(BrowseGroupsAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.UpdateFilter
  ) {
    setState(
      patch<BrowseGroupsStateModel>({
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

  @Action(BrowseGroupsAction.Export, { cancelUncompleted: true })
  export(
    { getState, dispatch }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.Export
  ) {
    const pageRequest = getState().pageRequest;
    return dispatch(
      new GroupAction.Export({
        type: payload.type,
        filters: {
          ...pageRequest.filters,
          orgId: pageRequest.filters.orgId?.key,
          incidentLocation: pageRequest.filters.incidentLocation?.id,
          incidentCategoryId: pageRequest.filters.incidentCategoryId?.id,
        },
      })
    );
  }

  @Action(BrowseGroupsAction.CreateUser)
  createUser(
    { dispatch }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.CreateUser
  ) {
    return dispatch(
      new GroupAction.CreateUser({
        groupId: payload.groupId,
        user: payload.user,
      })
    ).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseGroupsAction.LoadGroups());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseGroupsAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseGroupsAction.CreateGroup)
  createGroup(
    { dispatch }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.CreateGroup
  ) {
    return dispatch(new GroupAction.Create(payload)).pipe(
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseGroupsAction.UpdateGroup)
  updateGroup(
    { dispatch }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.UpdateGroup
  ) {
    return dispatch(new GroupAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
    );
  }

  @Action(BrowseGroupsAction.DeletedGroup)
  deleteGroup(
    { dispatch }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.DeletedGroup
  ) {
    return dispatch(new GroupAction.Delete(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseGroupsAction.LoadGroups());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseGroupsAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseGroupsAction.UpdateUser)
  UpdateUser(
    { dispatch }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.UpdateUser
  ) {
    return dispatch(new GroupAction.UpdateUser(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseGroupsAction.LoadGroups());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseGroupsAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseGroupsAction.UpdateManager)
  UpdateManager(
    { dispatch }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.UpdateManager
  ) {
    return dispatch(new GroupAction.UpdateManager(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseGroupsAction.LoadGroups());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
      /* finalize(() => {
        dispatch(new BrowseGroupsAction.ToggleDialog({}));
      })*/
    );
  }

  @Action(BrowseGroupsAction.AddGeometryLocation)
  addGeometryLocation(
    { dispatch }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.AddGeometryLocation
  ) {
    return dispatch(new GroupAction.GroupGeometryLocation(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseGroupsAction.LoadGroups());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseGroupsAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseGroupsAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.id,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseGroupsAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.id,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseGroupsAction.AddIncidentLocInfo)
  addIncidentLocation(
    { dispatch }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.AddIncidentLocInfo
  ) {
    return dispatch(
      new IncicentLocationInfoAction.IncidentLocationInfo(payload)
    ).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseGroupsAction.LoadGroups());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseGroupsAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseGroupsAction.UpdateIncidentLocInfo)
  updateIncidentLocation(
    { dispatch }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.UpdateIncidentLocInfo
  ) {
    return dispatch(
      new IncicentLocationInfoAction.UpdateIncidentLocationInfo(payload)
    ).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseGroupsAction.LoadGroups());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseGroupsAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseGroupsAction.AddContract)
  AddContract(
    { dispatch }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.AddContract
  ) {
    return dispatch(new GroupAction.AddContract(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseGroupsAction.LoadGroups());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseGroupsAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseGroupsAction.GetContract)
  GetContract(
    { dispatch }: StateContext<BrowseGroupsStateModel>,
    { payload }: BrowseGroupsAction.GetContract
  ) {
    return dispatch(new GroupAction.GetContract(payload)).pipe(
      catchError((err) => {
        return EMPTY;
      })
    );
  }
}
