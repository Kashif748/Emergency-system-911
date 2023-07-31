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
import { catchError, finalize, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { BrowseActivityAnalysisState } from '../../../states/browse-activity-analysis.state';
import { ActivityDependenciesAction } from '@core/states/activity-analysis/dependencies/dependencies.action';

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
    const cycleId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.cycleId
    );
    const activityId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.activityId
    );

    return dispatch(
      new ActivityDependenciesAction.LoadDependencyInternal({
        cycleId: cycleId,
        activityId: activityId,
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
    const cycleId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.cycleId
    );
    const activityId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.activityId
    );

    return dispatch(
      new ActivityDependenciesAction.LoadDependencyOrg({
        cycleId: cycleId,
        activityId: activityId,
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
    const cycleId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.cycleId
    );
    const activityId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.activityId
    );
    payload = {
      ...payload,
      cycle: {
        id: cycleId,
      },
      activity: {
        internal: true,
        id: activityId,
      },
    };
    return dispatch(
      new ActivityDependenciesAction.CreateInternal(payload)
    ).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseActivityDependenciesAction.LoadDependencyInternal(),
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
    const cycleId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.cycleId
    );
    const activityId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.activityId
    );

    return dispatch(
      new ActivityDependenciesAction.LoadDependencyExternal({
        cycleId: cycleId,
        activityId: activityId,
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
    const cycleId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.cycleId
    );
    const activityId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.activityId
    );
    payload = {
      ...payload,
      cycle: {
        id: cycleId,
      },
      activity: {
        internal: true,
        id: activityId,
      },
    };
    return dispatch(
      new ActivityDependenciesAction.CreateExternal(payload)
    ).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseActivityDependenciesAction.LoadDependencyExternal(),
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
    const cycleId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.cycleId
    );
    const activityId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.activityId
    );
    payload = {
      ...payload,
      cycle: {
        id: cycleId,
      },
      activity: {
        internal: true,
        id: activityId,
      },
    };
    return dispatch(new ActivityDependenciesAction.CreateOrg(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseActivityDependenciesAction.LoadDependencyOrg(),
          new BrowseActivityDependenciesAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
}
