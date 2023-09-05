import {BcResourcesAppAndSoftware} from "../../../../api/models/bc-resources-app-and-software";

export namespace AppSystemAction {
  export class LoadPage {
    static readonly type = '[appSystem] Load Page';

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
    static readonly type = '[appSystem] Create';
    /**
     *
     */
    constructor(
      public payload: BcResourcesAppAndSoftware
    ) {}
  }

  export class Update {
    static readonly type = '[appSystem] Update';
    /**
     *
     */
    constructor(
      public payload: BcResourcesAppAndSoftware
    ) {}
  }

  export class GetAppSystem {
    static readonly type = '[appSystem] Get AppSystem';
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
