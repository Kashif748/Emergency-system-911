import {PageRequestModel} from "@core/models/page-request.model";

export namespace BrowseStatisticsAction {
  export class LoadIncidentCategories {
    static readonly type = '[BrowseIncidentStatistics] Load Incident Categories';
    /**
     *
     */
    constructor() {}
  }
  export class LoadIncidentStatistics {
    static readonly type = '[BrowseIncidentStatistics] Load Incident statistics';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }
  export class UpdateFilter {
    static readonly type = '[BrowseIncidentStatistics] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }
}
