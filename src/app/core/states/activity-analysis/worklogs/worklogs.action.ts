import { BcActivityAnalysisWorkLog } from 'src/app/api/models';

export namespace ActivityWorklogsAction {
  export class LoadPage {
    static readonly type = '[BcActivityWorklogs] Load Page';

    /**
     *
     */
    constructor(
      public payload: {
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
        actionTypeId?: number;
        activityAnalysisId: number;
        resetPage : boolean;
      }
    ) {}
  }
  export class LoadWorklogsTypes {
    static readonly type = '[BcActivityWorklogs] Load worklogs types';

    /**
     *
     */
    constructor() {}
  }

  export class Create {
    static readonly type = '[BcActivityWorklogs] Create';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysisWorkLog) {}
  }
  export class Update {
    static readonly type = '[BcActivityWorklogs] Update';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysisWorkLog) {}
  }

  export class GetWorklog {
    static readonly type = '[BcActivityWorklogs] Get System';
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
