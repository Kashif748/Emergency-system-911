import {PageRequestModel} from "@core/models/page-request.model";
import {BcResourcesNonItInfrastructure} from "../../../../../api/models/bc-resources-non-it-infrastructure";

export namespace BrowseOtherAction {
  export class LoadOther {
    static readonly type = '[BrowseOther] Load Other';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel , resourceId: number } ) {
    }
  }
  export class CreateOther {
    static readonly type = '[BrowseOther] Create Other';
    /**
     *
     */
    constructor(
      public payload: BcResourcesNonItInfrastructure
    ) {}
  }
  export class UpdateOther {
    static readonly type = '[BrowseOther] Update Other';
    /**
     *
     */
    constructor(
      public payload: BcResourcesNonItInfrastructure
    ) {}
  }
  export class ToggleDialog {
    static readonly type = '[BrowseOther] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { otherId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseOther] Open View';
    /**
     *
     */
    constructor(public payload: { otherId: number }) {}
  }
}
