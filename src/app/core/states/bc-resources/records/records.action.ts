import {BcResourcesRecords} from "../../../../api/models/bc-resources-records";

export namespace RecordsAction {
  export class LoadPage {
    static readonly type = '[records] Load Page';

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

  export class Create {
    static readonly type = '[records] Create';
    /**
     *
     */
    constructor(
      public payload: BcResourcesRecords
    ) {}
  }

  export class Update {
    static readonly type = '[records] Update';
    /**
     *
     */
    constructor(
      public payload: BcResourcesRecords
    ) {}
  }

  export class GetRecords {
    static readonly type = '[records] Get records';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
}
