import { BcActivityAnalysisDto, BcCycles } from 'src/app/api/models';

export namespace ImapactAnalysisAction {
  export class LoadPage {
    static readonly type = '[ImapactAnalysisAction] Load Page';

    /**
     *
     */
    constructor(
      public payload: {
        filters?: { [key: string]: any };
        page: number;
        size: number;
        sort?: string[];
      }
    ) {}
  }
  export class LoadActivities {
    static readonly type = '[ImapactAnalysisAction] Load Activites';

    /**
     *
     */
    constructor(
      public payload: {
        page: number;
        size: number;
      }
    ) {}
  }
  export class LoadActivitiesStatuses {
    static readonly type = '[ImapactAnalysisAction] Load Activities Statuses';

    /**
     *
     */
    constructor() {}
  }

  export class GetActivityAnalysis {
    static readonly type = '[ImapactAnalysisAction] Get Activity';

    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class LoadCycles {
    static readonly type = '[ImapactAnalysisAction] Load Cycles';

    /**
     *
     */
    constructor(
      public payload: {
        page: number;
        size: number;
      }
    ) {}
  }
  export class GetCycle {
    static readonly type = '[ImapactAnalysisAction] Get Cycle';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class CreateCycle {
    static readonly type = '[ImapactAnalysisAction] Create Cycle';
    /**
     *
     */
    constructor(public payload: BcCycles) {}
  }

  export class SetCycleActivities {
    static readonly type = '[ImapactAnalysisAction] Set Cycle Activites';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysisDto[]) {}
  }
}
