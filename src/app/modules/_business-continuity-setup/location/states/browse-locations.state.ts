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
import { BrowseLocationsAction } from './browse-locations.action';
import { ApiHelper } from '@core/helpers/api.helper';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { LocationsAction } from '@core/states/bc-setup/locations/locations.action';

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
    columns: ['dept', 'name', 'type', 'district'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseLocationsState {
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
  @Selector([BrowseLocationsState])
  static state(state: BrowseLocationsStateModel): BrowseLocationsStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseLocationsAction.LoadLocations)
  loadLocations(
    { setState, dispatch, getState }: StateContext<BrowseLocationsStateModel>,
    { payload }: BrowseLocationsAction.LoadLocations
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
        filters: {
          ...pageRequest.filters,
          locationTypeId: pageRequest.filters.locationTypeId?.id,
        },
      })
    );
  }

  @Action(BrowseLocationsAction.SortLocation)
  sortLocation(
    { setState, dispatch, getState }: StateContext<BrowseLocationsStateModel>,
    { payload }: BrowseLocationsAction.SortLocation
  ) {
    setState(
      patch<BrowseLocationsStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new LocationsAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
          locationTypeId: pageRequest.filters.locationTypeId?.id,
        },
      })
    );
  }

  @Action(BrowseLocationsAction.CreateLocation)
  createLocation(
    { dispatch, getState }: StateContext<BrowseLocationsStateModel>,
    { payload }: BrowseLocationsAction.CreateLocation
  ) {
    // const versionId = this.store.selectSnapshot(BrowseBCState.getState).versionId;
    return dispatch(new LocationsAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseLocationsAction.LoadLocations(),
          new BrowseLocationsAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseLocationsAction.UpdateLocation)
  updateLocation(
    { dispatch }: StateContext<BrowseLocationsStateModel>,
    { payload }: BrowseLocationsAction.UpdateLocation
  ) {
    return dispatch(new LocationsAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseLocationsAction.LoadLocations(),
          new BrowseLocationsAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseLocationsAction.GetLocation, { cancelUncompleted: true })
  getLocation(
    { dispatch }: StateContext<BrowseLocationsStateModel>,
    { payload }: LocationsAction.GetLocation
  ) {
    return dispatch(new LocationsAction.GetLocation(payload));
  }

  @Action(BrowseLocationsAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowseLocationsStateModel>,
    { payload }: BrowseLocationsAction.UpdateFilter
  ) {
    setState(
      patch<BrowseLocationsStateModel>({
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
  @Action(BrowseLocationsAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseLocationsStateModel>,
    { payload }: BrowseLocationsAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.locationId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseLocationsAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseLocationsStateModel>,
    { payload }: BrowseLocationsAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.locationId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
  @Action(BrowseLocationsAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseLocationsStateModel>,
    { payload }: BrowseLocationsAction.ChangeColumns
  ) {
    setState(
      patch<BrowseLocationsStateModel>({
        columns: payload.columns,
      })
    );
  }
  @Action(BrowseLocationsAction.DeleteLocation)
  deleteLocation(
    { dispatch }: StateContext<BrowseLocationsStateModel>,
    { payload }: BrowseLocationsAction.DeleteLocation
  ) {
    return dispatch(new LocationsAction.Delete(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseLocationsAction.LoadLocations());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
}
