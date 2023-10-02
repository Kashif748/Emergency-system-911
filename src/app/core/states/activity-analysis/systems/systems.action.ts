import { BcActivitySystems } from "src/app/api/models";

export namespace ActivitySystemsAction {
  export class LoadPage {
    static readonly type = '[BcActivitySystems] Load Page';

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
  export class loadIdsList {
    static readonly type = '[BcActivitySystems] load Ids List';
    /**
     *
     */
    constructor(
      public payload: {
        cycleId: number;
        activityId :number
      }
    ) {}
  }

  export class Create {
    static readonly type = '[BcActivitySystems] Create';
    /**
     *
     */
    constructor(public payload: BcActivitySystems) {}
  }
  export class Update {
    static readonly type = '[BcActivitySystems] Update';
    /**
     *
     */
    constructor(public payload: BcActivitySystems) {}
  }

  export class GetSystem {
    static readonly type = '[BcActivitySystems] Get System';
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
    static readonly type = '[BcActivitySystems] Delete System';
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
