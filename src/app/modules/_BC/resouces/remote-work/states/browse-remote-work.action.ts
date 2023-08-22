export namespace BrowseRemoteWorkAction {
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
