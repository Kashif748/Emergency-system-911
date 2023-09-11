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
  BcActivityAnalysisWorkLog,
  PageBcActivityAnalysisWorkLog,
} from 'src/app/api/models';
import {
  BcActivityAnalysisWorkLogControllerService,
  BcWorkLogTypesControllerService,
} from 'src/app/api/services';
import { BcWorkLogTypes } from 'src/app/api/models/bc-work-log-types';
import {ResourceWorklogsAction} from "@core/states/bc-resources/worklogs/resourceWorklogs.action";

export interface ResourceWorklogsStateModel {
  page: PageBcActivityAnalysisWorkLog;
  activityWorklog: BcActivityAnalysisWorkLog;
  activityWorklogTypes: BcWorkLogTypes[];
  loading: boolean;
  blocking: boolean;
}

const RESOURCE_WORKLOGS_STATE_TOKEN =
  new StateToken<ResourceWorklogsStateModel>('resourceWorklogs');

@State<ResourceWorklogsStateModel>({ name: RESOURCE_WORKLOGS_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class ResourceWorklogsState {
  /**
   *
   */
  constructor(
    private activityWorklogs: BcActivityAnalysisWorkLogControllerService,
    private activityWorklogsTypes: BcWorkLogTypesControllerService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([ResourceWorklogsState])
  static page(state: ResourceWorklogsStateModel): BcActivityAnalysisWorkLog[] {
    return state?.page?.content;
  }

  @Selector([ResourceWorklogsState])
  static activityWorklog(state: ResourceWorklogsStateModel) {
    return state?.activityWorklog;
  }

  @Selector([ResourceWorklogsState])
  static totalRecords(state: ResourceWorklogsStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([ResourceWorklogsState])
  static loading(state: ResourceWorklogsStateModel) {
    return state?.loading;
  }

  @Selector([ResourceWorklogsState])
  static blocking(state: ResourceWorklogsStateModel) {
    return state?.blocking;
  }
  @Selector([ResourceWorklogsState])
  static activityWorklogTypes(state: ResourceWorklogsStateModel) {
    return state?.activityWorklogTypes;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ResourceWorklogsAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<ResourceWorklogsStateModel>,
    { payload }: ResourceWorklogsAction.LoadPage
  ) {
    setState(
      patch<ResourceWorklogsStateModel>({
        loading: true,
      })
    );
    return this.activityWorklogs
      .search19({
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
          setState(
            patch<ResourceWorklogsStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ResourceWorklogsStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ResourceWorklogsStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(ResourceWorklogsAction.LoadWorklogsTypes, { cancelUncompleted: true })
  loadWorklogsTypes({ setState }: StateContext<ResourceWorklogsStateModel>) {
    return this.activityWorklogsTypes.list7({}).pipe(
      tap((res) => {
        setState(
          patch<ResourceWorklogsStateModel>({
            activityWorklogTypes: res.result,
          })
        );
      }),
      catchError(() => {
        setState(
          patch<ResourceWorklogsStateModel>({
            activityWorklogTypes: [],
          })
        );
        return EMPTY;
      })
    );
  }

  @Action(ResourceWorklogsAction.Create)
  create(
    { setState }: StateContext<ResourceWorklogsStateModel>,
    { payload }: ResourceWorklogsAction.Create
  ) {
    setState(
      patch<ResourceWorklogsStateModel>({
        blocking: true,
      })
    );

    return this.activityWorklogs
      .insertOne24({
        body: { ...payload },
      })
      .pipe(
        tap((activityWorklogs) => {
          setState(
            patch<ResourceWorklogsStateModel>({
              activityWorklog: activityWorklogs.result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<ResourceWorklogsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
  @Action(ResourceWorklogsAction.Update)
  update(
    { setState }: StateContext<ResourceWorklogsStateModel>,
    { payload }: ResourceWorklogsAction.Update
  ) {
    setState(
      patch<ResourceWorklogsStateModel>({
        blocking: true,
      })
    );

    return this.activityWorklogs
      .update103({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ResourceWorklogsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ResourceWorklogsAction.GetWorklog, { cancelUncompleted: true })
  GetWorklog(
    { setState }: StateContext<ResourceWorklogsStateModel>,
    { payload }: ResourceWorklogsAction.GetWorklog
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ResourceWorklogsStateModel>({
          activityWorklog: undefined,
        })
      );
      return;
    }
    setState(
      patch<ResourceWorklogsStateModel>({
        blocking: true,
      })
    );
    return this.activityWorklogs.getOne26({ id: payload.id }).pipe(
      tap((activityWorklogs) => {
        setState(
          patch<ResourceWorklogsStateModel>({
            activityWorklog: activityWorklogs.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ResourceWorklogsStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
