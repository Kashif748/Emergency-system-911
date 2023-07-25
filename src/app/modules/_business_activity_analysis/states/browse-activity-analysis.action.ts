import { BcActivities, BcActivityAnalysis } from 'src/app/api/models';

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
}
