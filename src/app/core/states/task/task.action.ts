import { IncidentTask, TaskDetails } from 'src/app/api/models';

export namespace TaskAction {
  export class LoadTasks {
    static readonly type = '[Task] Load Tasks';
    /**
     *
     */
    constructor(public payload: { orgId: number }) {}
  }

  export class LoadPage {
    static readonly type = '[Task] Load Page';
    /**
     *
     */
    constructor(
      public payload: {
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
      }
    ) {}
  }

  export class GetTask {
    static readonly type = '[Task] Get Task';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class Activate {
    static readonly type = '[Task] Activate';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }

  export class Create {
    static readonly type = '[Task] Create';
    /**
     *
     */
    constructor(public payload: TaskDetails) {}
  }

  export class Update {
    static readonly type = '[Task] Update';
    /**
     *
     */
    constructor(public payload: TaskDetails) {}
  }

  export class LoadPriorities {
    static readonly type = '[Task] Load Priorities';
    /**
     *
     */
    constructor() {}
  }

  export class LoadStatuses {
    static readonly type = '[Task] Load Statuses';
    /**
     *
     */
    constructor() {}
  }
}
