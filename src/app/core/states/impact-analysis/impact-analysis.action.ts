import {BcActivityAnalysisDto, BcCycles} from 'src/app/api/models';
import {BcAnalysisBulkTransactionDto} from "../../../api/models/bc-analysis-bulk-transaction-dto";

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

  export class LoadStatusBasedOnStatusId {
    static readonly type = '[ImapactAnalysisAction] Get StatusBasedOnStatusId';

    /**
     *
     */
    constructor(
      public payload: {
        id: number;
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

  export class LoadAnalysisStatusInfo {
    static readonly type = '[ImapactAnalysisAction] Load AnalysisStatusInfo';

    /**
     *
     */
    constructor(
      public payload: {
        orgHierarchyId: number;
        cycleId: number;
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

  export class UpdateBulkTransaction {
    static readonly type = '[ImapactAnalysisAction] Update BulkTransaction';
    /**
     *
     */
    constructor(public payload: BcAnalysisBulkTransactionDto) {}
  }
}
