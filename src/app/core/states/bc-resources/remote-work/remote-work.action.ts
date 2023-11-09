import {BcResourcesRemoteWork} from "../../../../api/models/bc-resources-remote-work";

export namespace RemoteWorkAction {
  export class LoadPage {
    static readonly type = '[remoteWork] Load Page';

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

  export class LoadDesignationPage {
    static readonly type = '[remoteWork] Load Personal designation Page';

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
    static readonly type = '[remoteWork] Create';
    /**
     *
     */
    constructor(
      public payload: BcResourcesRemoteWork
    ) {}
  }

  export class Update {
    static readonly type = '[remoteWork] Update';
    /**
     *
     */
    constructor(
      public payload: BcResourcesRemoteWork
    ) {}
  }

  export class GetRemoteWork {
    static readonly type = '[remoteWork] Get remoteWork';
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
    static readonly type = '[remoteWork] Delete remoteWork';
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
