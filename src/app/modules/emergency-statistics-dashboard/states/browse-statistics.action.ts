export namespace BrowseStatisticsAction {
  export class LoadIncidentCategories {
    static readonly type = '[BrowseIncidentCategories] Load Incident Categories';
    /**
     *
     */
    constructor() {}
  }
  export class UpdateFilter {
    static readonly type = '[BrowseUsers] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }
}
