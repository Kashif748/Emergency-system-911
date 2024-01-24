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
  BcActivityAnalysisWorkLogProjection,
  PageBcActivityAnalysisWorkLogProjection,
} from 'src/app/api/models';
import {
  BcActivityAnalysisWorkLogControllerService,
  BcWorkLogTypesControllerService,
} from 'src/app/api/services';
import { BcWorkLogTypes } from 'src/app/api/models/bc-work-log-types';
import { ResourceWorklogsAction } from '@core/states/bc-resources/worklogs/resourceWorklogs.action';

export interface ResourceWorklogsStateModel {
  page: PageBcActivityAnalysisWorkLogProjection;
  Worklog: BcActivityAnalysisWorkLogProjection;
  WorklogTypes: BcWorkLogTypes[];
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
    private Worklogs: BcActivityAnalysisWorkLogControllerService,
    private WorklogsTypes: BcWorkLogTypesControllerService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([ResourceWorklogsState])
  static page(
    state: ResourceWorklogsStateModel
  ): BcActivityAnalysisWorkLogProjection[] {
    return state?.page?.content;
  }

  @Selector([ResourceWorklogsState])
  static Worklog(state: ResourceWorklogsStateModel) {
    return state?.Worklog;
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
    return state?.WorklogTypes;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ResourceWorklogsAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState, getState }: StateContext<ResourceWorklogsStateModel>,
    { payload }: ResourceWorklogsAction.LoadPage
  ) {
    setState(
      patch<ResourceWorklogsStateModel>({
        loading: true,
      })
    );
    return this.Worklogs.search26({
      isActive: true,
      actionTypeId: payload.actionTypeId,
      resourceId: payload.resourceId,
      pageable: {
        page: payload.page,
        size: payload.size,
        sort: ['createdOn'],
      },
    }).pipe(
      tap((res) => {
        if (!payload.resetPage) {
          let currentPage = getState().page;
          res.result.content = [...res.result.content, ...currentPage.content];
        }
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
    return this.WorklogsTypes.list7({}).pipe(
      tap((res) => {
        setState(
          patch<ResourceWorklogsStateModel>({
            WorklogTypes: res.result,
          })
        );
      }),
      catchError(() => {
        setState(
          patch<ResourceWorklogsStateModel>({
            WorklogTypes: [],
          })
        );
        return EMPTY;
      })
    );
  }

  @Action(ResourceWorklogsAction.Create)
  create(
    { setState, getState }: StateContext<ResourceWorklogsStateModel>,
    { payload }: ResourceWorklogsAction.Create
  ) {
    setState(
      patch<ResourceWorklogsStateModel>({
        blocking: true,
      })
    );

    return this.Worklogs.save3({
      body: { ...payload },
    }).pipe(
      tap((activityWorklogs) => {
        const currentPage = getState().page;
        setState(
          patch<ResourceWorklogsStateModel>({
            page: patch({
              content: [...currentPage.content, activityWorklogs?.result],
            }),
            Worklog: activityWorklogs.result,
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

    return this.Worklogs.update115({
      body: { ...payload },
    }).pipe(
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
          Worklog: undefined,
        })
      );
      return;
    }
    setState(
      patch<ResourceWorklogsStateModel>({
        blocking: true,
      })
    );
    return this.Worklogs.getById11({ id: payload.id }).pipe(
      tap((activityWorklogs) => {
        setState(
          patch<ResourceWorklogsStateModel>({
            Worklog: activityWorklogs.result,
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
