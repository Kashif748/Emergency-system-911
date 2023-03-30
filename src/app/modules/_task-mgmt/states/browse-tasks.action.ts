import { PageRequestModel } from '@core/models/page-request.model';
import * as Task from 'esri/tasks/Task';
import { TaskDetails } from 'src/app/api/models';

export namespace BrowseTasksAction {
  export class LoadTasks {
    static readonly type = '[BrowseTasks] Load Tasks';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }

  export class SortTasks {
    static readonly type = '[BrowseTasks] Sort Tasks';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }

  export class ChangeColumns {
    static readonly type = '[BrowseTasks] Change Columns';
    /**
     *
     */
    constructor(public payload: { columns: string[] }) {}
  }

  export class UpdateFilter {
    static readonly type = '[BrowseTasks] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }

  export class Export {
    static readonly type = '[BrowseTasks] Export';
    /**
     *
     */
    constructor(public payload: { type: 'PDF' | 'EXCEL' }) {}
  }

  export class ChangeView {
    static readonly type = '[BrowseTasks] Change View';
    constructor(public payload: { view: 'TABLE' | 'CARDS' }) {}
  }

  export class CreateTask {
    static readonly type = '[BrowseTasks] Create Task';
    /**
     *
     */
    constructor(public payload: TaskDetails) {}
  }

  export class UpdateTask {
    static readonly type = '[BrowseTasks] Update Task';
    /**
     *
     */
    constructor(public payload: TaskDetails) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseTasks] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { taskId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseTasks] Open View';
    /**
     *
     */
    constructor(public payload: { taskId?: number }) {}
  }
}
