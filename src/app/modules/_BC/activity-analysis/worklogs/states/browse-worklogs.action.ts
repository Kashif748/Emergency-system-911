import { PageRequestModel } from '@core/models/page-request.model';
import { BcActivityAnalysisWorkLog } from 'src/app/api/models';

export namespace BrowseActivityWorklogsAction {
  export class LoadActivityWorklogs {
    static readonly type =
      '[BrowseActivityWorklogsAction] Load Activity Worklogs';

    /**
     *
     */
    constructor(
      public payload?: {
        pageRequest?: PageRequestModel;
        actionTypeId?: number;
        activityAnalysisId: number;
        resetPage : boolean;
      }
    ) {}
  }

  export class LoadActivityWorklogsTypes {
    static readonly type = '[BrowseActivityWorklogsAction] Load Worklogs Types';

    /**
     *
     */
    constructor() {}
  }

  export class Create {
    static readonly type = '[BrowseActivityWorklogsAction] Create';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysisWorkLog) {}
  }
  export class Update {
    static readonly type = '[BrowseActivityWorklogsAction] Update';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysisWorkLog) {}
  }

  export class GetSystem {
    static readonly type = '[BrowseActivityWorklogsAction] Get System';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
  export class Delete {
    static readonly type = '[BrowseActivityWorklogsAction] Delete System';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class ToggleEditMode {
    static readonly type = '[BrowseActivityWorklogsAction] Toggle Edit Mode';
    /**
     *
     */
    constructor(public payload: { log?: BcActivityAnalysisWorkLog }) {}
  }
}
