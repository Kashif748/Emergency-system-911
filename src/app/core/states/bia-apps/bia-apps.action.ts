
export namespace AppSystemAction {
  export class LoadPage {
    static readonly type = '[biaApps] Load Page';

    /**
     *
     */
    constructor(
      public payload: {
        resourceId: number
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
        search?: string;
      }
    ) {
    }
  }
}
