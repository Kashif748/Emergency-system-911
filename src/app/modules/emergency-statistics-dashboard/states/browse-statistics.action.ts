import {PageRequestModel} from "@core/models/page-request.model";

export namespace BrowseStatisticsAction {
  export class LoadIncidentCategories {
    static readonly type = '[BrowseIncidentCategories] Load Incident Categories';
    /**
     *
     */
    constructor() {}
  }
  export class LoadIncidentStatistics {
    static readonly type = '[BrowseIncidentCategories] Load Incident statistics';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }
  export class UpdateFilter {
    static readonly type = '[BrowseUsers] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }
}
