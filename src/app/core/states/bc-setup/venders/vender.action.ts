import {BcPartners} from "../../../../api/models/bc-partners";

export namespace VenderAction {
  export class LoadPage {
    static readonly type = '[vender] Load Page';
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
    ) {}
  }

  export class GetVender {
    static readonly type = '[vender] Get vender';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class Create {
    static readonly type = '[vender] Create';
    /**
     *
     */
    constructor(public payload: BcPartners) {}
  }

  export class Update {
    static readonly type = '[vender] Update';
    /**
     *
     */
    constructor(public payload: BcPartners) {}
  }
}
