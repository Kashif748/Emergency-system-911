
export namespace BiaAction {
  export class LoadPage {
    static readonly type = '[biaApps] Load Page';

    /**
     *
     */
    constructor(
      public payload: {
        cycleId: number,
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
      }
    ) {
    }
  }
}
