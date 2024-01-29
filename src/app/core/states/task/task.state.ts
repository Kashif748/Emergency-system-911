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
  Store,
} from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { MapGraphicType } from '@shared/sh-components/map/utils/map-graphic-type.enum';
import { EMPTY, of } from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import {
  GroupProjection,
  IncidentTaskProjection,
  Pageable,
  PageIncidentTaskProjection,
  PriorityProjection,
  TaskCriteria,
  TaskDetails,
  TaskFilter,
  TaskStatus,
  TaskType,
} from 'src/app/api/models';
import {
  IncidentControllerService,
  ManageGroupsService,
  PriorityControllerService,
  TaskControllerService,
  TaskStatusControllerService,
} from 'src/app/api/services';
import { CommonDataState } from '../common-data/common-data.state';
import { TaskAction } from './task.action';
import { ILangFacade } from '@core/facades/lang.facade';
import { UrlHelperService } from '@core/services/url-helper.service';

export interface TaskModel extends TaskDetails {
  attachments: any[];
}

export interface StatisticsModel {
  status?: any;
  priority?: any;
  category?: any;
  zone?: any;
  averageCloseTime?: number;
  rateCloseWithinTime?: number;
  total?: number;
  loading?: boolean;
}
export interface TaskStateModel {
  statuses?: TaskStatus[];
  priorites?: PriorityProjection[];
  page?: PageIncidentTaskProjection;
  task?: TaskDetails;
  createdTask?: TaskDetails;
  loading?: boolean;
  blocking?: boolean;
  types?: TaskType[];
  groups?: GroupProjection[];
  statistics: StatisticsModel;
  exporting?: boolean;
}

const TASK_STATE_TOKEN = new StateToken<TaskStateModel>('task');
const DEFAULTS = {
  page: {
    totalElements: 0,
  },
  statistics: {
    priority: [] as any,
    status: [] as any,
  },
} as TaskStateModel;
@State<TaskStateModel>({
  name: TASK_STATE_TOKEN,
  defaults: DEFAULTS,
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class TaskState {
  /**
   *
   */
  constructor(
    private taskService: TaskControllerService,
    private priorityService: PriorityControllerService,
    private statusService: TaskStatusControllerService,
    private groupService: ManageGroupsService,
    private incidentService: IncidentControllerService,
    private messageHelper: MessageHelper,
    private store: Store,
    private langFacade: ILangFacade,
    private urlHelper: UrlHelperService
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
  static exporting(state: TaskStateModel) {
    return state?.exporting;
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

  @Selector([TaskState])
  static statistics(state: TaskStateModel) {
    return state?.statistics;
  }

  @Selector([TaskState.statistics])
  static statisticsByPriority(state: StatisticsModel) {
    return state?.priority;
  }

  @Selector([TaskState.statistics])
  static statisticsByStatus(state: StatisticsModel) {
    return state?.status;
  }

  @Selector([TaskState.statistics])
  static statisticsByCategory(state: StatisticsModel) {
    return state?.category;
  }

  @Selector([TaskState.statistics])
  static statisticsTotal(state: StatisticsModel) {
    return state?.total;
  }

  @Selector([TaskState.statistics])
  static statisticsAvergageCloseTime(state: StatisticsModel) {
    return state?.averageCloseTime;
  }

  @Selector([TaskState.statistics])
  static statisticsRateCloseWithinTime(state: StatisticsModel) {
    return state?.rateCloseWithinTime;
  }

  @Selector([TaskState.statistics])
  static statisticsZone(state: StatisticsModel) {
    return state?.zone;
  }

  @Selector([TaskState.statistics])
  static statisticsLoading(state: StatisticsModel) {
    return state?.loading;
  }

  /* ********************** ACTIONS ************************* */
  @Action(TaskAction.RESET)
  reset({ setState }: StateContext<TaskStateModel>) {
    setState(DEFAULTS);
  }

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
      filter: this.filters(payload.filters),
      page: {
        page: payload.page,
        size: payload.size,
        sort: payload.sort,
      } as Pageable,
    };
    let source$ = this.taskService.getCreatedForOrg(request);
    switch (payload.filters?.type) {
      case 'BY_MY_ORG':
        source$ = this.taskService.getCreatedByOrg(request);
        break;
      case 'ALL':
        source$ = this.taskService.getAllForOrg1(request);
        break;
      default:
        break;
    }
    return source$.pipe(
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

  @Action(TaskAction.LoadStatistics, { cancelUncompleted: true })
  loadStatistics(
    { setState }: StateContext<TaskStateModel>,
    { payload }: TaskAction.LoadPage
  ) {
    setState(
      patch<TaskStateModel>({
        statistics: {
          loading: true,
        },
      })
    );
    const request = {
      filter: this.filters(payload.filters),
    };
    return this.taskService.getTaskMetrics(request).pipe(
      switchMap((res) =>
        this.store.select(CommonDataState.priorities).pipe(
          map(
            (priorities) => {
              const mp = priorities.reduce((pv, cv) => {
                pv[`${cv.id}`] = cv;
                return pv;
              }, {});
              res.result.priority.forEach((t) => {
                t['priority'] = mp[t['key'] as any];
              });
              return res;
            },
            catchError(() => of(res))
          )
        )
      ),
      switchMap((res) =>
        this.store.select(CommonDataState.taskStatuses).pipe(
          map(
            (statuses) => {
              const mp = statuses.reduce((pv, cv) => {
                pv[`${cv.id}`] = cv;
                return pv;
              }, {});
              res.result.taskStatus.forEach((t) => {
                t['status'] = mp[t['key'] as any];
              });
              return res;
            },
            catchError(() => of(res))
          )
        )
      ),

      switchMap((res) =>
        this.store.select(CommonDataState.incidentCategories).pipe(
          map(
            (categories) => {
              const mp = categories.reduce((pv, cv) => {
                pv[`${cv.id}`] = cv;
                return pv;
              }, {});
              res.result['numberOfTasksPerEachCategory'].forEach((t) => {
                t['category'] = mp[t['key'] as any];
              });
              return res;
            },
            catchError(() => of(res))
          )
        )
      ),
      switchMap((res) =>
        this.taskService.getTaskMetricsZone(request).pipe(
          map(({ result: zoneStats }) => {
            res.result.totalTaskPerEachZone = zoneStats;
            return res;
          }),
          catchError(() => of(res))
        )
      ),
      tap(({ result: stats }) => {
        setState(
          patch<TaskStateModel>({
            statistics: patch<StatisticsModel>({
              priority: stats.priority,
              status: stats.taskStatus,
              total: stats.totalTask,
              averageCloseTime: stats.averageNumberOfTasksPerHour ?? 0,
              rateCloseWithinTime: stats.closeRateWithinTheSpecificTime ?? 0,
              category: stats.numberOfTasksPerEachCategory,
              zone: stats.totalTaskPerEachZone,
              loading: false,
            }),
          })
        );
      }),
      catchError(() => {
        setState(
          patch<TaskStateModel>({
            statistics: {},
          })
        );
        return EMPTY;
      }),
      finalize(() => {
        setState(
          patch<TaskStateModel>({
            statistics: patch<StatisticsModel>({
              loading: false,
            }),
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
      map(({ result: task }) => {
        return {
          ...task,
          taskType: {
            ...task.taskType,
            id: task.taskType?.typeId,
          },
          assignTo: {
            ...task.assignTo,
            id: task.assignTo?.assigneeId,
          },
          dueDateStatus: this.dueDateStatus(task),
        };
      }),
      switchMap((task) =>
        this.incidentService.get16({ id: task.incidentId }).pipe(
          map(({ result: incident }) => {
            return {
              ...task,
              incidentId: incident,
            };
          }),
          //@WA work around until backend provied complete data
          catchError(() => {
            return of({
              ...task,
              incidentId: {
                id: task.incidentId,
                featureName: MapGraphicType.INCIDENT_POINT,
                subject: task.incidentName,
              },
            });
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
  dueDateStatus(task: TaskDetails): any {
    let status = {
      cssClasses: 'text-dark',
      color: 'secondary',
    } as {
      param?: string | number;
      text?: string;
      color?: string;
    };

    const dueDate = DateTimeUtil.getDateInGMTFormat(task.dueDate);
    const closedDate = DateTimeUtil.getDateInGMTFormat(task.closedDate);
    const diffDays = DateTimeUtil.getDiffBetweenDates(dueDate);

    const isCompleted = closedDate && closedDate < dueDate;
    if (isCompleted) {
      status.param = closedDate;
      status.text = 'COMPLETED';
      status.color = 'success';
      return status;
    }

    if (diffDays < 0) {
      // task due date elapsed.
      status.param = dueDate;
      status.text = 'DELAYED_DELIVER';
      status.color = 'danger';
    } else if (diffDays === 0) {
      // task delivery day today or remain time is in hours.
      const diffHours = DateTimeUtil.getDiffBetweenDates(
        dueDate,
        null,
        'hours'
      );

      if (diffHours > 0) {
        status.text = 'REMAIN_DELIVER_HOURS';
        status.param = diffHours;
        status.color = 'warning';
      } else {
        const diffMinutes = DateTimeUtil.getDiffBetweenDates(
          dueDate,
          null,
          'minutes'
        );
        if (diffMinutes > 0) {
          status.text = 'REMAIN_DELIVER_MINUTES';
          status.param = diffMinutes;
          status.color = 'warning';
        } else {
          status.param = dueDate;
          status.text = 'DELAYED_DELIVER';
          status.color = 'danger';
        }
      }
    } else {
      // task have one day or more to accomplish.
      status.param = diffDays as any;
      status.text = 'REMAIN_DELIVER_DAYS';
      status.color = 'info';
    }

    return status;
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
        tap(() => {
          const status = this.store
            .selectSnapshot(CommonDataState.taskStatuses)
            .find((s) => s.id == payload.statusId);
          setState(
            patch<TaskStateModel>({
              page: patch<PageIncidentTaskProjection>({
                content: updateItem(
                  (i) => i.id == payload.id,
                  patch<IncidentTaskProjection>({
                    status,
                  })
                ),
              }),
            })
          );
          this.messageHelper.success();
        }),
        finalize(() => {
          setState(
            patch<TaskStateModel>({
              blocking: false,
            })
          );
        }),
        catchError((error) => {
          this.messageHelper.error({ error });
          return EMPTY;
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

  @Action(TaskAction.Export, { cancelUncompleted: true })
  export(
    { setState }: StateContext<TaskStateModel>,
    { payload }: TaskAction.Export
  ) {
    setState(
      patch<TaskStateModel>({
        exporting: true,
      })
    );
    return this.taskService
      .export2({
        as: payload.type,
        lang: this.langFacade.stateSanpshot.ActiveLang.key == 'ar',
        filter: this.filters(payload.filters),
      })
      .pipe(
        tap((res: any) => {
          const newBlob = new Blob([res], {
            type: `application/${
              payload.type === 'PDF'
                ? 'pdf'
                : 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }`,
          });
          this.urlHelper.downloadBlob(
            newBlob,
            `TaskS - ${new Date().toISOString().split('.')[0]}`
          );
        }),
        finalize(() => {
          setState(
            patch<TaskStateModel>({
              exporting: false,
            })
          );
        })
      );
  }

  private filters(filters: { [key: string]: string }) {
    const fromDueDate =
      filters?.dueDate &&
      Array.isArray(filters?.dueDate) &&
      filters?.dueDate?.length &&
      filters?.dueDate[0]
        ? DateTimeUtil.format(filters?.dueDate[0], DateTimeUtil.DATE_FORMAT)
        : undefined;
    const toDueDate =
      filters?.dueDate &&
      Array.isArray(filters?.dueDate) &&
      filters?.dueDate?.length &&
      filters?.dueDate[1]
        ? DateTimeUtil.format(filters?.dueDate[1], DateTimeUtil.DATE_FORMAT)
        : undefined;

    const fromCreationDate =
      filters?.createdOn &&
      Array.isArray(filters?.createdOn) &&
      filters?.createdOn?.length &&
      filters?.createdOn[0]
        ? DateTimeUtil.format(filters?.createdOn[0], DateTimeUtil.DATE_FORMAT)
        : undefined;
    const toCreationDate =
      filters?.createdOn &&
      Array.isArray(filters?.createdOn) &&
      filters?.createdOn?.length &&
      filters?.createdOn[1]
        ? DateTimeUtil.format(filters?.createdOn[1], DateTimeUtil.DATE_FORMAT)
        : undefined;
    return {
      ...filters,
      dueDate:
        filters?.dueDate && !Array.isArray(filters?.dueDate)
          ? DateTimeUtil.format(filters?.dueDate, DateTimeUtil.DATE_FORMAT)
          : undefined,
      createdFrom: fromCreationDate,
      createdTo: toCreationDate,
      startDate: fromDueDate,
      endDate: toDueDate,
      type: undefined,
      createdOn: undefined,
    } as TaskCriteria | TaskFilter;
  }
}
