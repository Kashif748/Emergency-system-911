import { Injectable } from '@angular/core';
import { UploadTagIdConst } from '@core/constant/UploadTagIdConst';
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
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import {
  GroupProjection,
  Pageable,
  PageIncidentTaskProjection,
  PriorityProjection,
  TaskDetails,
  TaskStatus,
  TaskType,
} from 'src/app/api/models';
import {
  DmsControllerService,
  IncidentControllerService,
  ManageGroupsService,
  PriorityControllerService,
  TaskControllerService,
  TaskStatusControllerService,
  UserGroupMapControllerService,
} from 'src/app/api/services';
import { TaskAction } from './task.action';

export interface TaskModel extends TaskDetails {
  attachments: any[];
}
export interface TaskStateModel {
  statuses: TaskStatus[];
  priorites: PriorityProjection[];
  page: PageIncidentTaskProjection;
  task: TaskDetails;
  createdTask: TaskDetails;
  loading: boolean;
  blocking: boolean;
  types: TaskType[];
  groups: GroupProjection[];
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
    private statusService: TaskStatusControllerService,
    private groupService: ManageGroupsService,
    private incidentService: IncidentControllerService,
    private dmsService: DmsControllerService
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
  static createdTask(state: TaskStateModel) {
    return state?.createdTask;
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
  static types(state: TaskStateModel) {
    return state?.types;
  }

  @Selector([TaskState])
  static statuses(state: TaskStateModel) {
    return state?.statuses;
  }

  @Selector([TaskState])
  static groups(state: TaskStateModel) {
    return state?.groups;
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
    const request = {
      filter: {
        ...payload.filters,
        dueDate: payload.filters?.dueDate
          ? DateTimeUtil.format(
              payload.filters?.dueDate,
              DateTimeUtil.DATE_FORMAT
            )
          : undefined,
        type: undefined,
      },

      page: {
        page: payload.page,
        size: payload.size,
        sort: payload.sort,
      } as Pageable,
    };
    return (
      payload.filters?.type === 'BY_MY_ORG'
        ? this.taskService.getCreatedByOrg(request)
        : this.taskService.getCreatedForOrg(request)
    ).pipe(
      switchMap((res) =>
        this.priorityService.findActivePage2({ pageable: { size: 1000 } }).pipe(
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
      switchMap(({ result: task }) =>
        //   this.dmsService
        //     .findAttachment({
        //       entityId: payload.id,
        //       entityTagId: UploadTagIdConst.TASKS,
        //     })
        //     .pipe(
        //       map((a) => {
        //         return {
        //           ...task,
        //           attachments: a.result,
        //         } as TaskModel;
        //       })
        //     )
        // ),
        // switchMap((task) =>
        this.incidentService.get16({ id: task.incidentId }).pipe(
          map(({ result: incident }) => {
            return {
              ...task,
              incidentId: incident,
              taskType: {
                ...task.taskType,
                id: task.taskType?.typeId,
              },
              assignTo: {
                ...task.assignTo,
                id: task.assignTo?.assigneeId,
              },
            };
          })
        )
      ),
      tap((task) => {
        setState(
          patch<TaskStateModel>({
            task: task as any,
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

  @Action(TaskAction.LoadTypes)
  loadTypes(
    { setState }: StateContext<TaskStateModel>,
    {}: TaskAction.LoadTypes
  ) {
    return this.taskService.getTaskTypes({}).pipe(
      tap(({ result: list }) => {
        setState(
          patch<TaskStateModel>({
            types: list,
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

  @Action(TaskAction.LoadGroups)
  loadGroups(
    { setState }: StateContext<TaskStateModel>,
    { payload }: TaskAction.LoadGroups
  ) {
    return this.groupService
      .getNonGlobal({
        name: payload.search,
        page: { page: payload.page ?? 0, size: payload.size ?? 10 },
      })
      .pipe(
        tap(({ result: { content: list } }) => {
          setState(
            patch<TaskStateModel>({
              groups: list,
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
        tap(({ result: task }) => {
          setState(
            patch<TaskStateModel>({
              createdTask: task,
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

  @Action(TaskAction.UpdateStatus)
  updateStatus(
    { setState }: StateContext<TaskStateModel>,
    { payload }: TaskAction.Update
  ) {
    setState(
      patch<TaskStateModel>({
        blocking: true,
      })
    );
    return this.taskService
      .updateStatus({
        taskId: payload.id,
        statusId: payload.statusId as any,
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

  @Action(TaskAction.reOpenTask, { cancelUncompleted: true })
  reOpenTask(
    { setState }: StateContext<TaskStateModel>,
    { payload }: TaskAction.reOpenTask
  ) {
    setState(
      patch<TaskStateModel>({
        loading: true,
      })
    );
    return this.taskService
      .changeIncident({
        taskId: payload.taskId,
        language: true,
      })
      .pipe(
        tap(({ result }) => {
          setState(
            patch<TaskStateModel>({
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
}
