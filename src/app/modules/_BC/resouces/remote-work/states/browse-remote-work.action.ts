import {PageRequestModel} from "@core/models/page-request.model";
import {BcResourcesRemoteWork} from "../../../../../api/models/bc-resources-remote-work";

export namespace BrowseRemoteWorkAction {
  export class LoadRemoteWork {
    static readonly type = '[BrowseRemoteWork] Load RemoteWork';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel , resourceId: number } ) {
    }
  }
  export class CreateRemoteWork {
    static readonly type = '[BrowseRemoteWork] Create RemoteWork';
    /**
     *
     */
    constructor(
      public payload: BcResourcesRemoteWork
    ) {}
  }

  export class UpdateRemoteWork {
    static readonly type = '[BrowseRemoteWork] Update RemoteWork';
    /**
     *
     */
    constructor(
      public payload: BcResourcesRemoteWork
    ) {}
  }
  export class ToggleDialog {
    static readonly type = '[BrowseRemoteWork] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { remoteWorkId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseRemoteWork] Open View';
    /**
     *
     */
    constructor(public payload: { remoteWorkId: number }) {}
  }
}
