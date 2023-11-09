import {PageRequestModel} from "@core/models/page-request.model";
import {BcResourcesStaffReq} from "../../../../../api/models/bc-resources-staff-req";

export namespace BrowseStaffAction {
  export class LoadStaff {
    static readonly type = '[BrowseStaff] Load staff';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel , resourceId: number } ) {
    }
  }
  export class LoadMinPersonal {
    static readonly type = '[BrowseStaff] Load Min staff';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel } ) {
    }
  }
  export class CreateStaff {
    static readonly type = '[BrowseStaff] Create staff';
    /**
     *
     */
    constructor(
      public payload: BcResourcesStaffReq
    ) {}
  }

  export class UpdateStaff {
    static readonly type = '[BrowseStaff] Update staff';
    /**
     *
     */
    constructor(
      public payload: BcResourcesStaffReq
    ) {}
  }
  export class ToggleDialog {
    static readonly type = '[BrowseStaff] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { staffId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseStaff] Open View';
    /**
     *
     */
    constructor(public payload: { staffId: number }) {}
  }

  export class Delete {
    static readonly type = '[BrowseStaff] Delete Staff';
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
