import { TaskDetails } from 'src/app/api/models';

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

  export class UpdateStatus {
    static readonly type = '[Task] Update Status';
    /**
     *
     */
    constructor(public payload: { id: number; statusId: number }) {}
  }

  export class reOpenTask {
    static readonly type = '[Task] Open Task';
    /**
     *
     */
    constructor(public payload: { taskId: number }) {}
  }

  export class LoadPriorities {
    static readonly type = '[Task] Load Priorities';
    /**
     *
     */
    constructor() {}
  }
  export class LoadTypes {
    static readonly type = '[Task] Load Types';
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

  export class LoadGroups {
    static readonly type = '[Task] Load Groups';
    /**
     *
     */
    constructor(
      public payload: { search: string; page?: number; size?: number }
    ) {}
  }
}
