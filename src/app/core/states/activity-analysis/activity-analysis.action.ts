import { BcActivities, BcActivityAnalysis } from 'src/app/api/models';

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
}
