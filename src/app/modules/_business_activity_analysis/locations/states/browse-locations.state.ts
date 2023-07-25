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

import { BrowseActivityLocationsAction } from './browse-locations.action';
import { BrowseActivityAnalysisState } from '../../states/browse-activity-analysis.state';
import { ActivityLocationsAction } from '@core/states/activity-analysis/locations/locations.action';
import { LocationsAction } from '@core/states/bc-setup/locations/locations.action';
import { catchError, finalize, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

export interface BrowseLocationsStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_LOCATIONS_UI_STATE_TOKEN =
  new StateToken<BrowseLocationsStateModel>('browse_locations');

@State<BrowseLocationsStateModel>({
  name: BROWSE_LOCATIONS_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: ['criticality', 'rtoEn', 'description'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseActivityLocationsState {
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
  @Selector([BrowseActivityLocationsState])
  static state(state: BrowseLocationsStateModel): BrowseLocationsStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */

  @Action(BrowseActivityLocationsAction.LoadLocations)
  LoadLocations(
    { setState, dispatch, getState }: StateContext<BrowseLocationsStateModel>,
    { payload }: BrowseActivityLocationsAction.LoadLocations
  ) {
    setState(
      patch<BrowseLocationsStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    const cycleId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.cycleId
    );
    const activityId = this.store.selectSnapshot(
      BrowseActivityAnalysisState.activityId
    );

    return dispatch(
      new ActivityLocationsAction.LoadPage({
        cycleId: cycleId,
        activityId: activityId,
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        // filters: this.filters(pageRequest),
      })
    );
  }

  @Action(BrowseActivityLocationsAction.LoadBCLocations)
  LoadBCLocations(
    { setState, dispatch, getState }: StateContext<BrowseLocationsStateModel>,
    { payload }: BrowseActivityLocationsAction.LoadBCLocations
  ) {
    setState(
      patch<BrowseLocationsStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new LocationsAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        // filters: this.filters(pageRequest),
      })
    );
  }
  @Action(BrowseActivityLocationsAction.Create)
  Create(
    { dispatch, getState }: StateContext<BrowseLocationsStateModel>,
    { payload }: BrowseActivityLocationsAction.Create
  ) {
    return dispatch(new ActivityLocationsAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseActivityLocationsAction.LoadLocations(),
          new BrowseActivityLocationsAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseActivityLocationsAction.Update)
  Update(
    { dispatch }: StateContext<BrowseLocationsStateModel>,
    { payload }: BrowseActivityLocationsAction.Update
  ) {
    return dispatch(new ActivityLocationsAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseActivityLocationsAction.LoadLocations());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseActivityLocationsAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseActivityLocationsAction.ToggleDialog, {
    cancelUncompleted: true,
  })
  openDialog(
    {}: StateContext<BrowseLocationsStateModel>,
    { payload }: BrowseActivityLocationsAction.ToggleDialog
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
}
