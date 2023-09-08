import {PageRequestModel} from "@core/models/page-request.model";
import {BcResourcesItInfrastructure} from "../../../../../api/models/bc-resources-it-infrastructure";

export namespace BrowseInfraAction {
  export class LoadInfra {
    static readonly type = '[BrowseInfra] Load Infra';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel , resourceId: number } ) {
    }
  }
  export class CreateInfra {
    static readonly type = '[BrowseInfra] Create Infra';
    /**
     *
     */
    constructor(
      public payload: BcResourcesItInfrastructure
    ) {}
  }
  export class UpdateInfra {
    static readonly type = '[BrowseInfra] Update Infra';
    /**
     *
     */
    constructor(
      public payload: BcResourcesItInfrastructure
    ) {}
  }
  export class ToggleDialog {
    static readonly type = '[BrowseInfra] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { infraId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseInfra] Open View';
    /**
     *
     */
    constructor(public payload: { infraId: number }) {}
  }
}
