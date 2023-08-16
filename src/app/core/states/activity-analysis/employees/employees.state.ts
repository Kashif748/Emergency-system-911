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
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import {
  BcActivityEmployees,
  PageBcActivityEmployees,
} from 'src/app/api/models';
import { BcActivityEmployeesControllerService } from 'src/app/api/services';
import { ActivityEmployeesAction } from './employees.action';

export interface ActivityEmployeesStateModel {
  page: PageBcActivityEmployees;
  activityEmployee: BcActivityEmployees;
  loading: boolean;
  blocking: boolean;
}

const ACTIVITY_EMPLOYEES_STATE_TOKEN =
  new StateToken<ActivityEmployeesStateModel>('activityEmployees');

@State<ActivityEmployeesStateModel>({ name: ACTIVITY_EMPLOYEES_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class ActivityEmployeesState {
  /**
   *
   */
  constructor(
    private activityEmployees: BcActivityEmployeesControllerService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([ActivityEmployeesState])
  static page(state: ActivityEmployeesStateModel): BcActivityEmployees[] {
    return state?.page?.content;
  }

  @Selector([ActivityEmployeesState])
  static activityEmployee(state: ActivityEmployeesStateModel) {
    return state?.activityEmployee;
  }

  @Selector([ActivityEmployeesState])
  static totalRecords(state: ActivityEmployeesStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([ActivityEmployeesState])
  static loading(state: ActivityEmployeesStateModel) {
    return state?.loading;
  }

  @Selector([ActivityEmployeesState])
  static blocking(state: ActivityEmployeesStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ActivityEmployeesAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<ActivityEmployeesStateModel>,
    { payload }: ActivityEmployeesAction.LoadPage
  ) {
    setState(
      patch<ActivityEmployeesStateModel>({
        loading: true,
      })
    );
    return this.activityEmployees
      .search15({
        isActive: true,
        cycleId: payload.cycleId,
        activityId: payload.activityId,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<ActivityEmployeesStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ActivityEmployeesStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ActivityEmployeesStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(ActivityEmployeesAction.Create)
  create(
    { setState }: StateContext<ActivityEmployeesStateModel>,
    { payload }: ActivityEmployeesAction.Create
  ) {
    setState(
      patch<ActivityEmployeesStateModel>({
        blocking: true,
      })
    );

    return this.activityEmployees
      .insertOne22({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityEmployeesStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
  @Action(ActivityEmployeesAction.Update)
  update(
    { setState }: StateContext<ActivityEmployeesStateModel>,
    { payload }: ActivityEmployeesAction.Update
  ) {
    setState(
      patch<ActivityEmployeesStateModel>({
        blocking: true,
      })
    );

    return this.activityEmployees
      .update101({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityEmployeesStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ActivityEmployeesAction.GetEmployee, { cancelUncompleted: true })
  GetEmployee(
    { setState }: StateContext<ActivityEmployeesStateModel>,
    { payload }: ActivityEmployeesAction.GetEmployee
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ActivityEmployeesStateModel>({
          activityEmployee: undefined,
        })
      );
      return;
    }
    setState(
      patch<ActivityEmployeesStateModel>({
        blocking: true,
      })
    );
    return this.activityEmployees.getOne22({ id: payload.id }).pipe(
      tap((activityEmployees) => {
        setState(
          patch<ActivityEmployeesStateModel>({
            activityEmployee  : activityEmployees.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ActivityEmployeesStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
