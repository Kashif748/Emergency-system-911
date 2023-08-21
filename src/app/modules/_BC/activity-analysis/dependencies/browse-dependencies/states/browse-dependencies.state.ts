import { PageRequestModel } from '@core/models/page-request.model';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from '@core/helpers/message.helper';
import { iif, patch } from '@ngxs/store/operators';
import { ApiHelper } from '@core/helpers/api.helper';

import { BrowseActivityDependenciesAction } from './browse-dependencies.action';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ActivityDependenciesAction } from '@core/states/activity-analysis/dependencies/dependencies.action';
import { DEPENDENCIES_TYPES } from '@core/states/activity-analysis/dependencies/dependencies.state';

export interface BrowseActivityDependenciesStateModel {
  internalPageRequest: PageRequestModel;
  externalPageRequest: PageRequestModel;
  orgPageRequest: PageRequestModel;
}

export const BROWSE_DEPENDENCIES_UI_STATE_TOKEN =
  new StateToken<BrowseActivityDependenciesStateModel>('browse_dependencies');

@State<BrowseActivityDependenciesStateModel>({
  name: BROWSE_DEPENDENCIES_UI_STATE_TOKEN,
  defaults: {
    internalPageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    externalPageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    orgPageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseActivityDependenciesState {
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
  @Selector([BrowseActivityDependenciesState])
  static state(
    state: BrowseActivityDependenciesStateModel
  ): BrowseActivityDependenciesStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */

  @Action(BrowseActivityDependenciesAction.LoadDependencyInternal)
  LoadDependencyInternal(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseActivityDependenciesStateModel>,
    { payload }: BrowseActivityDependenciesAction.LoadDependencyInternal
  ) {
    setState(
      patch<BrowseActivityDependenciesStateModel>({
        internalPageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().internalPageRequest;
    return dispatch(
      new ActivityDependenciesAction.LoadDependencyInternal({
        cycleId: payload.cycleId,
        activityId: payload.activityId,
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
      })
    );
  }

  @Action(BrowseActivityDependenciesAction.LoadDependencyOrg)
  LoadDependencyOrg(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseActivityDependenciesStateModel>,
    { payload }: BrowseActivityDependenciesAction.LoadDependencyOrg
  ) {
    setState(
      patch<BrowseActivityDependenciesStateModel>({
        orgPageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().orgPageRequest;

    return dispatch(
      new ActivityDependenciesAction.LoadDependencyOrg({
        cycleId: payload.cycleId,
        activityId: payload.activityId,
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
      })
    );
  }

  @Action(BrowseActivityDependenciesAction.CreateInternal)
  CreateInternal(
    { dispatch }: StateContext<BrowseActivityDependenciesStateModel>,
    { payload }: BrowseActivityDependenciesAction.CreateInternal
  ) {
    return dispatch(
      new ActivityDependenciesAction.CreateInternal(payload)
    ).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseActivityDependenciesAction.LoadDependencyInternal({
            cycleId: payload.cycle?.id,
            activityId: payload.activity?.id,
          }),
          new BrowseActivityDependenciesAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseActivityDependenciesAction.LoadDependencyExternal)
  LoadDependencyExternal(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseActivityDependenciesStateModel>,
    { payload }: BrowseActivityDependenciesAction.LoadDependencyExternal
  ) {
    setState(
      patch<BrowseActivityDependenciesStateModel>({
        externalPageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().externalPageRequest;

    return dispatch(
      new ActivityDependenciesAction.LoadDependencyExternal({
        cycleId: payload.cycleId,
        activityId: payload.activityId,
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
      })
    );
  }
  @Action(BrowseActivityDependenciesAction.CreateExternal)
  CreateExternal(
    { dispatch }: StateContext<BrowseActivityDependenciesStateModel>,
    { payload }: BrowseActivityDependenciesAction.CreateExternal
  ) {
    return dispatch(
      new ActivityDependenciesAction.CreateExternal(payload)
    ).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseActivityDependenciesAction.LoadDependencyExternal({
            cycleId: payload.cycle?.id,
            activityId: payload.activity?.id,
          }),
          new BrowseActivityDependenciesAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseActivityDependenciesAction.ToggleDialog, {
    cancelUncompleted: true,
  })
  openDialog(
    {}: StateContext<BrowseActivityDependenciesStateModel>,
    { payload }: BrowseActivityDependenciesAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',

        _dependType: payload?._dependType,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseActivityDependenciesAction.CreateOrg)
  CreateOrg(
    { dispatch }: StateContext<BrowseActivityDependenciesStateModel>,
    { payload }: BrowseActivityDependenciesAction.CreateOrg
  ) {
    return dispatch(new ActivityDependenciesAction.CreateOrg(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseActivityDependenciesAction.LoadDependencyOrg({
            cycleId: payload.cycle?.id,
            activityId: payload.activity?.id,
          }),
          new BrowseActivityDependenciesAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseActivityDependenciesAction.DeleteDependencies)
  DeleteDependencies(
    { dispatch }: StateContext<BrowseActivityDependenciesStateModel>,
    { payload }: BrowseActivityDependenciesAction.DeleteDependencies
  ) {
    let deleteAction;
    let loadAction;
    switch (payload.dependType) {
      case DEPENDENCIES_TYPES.DEPENDENCY_INTERNAL:
        deleteAction = new ActivityDependenciesAction.DeleteInternal({
          id: payload.id,
        });
        loadAction =
          new BrowseActivityDependenciesAction.LoadDependencyInternal({
            cycleId: payload.cycleId,
            activityId: payload.activityId,
          });

        break;
      case DEPENDENCIES_TYPES.DEPENDENCY_EXTERNAL:
        deleteAction = new ActivityDependenciesAction.DeleteExternal({
          id: payload.id,
        });
        loadAction =
          new BrowseActivityDependenciesAction.LoadDependencyExternal({
            cycleId: payload.cycleId,
            activityId: payload.activityId,
          });
        break;
      case DEPENDENCIES_TYPES.DEPENDENCY_ORG:
        deleteAction = new ActivityDependenciesAction.DeleteOrg({
          id: payload.id,
        });
        loadAction = new BrowseActivityDependenciesAction.LoadDependencyOrg({
          cycleId: payload.cycleId,
          activityId: payload.activityId,
        });

        break;
      default:
        break;
    }
    if (!deleteAction || !loadAction) return;
    return dispatch(deleteAction).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(loadAction);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
}
