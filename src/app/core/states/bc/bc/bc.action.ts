import { BcVersions } from "src/app/api/models";
import { VERSION_STATUSES } from "./bc.state";


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
        statusId? :number
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
        statusId: VERSION_STATUSES
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
  export class Delete {
    static readonly type = '[BC] Delete Version';
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
