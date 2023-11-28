import { BcActivityAnalysisDto, BcCycles } from 'src/app/api/models';
import { BcActivityAnalysisRequest } from 'src/app/api/models/bc-activity-analysis-request';
import { BcAnalysisBulkTransactionDto } from '../../../api/models/bc-analysis-bulk-transaction-dto';
import { VERSION_STATUSES } from '@core/states/bc/bc/bc.state';

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
      public payload?: {
        page?: number;
        size?: number;
        sort?: string[];
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

  export class UpdateCycle {
    static readonly type = '[ImapactAnalysisAction] Update Cycle';
    /**
     *
     */
    constructor(public payload: BcCycles) {}
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
  export class duplicateActivities {
    static readonly type = '[ImapactAnalysisAction] duplicate Activites';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysisRequest) {}
  }

  export class UpdateBulkTransaction {
    static readonly type = '[ImapactAnalysisAction] Update BulkTransaction';
    /**
     *
     */
    constructor(public payload: BcAnalysisBulkTransactionDto) {}
  }
  export class CycleStatus {
    static readonly type = '[ImapactAnalysisAction] Change Cycle Status';

    /**
     *
     */
    constructor(
      public payload: {
        cycleId: number;
        statusId: VERSION_STATUSES;
      }
    ) {}
  }
}
