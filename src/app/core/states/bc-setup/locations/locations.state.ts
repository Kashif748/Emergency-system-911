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
import { patch } from '@ngxs/store/operators';
import { catchError, finalize, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { BrowseBusinessContinuityState } from '../../../../modules/_business-continuity/states/browse-business-continuity.state';
import { BcLocations, PageBcLocations } from 'src/app/api/models';
import { BcLocationsControllerService } from 'src/app/api/services';
import { LocationsAction } from './locations.action';

export interface LocationsStateModel {
  page: PageBcLocations;
  location: BcLocations;
  loading: boolean;
  blocking: boolean;
}

const LOCATIONS_STATE_TOKEN = new StateToken<LocationsStateModel>('locations');

@State<LocationsStateModel>({ name: LOCATIONS_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class LocationsState {
  /**
   *
   */
  constructor(
    private locationService: BcLocationsControllerService,
    private store: Store
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([LocationsState])
  static page(state: LocationsStateModel) {
    return state?.page?.content;
  }

  @Selector([LocationsState])
  static location(state: LocationsStateModel) {
    return state?.location;
  }

  @Selector([LocationsState])
  static totalRecords(state: LocationsStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([LocationsState])
  static loading(state: LocationsStateModel) {
    return state?.loading;
  }

  @Selector([LocationsState])
  static blocking(state: LocationsStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(LocationsAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<LocationsStateModel>,
    { payload }: LocationsAction.LoadPage
  ) {
    setState(
      patch<LocationsStateModel>({
        loading: true,
      })
    );

    return this.locationService
      .search8({
        isActive: true,
        name: payload.filters?.name ?? '',
        locationTypeId: payload.filters?.locationTypeId ?? '',

        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<LocationsStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<LocationsStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<LocationsStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(LocationsAction.Create)
  create(
    { setState }: StateContext<LocationsStateModel>,
    { payload }: LocationsAction.Create
  ) {
    setState(
      patch<LocationsStateModel>({
        blocking: true,
      })
    );
    return this.locationService
      .insertOne8({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<LocationsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(LocationsAction.Update)
  update(
    { setState }: StateContext<LocationsStateModel>,
    { payload }: LocationsAction.Update
  ) {
    setState(
      patch<LocationsStateModel>({
        blocking: true,
      })
    );

    return this.locationService
      .update87({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<LocationsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(LocationsAction.GetLocation, { cancelUncompleted: true })
  getLocation(
    { setState }: StateContext<LocationsStateModel>,
    { payload }: LocationsAction.GetLocation
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<LocationsStateModel>({
          location: undefined,
        })
      );
      return;
    }
    setState(
      patch<LocationsStateModel>({
        blocking: true,
      })
    );
    return this.locationService.getOne8({ id: payload.id }).pipe(
      tap((location) => {
        setState(
          patch<LocationsStateModel>({
            location: location.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<LocationsStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
