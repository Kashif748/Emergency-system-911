import { BcActivities, BcActivityAnalysis } from 'src/app/api/models';
import { BcActivityAnalysisChangeStatusDto } from 'src/app/api/models/bc-activity-analysis-change-status-dto';

export namespace BrowseActivityAnalysisAction {
  export class GetActivityAnalysis {
    static readonly type = '[BrowseActivityAnalysis] Get Activity';

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
    static readonly type = '[BrowseActivityAnalysis] Get Activity Status';

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
    static readonly type = '[BrowseActivityAnalysis] Get Cycle';
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
    static readonly type = '[BrowseActivityLocationsAction] Update';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysis) {}
  }
  export class ChangeTab {
    static readonly type = '[BrowseActivityAnalysis] change Tab';
    /**
     *
     */
    constructor(
      public payload: {
        index?: number;
      }
    ) {}
  }

  export class setImpactTotal {
    static readonly type = '[BrowseActivityAnalysis] Impact Total';
    /**
     *
     */
    constructor(
      public payload: {
        impactTotal?: number;
      }
    ) {}
  }
  export class ChangeStatus {
    static readonly type = '[BrowseActivityAnalysis]  Change Status';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysisChangeStatusDto) {}
  }
}
