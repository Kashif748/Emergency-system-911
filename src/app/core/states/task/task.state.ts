import { Injectable } from '@angular/core';
import { MessageHelper } from '@core/helpers/message.helper';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { EMPTY, of } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  switchMap,
  switchMapTo,
  tap,
} from 'rxjs/operators';
import {
  Pageable,
  PageIncidentTaskProjection,
  PriorityProjection,
  TaskDetails,
  TaskStatus,
} from 'src/app/api/models';
import {
  PriorityControllerService,
  TaskControllerService,
  TaskStatusControllerService,
} from 'src/app/api/services';
import { TaskAction } from './task.action';

export interface TaskStateModel {
  statuses: TaskStatus[];
  priorites: PriorityProjection[];
  page: PageIncidentTaskProjection;
  task: TaskDetails;
  loading: boolean;
  blocking: boolean;
}

const TASK_STATE_TOKEN = new StateToken<TaskStateModel>('task');
@State<TaskStateModel>({
  name: TASK_STATE_TOKEN,
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class TaskState {
  /**
   *
   */
  constructor(
    private messageHelper: MessageHelper,
    private taskService: TaskControllerService,
    private priorityService: PriorityControllerService,
    private statusService: TaskStatusControllerService
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([TaskState])
  static page(state: TaskStateModel) {
    return state?.page?.content;
  }
  @Selector([TaskState])
  static totalRecords(state: TaskStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([TaskState])
  static task(state: TaskStateModel) {
    return state?.task;
  }

  @Selector([TaskState])
  static loading(state: TaskStateModel) {
    return state?.loading;
  }

  @Selector([TaskState])
  static blocking(state: TaskStateModel) {
    return state?.blocking;
  }

  @Selector([TaskState])
  static priorities(state: TaskStateModel) {
    return state?.priorites;
  }

  @Selector([TaskState])
  static statuses(state: TaskStateModel) {
    return state?.statuses;
  }

  /* ********************** ACTIONS ************************* */

  @Action(TaskAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<TaskStateModel>,
    { payload }: TaskAction.LoadPage
  ) {
    setState(
      patch<TaskStateModel>({
        loading: true,
      })
    );
    return this.taskService
      .getCreatedForOrg({
        filter: {
          ...payload.filters,
          dueDate: payload.filters?.dueDate
            ? DateTimeUtil.format(
                payload.filters?.dueDate,
                DateTimeUtil.DATE_FORMAT
              )
            : undefined,
        },

        page: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        } as Pageable,
      })
      .pipe(
        switchMap((res) =>
          this.priorityService
            .findActivePage2({ pageable: { size: 1000 } })
            .pipe(
              map(
                ({ result: { content: priorities } }) => {
                  const mp = priorities.reduce((pv, cv) => {
                    pv[`${cv.id}`] = cv;
                    return pv;
                  }, {});
                  res.result.content.forEach((t) => {
                    t.priority = mp[t.priority?.id] ?? t.priority;
                  });
                  return res;
                },
                catchError(() => of(res))
              )
            )
        ),
        switchMap((res) =>
          this.statusService.findActiveList().pipe(
            map(
              ({ result: statuses }) => {
                const mp = statuses.reduce((pv, cv) => {
                  pv[`${cv.id}`] = cv;
                  return pv;
                }, {});
                res.result.content.forEach((t) => {
                  t.status = mp[t.status?.id] ?? t.status;
                });
                return res;
              },
              catchError(() => of(res))
            )
          )
        ),
        tap((res) => {
          setState(
            patch<TaskStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<TaskStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<TaskStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(TaskAction.GetTask, { cancelUncompleted: true })
  getTask(
    { setState }: StateContext<TaskStateModel>,
    { payload }: TaskAction.GetTask
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<TaskStateModel>({
          task: undefined,
        })
      );
      return;
    }
    setState(
      patch<TaskStateModel>({
        blocking: true,
      })
    );
    return this.taskService.getTaskDetails({ taskId: payload.id }).pipe(
      tap((res) => {
        setState(
          patch<TaskStateModel>({
            task: res.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<TaskStateModel>({
            blocking: false,
          })
        );
      })
    );
  }

  @Action(TaskAction.LoadPriorities)
  loadPriorities(
    { setState }: StateContext<TaskStateModel>,
    {}: TaskAction.LoadPriorities
  ) {
    return this.priorityService
      .findActivePage2({ pageable: { size: 1000 } })
      .pipe(
        tap(({ result: { content: list } }) => {
          setState(
            patch<TaskStateModel>({
              priorites: list,
            })
          );
        })
      );
  }

  @Action(TaskAction.LoadStatuses)
  loadStatuses(
    { setState }: StateContext<TaskStateModel>,
    {}: TaskAction.LoadStatuses
  ) {
    return this.statusService.findActiveList({ pageable: { size: 1000 } }).pipe(
      tap(({ result: list }) => {
        setState(
          patch<TaskStateModel>({
            statuses: list,
          })
        );
      })
    );
  }

  @Action(TaskAction.Create)
  create(
    { setState }: StateContext<TaskStateModel>,
    { payload }: TaskAction.Create
  ) {
    setState(
      patch<TaskStateModel>({
        blocking: true,
      })
    );
    return this.taskService
      .createTask({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<TaskStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(TaskAction.Update)
  update(
    { setState }: StateContext<TaskStateModel>,
    { payload }: TaskAction.Update
  ) {
    setState(
      patch<TaskStateModel>({
        blocking: true,
      })
    );
    return this.taskService
      .updateTask({
        taskId: payload.id,
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<TaskStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
}
