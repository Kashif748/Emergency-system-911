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

import { ActivityWorklogsAction } from './worklogs.action';
import {
  BcActivityAnalysisWorkLog,
  PageBcActivityAnalysisWorkLog,
} from 'src/app/api/models';
import {
  BcActivityAnalysisWorkLogControllerService,
  BcWorkLogTypesControllerService,
} from 'src/app/api/services';
import { BcWorkLogTypes } from 'src/app/api/models/bc-work-log-types';

export interface ActivityWorklogsStateModel {
  page: PageBcActivityAnalysisWorkLog;
  activityWorklog: BcActivityAnalysisWorkLog;
  activityWorklogTypes: BcWorkLogTypes[];
  loading: boolean;
  blocking: boolean;
}

const ACTIVITY_WORKLOGS_STATE_TOKEN =
  new StateToken<ActivityWorklogsStateModel>('activityWorklogs');

@State<ActivityWorklogsStateModel>({ name: ACTIVITY_WORKLOGS_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class ActivityWorklogsState {
  /**
   *
   */
  constructor(
    private activityWorklogs: BcActivityAnalysisWorkLogControllerService,
    private activityWorklogsTypes: BcWorkLogTypesControllerService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([ActivityWorklogsState])
  static page(state: ActivityWorklogsStateModel): BcActivityAnalysisWorkLog[] {
    return state?.page?.content;
  }

  @Selector([ActivityWorklogsState])
  static activityWorklog(state: ActivityWorklogsStateModel) {
    return state?.activityWorklog;
  }

  @Selector([ActivityWorklogsState])
  static totalRecords(state: ActivityWorklogsStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([ActivityWorklogsState])
  static loading(state: ActivityWorklogsStateModel) {
    return state?.loading;
  }

  @Selector([ActivityWorklogsState])
  static blocking(state: ActivityWorklogsStateModel) {
    return state?.blocking;
  }
  @Selector([ActivityWorklogsState])
  static activityWorklogTypes(state: ActivityWorklogsStateModel) {
    return state?.activityWorklogTypes;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ActivityWorklogsAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState, getState }: StateContext<ActivityWorklogsStateModel>,
    { payload }: ActivityWorklogsAction.LoadPage
  ) {
    setState(
      patch<ActivityWorklogsStateModel>({
        loading: true,
      })
    );
    return this.activityWorklogs
      .search26({
        isActive: true,
        actionTypeId: payload.actionTypeId,
        activityAnalysisId: payload.activityAnalysisId,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((res) => {
          if (!payload.resetPage) {
            let currentPage = getState().page;
            res.result.content = [
              ...res.result.content,
              ...currentPage.content,
            ];
          }
          setState(
            patch<ActivityWorklogsStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ActivityWorklogsStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ActivityWorklogsStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(ActivityWorklogsAction.LoadWorklogsTypes, { cancelUncompleted: true })
  loadWorklogsTypes({ setState }: StateContext<ActivityWorklogsStateModel>) {
    return this.activityWorklogsTypes.list7({}).pipe(
      tap((res) => {
        setState(
          patch<ActivityWorklogsStateModel>({
            activityWorklogTypes: res.result,
          })
        );
      }),
      catchError(() => {
        setState(
          patch<ActivityWorklogsStateModel>({
            activityWorklogTypes: [],
          })
        );
        return EMPTY;
      })
    );
  }

  @Action(ActivityWorklogsAction.Create)
  create(
    { setState }: StateContext<ActivityWorklogsStateModel>,
    { payload }: ActivityWorklogsAction.Create
  ) {
    setState(
      patch<ActivityWorklogsStateModel>({
        blocking: true,
      })
    );

    return this.activityWorklogs
      .insertOne34({
        body: { ...payload },
      })
      .pipe(
        tap((activityWorklogs) => {
          setState(
            patch<ActivityWorklogsStateModel>({
              activityWorklog: activityWorklogs.result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<ActivityWorklogsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
  @Action(ActivityWorklogsAction.Update)
  update(
    { setState }: StateContext<ActivityWorklogsStateModel>,
    { payload }: ActivityWorklogsAction.Update
  ) {
    setState(
      patch<ActivityWorklogsStateModel>({
        blocking: true,
      })
    );

    return this.activityWorklogs
      .update113({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityWorklogsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ActivityWorklogsAction.GetWorklog, { cancelUncompleted: true })
  GetWorklog(
    { setState }: StateContext<ActivityWorklogsStateModel>,
    { payload }: ActivityWorklogsAction.GetWorklog
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ActivityWorklogsStateModel>({
          activityWorklog: undefined,
        })
      );
      return;
    }
    setState(
      patch<ActivityWorklogsStateModel>({
        blocking: true,
      })
    );
    return this.activityWorklogs.getOne36({ id: payload.id }).pipe(
      tap((activityWorklogs) => {
        setState(
          patch<ActivityWorklogsStateModel>({
            activityWorklog: activityWorklogs.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ActivityWorklogsStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
