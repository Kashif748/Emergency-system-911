import {Bcrto} from "../../../../api/models/bcrto";

export namespace OrgDetailAction {
  export class LoadPage {
    static readonly type = '[OrgDetail] Load Page';

    /**
     *
     */
    constructor(
      public payload: {
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
      }
    ) {
    }
  }

  export class Create {
    static readonly type = '[OrgDetail] Create';
    /**
     *
     */
    constructor(
      public payload: Bcrto
    ) {}
  }

  export class Update {
    static readonly type = '[OrgDetail] Update';
    /**
     *
     */
    constructor(
      public payload: Bcrto
    ) {}
  }

  export class GetOrgDetail {
    static readonly type = '[OrgDetail] Get OrgDetail';
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
