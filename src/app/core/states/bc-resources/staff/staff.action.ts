import {BcResourcesStaffReq} from "../../../../api/models/bc-resources-staff-req";


export namespace StaffAction {
  export class LoadPage {
    static readonly type = '[staff] Load Page';

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

  export class LoadMinPage {
    static readonly type = '[staff] Load min Personal Page';

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
    static readonly type = '[staff] Create';
    /**
     *
     */
    constructor(
      public payload: BcResourcesStaffReq
    ) {}
  }

  export class Update {
    static readonly type = '[staff] Update';
    /**
     *
     */
    constructor(
      public payload: BcResourcesStaffReq
    ) {}
  }

  export class GetStaff {
    static readonly type = '[staff] Get staff';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
  export class LoadDesignationPage {
    static readonly type = '[staff] Load designation Page';

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

  export class Delete {
    static readonly type = '[staff] Delete Staff';
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
