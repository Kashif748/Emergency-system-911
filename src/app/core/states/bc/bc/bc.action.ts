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
  export class Status {
    static readonly type = '[BC] Status';

    /**
     *
     */
    constructor(
      public payload: {
        versionId: number,
        statusId: number
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
  export class GetVersion {
    static readonly type = '[BC] Get Version';
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
