import {BcResourcesNonItInfrastructure} from "../../../../api/models/bc-resources-non-it-infrastructure";


export namespace OtherAction {
  export class LoadPage {
    static readonly type = '[other] Load Page';

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
    static readonly type = '[other] Create';
    /**
     *
     */
    constructor(
      public payload: BcResourcesNonItInfrastructure
    ) {}
  }

  export class Update {
    static readonly type = '[other] Update';
    /**
     *
     */
    constructor(
      public payload: BcResourcesNonItInfrastructure
    ) {}
  }

  export class GetOther {
    static readonly type = '[other] Get other';
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
    static readonly type = '[other] Delete other';
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
