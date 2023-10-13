import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import {
  BcActivityLocations,
  PageBcActivityLocations,
} from 'src/app/api/models';
import { BcActivityLocationsControllerService } from 'src/app/api/services';
import { ActivityLocationsAction } from './locations.action';

export interface ActivityLocationsStateModel {
  page: PageBcActivityLocations;
  activityLocation: BcActivityLocations;
  idsList: number[];

  loading: boolean;
  blocking: boolean;
}

const ACTIVITY_LOCATIONS_STATE_TOKEN =
  new StateToken<ActivityLocationsStateModel>('activityLocations');

@State<ActivityLocationsStateModel>({ name: ACTIVITY_LOCATIONS_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class ActivityLocationsState {
  /**
   *
   */
  constructor(
    private activityLocations: BcActivityLocationsControllerService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([ActivityLocationsState])
  static idsList(state: ActivityLocationsStateModel) {
    return state?.idsList;
  }

  @Selector([ActivityLocationsState])
  static page(state: ActivityLocationsStateModel): BcActivityLocations[] {
    return state?.page?.content;
  }

  @Selector([ActivityLocationsState])
  static activityLocation(state: ActivityLocationsStateModel) {
    return state?.activityLocation;
  }

  @Selector([ActivityLocationsState])
  static totalRecords(state: ActivityLocationsStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([ActivityLocationsState])
  static loading(state: ActivityLocationsStateModel) {
    return state?.loading;
  }

  @Selector([ActivityLocationsState])
  static blocking(state: ActivityLocationsStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ActivityLocationsAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<ActivityLocationsStateModel>,
    { payload }: ActivityLocationsAction.LoadPage
  ) {
    setState(
      patch<ActivityLocationsStateModel>({
        loading: true,
      })
    );
    return this.activityLocations
      .search22({
        isActive: true,
        cycleId: payload.cycleId,
        activityId: payload.activityId,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort ? payload.sort : ['id', 'desc'],
        },
        // request: payload.filters,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<ActivityLocationsStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ActivityLocationsStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ActivityLocationsStateModel>({
              loading: false,
            })
          );
        })
      );
  }
  @Action(ActivityLocationsAction.loadIdsList, { cancelUncompleted: true })
  loadIdsList(
    { setState }: StateContext<ActivityLocationsStateModel>,
    { payload }: ActivityLocationsAction.loadIdsList
  ) {
    return this.activityLocations
      .list9({
        cycleId: payload.cycleId,
        activityId: payload.activityId,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<ActivityLocationsStateModel>({
              idsList: res.result,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ActivityLocationsStateModel>({
              idsList: [],
            })
          );
          return EMPTY;
        })
      );
  }

  @Action(ActivityLocationsAction.Create)
  create(
    { setState }: StateContext<ActivityLocationsStateModel>,
    { payload }: ActivityLocationsAction.Create
  ) {
    setState(
      patch<ActivityLocationsStateModel>({
        blocking: true,
      })
    );

    return this.activityLocations
      .insertOne31({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityLocationsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
  @Action(ActivityLocationsAction.Update)
  update(
    { setState }: StateContext<ActivityLocationsStateModel>,
    { payload }: ActivityLocationsAction.Update
  ) {
    setState(
      patch<ActivityLocationsStateModel>({
        blocking: true,
      })
    );

    return this.activityLocations
      .update111({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityLocationsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ActivityLocationsAction.GetLocation, { cancelUncompleted: true })
  GetLocation(
    { setState }: StateContext<ActivityLocationsStateModel>,
    { payload }: ActivityLocationsAction.GetLocation
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ActivityLocationsStateModel>({
          activityLocation: undefined,
        })
      );
      return;
    }
    setState(
      patch<ActivityLocationsStateModel>({
        blocking: true,
      })
    );
    return this.activityLocations.getOne31({ id: payload.id }).pipe(
      tap((activityLocations) => {
        setState(
          patch<ActivityLocationsStateModel>({
            activityLocation: activityLocations.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ActivityLocationsStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
