import {OrgStructure} from "../../../../api/models/org-structure";

export namespace OrgDetailAction {
/*  export class LoadPage {
    static readonly type = '[OrgDetail] Load Page';

    /!**
     *
     *!/
    constructor(
      public payload: {
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
      }
    ) {
    }
  }*/

/*  export class Create {
    static readonly type = '[OrgDetail] Create';
    /!**
     *
     *!/
    constructor(
      public payload: OrgStructure
    ) {}
  }*/

  export class Update {
    static readonly type = '[OrgDetail] Update';
    /**
     *
     */
    constructor(
      public payload: OrgStructure
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
