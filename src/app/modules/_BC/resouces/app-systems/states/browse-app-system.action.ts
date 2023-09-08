import {PageRequestModel} from "@core/models/page-request.model";
import {BcResourcesAppAndSoftware} from "../../../../../api/models/bc-resources-app-and-software";

export namespace BrowseAppSystemAction {
  export class LoadAppSys {
    static readonly type = '[BrowseAppSystem] Load AppSystem';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel , resourceId: number } ) {
    }
  }
  export class CreateAppSys {
    static readonly type = '[BrowseAppSystem] Create AppSystem';
    /**
     *
     */
    constructor(
      public payload: BcResourcesAppAndSoftware
    ) {}
  }
  export class UpdateAppSys {
    static readonly type = '[BrowseAppSystem] Update AppSystem';
    /**
     *
     */
    constructor(
      public payload: BcResourcesAppAndSoftware
    ) {}
  }
  export class ToggleDialog {
    static readonly type = '[BrowseAppSystem] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { appSystemId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseAppSystem] Open View';
    /**
     *
     */
    constructor(public payload: { appSystemId: number }) {}
  }
  export class LoadMinLicense {
    static readonly type = '[BrowseAppSystem] Load Min License';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel } ) {
    }
  }
}
