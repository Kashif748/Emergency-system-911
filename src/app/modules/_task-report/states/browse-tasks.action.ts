import { PageRequestModel } from '@core/models/page-request.model';
import { TaskDetails } from 'src/app/api/models';

export namespace BrowseTasksAction {
  export class LoadTasks {
    static readonly type = '[BrowseTasks] Load Tasks';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }
  export class LoadStatistics {
    static readonly type = '[BrowseTasks] Load Statistics';
    /**
     *
     */
    constructor() {}
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
  
}
