import {BcResourcesItInfrastructure} from "../../../../api/models/bc-resources-it-infrastructure";

export namespace InfraAction {
  export class LoadPage {
    static readonly type = '[infra] Load Page';

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
    static readonly type = '[infra] Create';
    /**
     *
     */
    constructor(
      public payload: BcResourcesItInfrastructure
    ) {}
  }

  export class Update {
    static readonly type = '[infra] Update';
    /**
     *
     */
    constructor(
      public payload: BcResourcesItInfrastructure
    ) {}
  }

  export class GetInfra {
    static readonly type = '[infra] Get Infra';
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
    static readonly type = '[infra] Delete Infra';
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
