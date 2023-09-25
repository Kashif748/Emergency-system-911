import {BcActivityAnalysisWorkLog} from "../../../../../api/models/bc-activity-analysis-work-log";
import {PageRequestModel} from "@core/models/page-request.model";

export namespace BrowseResourceWorklogsAction {
  export class LoadResourceWorklogs {
    static readonly type =
      '[BrowseResourceWorklogsAction] Load Resource Worklogs';

    /**
     *
     */
    constructor(
      public payload?: {
        pageRequest?: PageRequestModel;
        actionTypeId?: number;
        resourceId: number;
        resetPage: boolean;
      }
    ) {}
  }

  export class LoadResourceWorklogsTypes {
    static readonly type = '[BrowseResourceWorklogsAction] Load Resource Worklogs Types';

    /**
     *
     */
    constructor() {}
  }

  export class Create {
    static readonly type = '[BrowseResourceWorklogsAction] Create';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysisWorkLog) {}
  }
  export class Update {
    static readonly type = '[BrowseResourceWorklogsAction] Update';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysisWorkLog) {}
  }

  export class GetResourceWorklog {
    static readonly type = '[BrowseResourceWorklogsAction] Get Resource';
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
    static readonly type = '[BrowseResourceWorklogsAction] Delete Resource';
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
    static readonly type = '[BrowseResourceWorklogsAction] Toggle Edit Mode';
    /**
     *
     */
    constructor(public payload: { log?: BcActivityAnalysisWorkLog }) {}
  }
}
