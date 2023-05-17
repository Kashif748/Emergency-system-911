import {BcVersions} from "../../../../api/models/bc-versions";

export namespace BCAction {
  export class LoadPage {
    static readonly type = '[BC] Load Page';

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
    static readonly type = '[BC] Create';

    /**
     *
     */
    constructor(
      public payload: BcVersions
    ) {
    }
  }
  export class GetBc {
    static readonly type = '[BC] Get Bc';
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
