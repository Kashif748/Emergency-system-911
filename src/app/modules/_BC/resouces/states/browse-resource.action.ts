export namespace BrowseResourceAction {
  export class GetResourceAnalysis {
    static readonly type = '[BrowseResource] Get Resource';

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
    static readonly type = '[BrowseResource] Get Resource Cycle';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class ChangeTab {
    static readonly type = '[BrowseResource] change Tab';
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
