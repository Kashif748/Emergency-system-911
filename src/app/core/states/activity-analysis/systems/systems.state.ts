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
import { BcActivitySystems, PageBcActivitySystems } from 'src/app/api/models';
import { BcActivitySystemsControllerService } from 'src/app/api/services';
import { ActivitySystemsAction } from './systems.action';

export interface ActivitySystemsStateModel {
  page: PageBcActivitySystems;
  activitySystem: BcActivitySystems;
  idsList: number[];
  loading: boolean;
  blocking: boolean;
}

const ACTIVITY_SYSTEMS_STATE_TOKEN = new StateToken<ActivitySystemsStateModel>(
  'activitySystem'
);

@State<ActivitySystemsStateModel>({ name: ACTIVITY_SYSTEMS_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class ActivitySystemsState {
  /**
   *
   */
  constructor(private activitySystem: BcActivitySystemsControllerService) {}

  /* ************************ SELECTORS ******************** */
  @Selector([ActivitySystemsState])
  static idsList(state: ActivitySystemsStateModel) {
    return state?.idsList;
  }

  @Selector([ActivitySystemsState])
  static page(state: ActivitySystemsStateModel): BcActivitySystems[] {
    return state?.page?.content;
  }

  @Selector([ActivitySystemsState])
  static activitySystem(state: ActivitySystemsStateModel) {
    return state?.activitySystem;
  }

  @Selector([ActivitySystemsState])
  static totalRecords(state: ActivitySystemsStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([ActivitySystemsState])
  static loading(state: ActivitySystemsStateModel) {
    return state?.loading;
  }

  @Selector([ActivitySystemsState])
  static blocking(state: ActivitySystemsStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ActivitySystemsAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<ActivitySystemsStateModel>,
    { payload }: ActivitySystemsAction.LoadPage
  ) {
    setState(
      patch<ActivitySystemsStateModel>({
        loading: true,
      })
    );
    return this.activitySystem
      .search21({
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
            patch<ActivitySystemsStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ActivitySystemsStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ActivitySystemsStateModel>({
              loading: false,
            })
          );
        })
      );
  }
  @Action(ActivitySystemsAction.loadIdsList, { cancelUncompleted: true })
  loadIdsList(
    { setState }: StateContext<ActivitySystemsStateModel>,
    { payload }: ActivitySystemsAction.loadIdsList
  ) {
    return this.activitySystem
      .list8({
        cycleId: payload.cycleId,
        activityId: payload.activityId,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<ActivitySystemsStateModel>({
              idsList: res.result,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ActivitySystemsStateModel>({
              idsList: [],
            })
          );
          return EMPTY;
        })
      );
  }

  @Action(ActivitySystemsAction.Create)
  create(
    { setState }: StateContext<ActivitySystemsStateModel>,
    { payload }: ActivitySystemsAction.Create
  ) {
    setState(
      patch<ActivitySystemsStateModel>({
        blocking: true,
      })
    );

    return this.activitySystem
      .insertOne30({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivitySystemsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
  @Action(ActivitySystemsAction.Update)
  update(
    { setState }: StateContext<ActivitySystemsStateModel>,
    { payload }: ActivitySystemsAction.Update
  ) {
    setState(
      patch<ActivitySystemsStateModel>({
        blocking: true,
      })
    );

    return this.activitySystem
      .update112({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivitySystemsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ActivitySystemsAction.GetSystem, { cancelUncompleted: true })
  GetSystem(
    { setState }: StateContext<ActivitySystemsStateModel>,
    { payload }: ActivitySystemsAction.GetSystem
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ActivitySystemsStateModel>({
          activitySystem: undefined,
        })
      );
      return;
    }
    setState(
      patch<ActivitySystemsStateModel>({
        blocking: true,
      })
    );
    return this.activitySystem.getOne30({ id: payload.id }).pipe(
      tap((activitySystem) => {
        setState(
          patch<ActivitySystemsStateModel>({
            activitySystem: activitySystem.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ActivitySystemsStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
  @Action(ActivitySystemsAction.Delete, { cancelUncompleted: true })
  Delete(
    { setState }: StateContext<ActivitySystemsStateModel>,
    { payload }: ActivitySystemsAction.Delete
  ) {
    if (payload.id === undefined || payload.id === null) {
      return;
    }
    setState(
      patch<ActivitySystemsStateModel>({
        loading: true,
      })
    );
    return this.activitySystem.deleteById31({ id: payload.id }).pipe(
      tap((activitySystem) => {
        setState(
          patch<ActivitySystemsStateModel>({
            loading: false,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ActivitySystemsStateModel>({
            loading: false,
          })
        );
      })
    );
  }
}
