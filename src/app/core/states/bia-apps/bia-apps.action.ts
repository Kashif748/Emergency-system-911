export namespace BiaAction {
  export class LoadPage {
    static readonly type = '[biaApps] Load Page';

    /**
     *
     */
    constructor(
      public payload: {
        cycleId: number;
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
      }
    ) {}
  }
  export class Delete {
    static readonly type = '[biaApps] Delete Cycle';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class LoadStatuses {
    static readonly type = '[biaApps] Load Cycle Statuses';
    /**
     *
     */
    constructor(
      public payload?: {
        filters?: { [key: string]: any };
        sort?: string[];
        page?: number;
        size?: number;
      }
    ) {}
  }
}
