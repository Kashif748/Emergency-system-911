import { BcActivityEmployees } from "src/app/api/models";

export namespace ActivityEmployeesAction {
  export class LoadPage {
    static readonly type = '[BcActivityEmployees] Load Page';

    /**
     *
     */
    constructor(
      public payload: {
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
        cycleId :number;
        activityId: number
      }
    ) {}
  }

  export class Create {
    static readonly type = '[BcActivityEmployees] Create';
    /**
     *
     */
    constructor(public payload: BcActivityEmployees) {}
  }
  export class Update {
    static readonly type = '[BcActivityEmployees] Update';
    /**
     *
     */
    constructor(public payload: BcActivityEmployees) {}
  }

  export class GetEmployee {
    static readonly type = '[BcActivityEmployees] Get System';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
  export class Delete {
    static readonly type = '[appSystem] Delete System';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
}
