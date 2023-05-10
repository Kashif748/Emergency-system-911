import {BcLocationTypes} from "../../../../api/models/bc-location-types";

export namespace LocationTypeAction {
  export class LoadPage {
    static readonly type = '[LocationType] Load Page';

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
    static readonly type = '[LocationType] Create';
    /**
     *
     */
    constructor(
      public payload: BcLocationTypes
    ) {}
  }

  export class GetLocationType {
    static readonly type = '[LocationType] Get Rto';
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
