import { BcActivities, BcActivityAnalysis } from 'src/app/api/models';
import { BcActivityAnalysisChangeStatusDto } from 'src/app/api/models/bc-activity-analysis-change-status-dto';

export namespace ActivityAnalysisAction {
  export class LoadPage {
    static readonly type = '[ActivityAnalysis] Load Page';

    /**
     *
     */
    constructor(
      public payload: {
        orgHierarchyId?: number;
        page: number;
        size: number;
      }
    ) {}
  }

  export class GetActivityAnalysis {
    static readonly type = '[ActivityAnalysis] Get Activity';

    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
  export class GetActivityAnalysisStatus {
    static readonly type = '[ActivityAnalysis] Get Activity Status';

    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class GetCycle {
    static readonly type = '[ActivityAnalysis] Get Cycle';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class Update {
    static readonly type = '[ActivityAnalysis] Get Recovery';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysis) {}
  }

  export class ChangeStatus {
    static readonly type = '[ActivityAnalysis]  Change Status';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysisChangeStatusDto) {}
  }
}
