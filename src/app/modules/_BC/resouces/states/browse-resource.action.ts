export namespace BrowseResourceAction {

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
