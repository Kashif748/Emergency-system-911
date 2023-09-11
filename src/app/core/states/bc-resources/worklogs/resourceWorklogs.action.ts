import { BcActivityAnalysisWorkLog } from 'src/app/api/models';

export namespace ResourceWorklogsAction {
  export class LoadPage {
    static readonly type = '[BcResourceWorklogs] Load Page';

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
      }
    ) {}
  }
  export class LoadWorklogsTypes {
    static readonly type = '[BcResourceWorklogs] Load Resource worklogs types';

    /**
     *
     */
    constructor() {}
  }

  export class Create {
    static readonly type = '[BcResourceWorklogs] Create';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysisWorkLog) {}
  }
  export class Update {
    static readonly type = '[BcResourceWorklogs] Update';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysisWorkLog) {}
  }

  export class GetWorklog {
    static readonly type = '[BcResourceWorklogs] Get Resource';
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
