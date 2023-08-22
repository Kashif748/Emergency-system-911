export namespace BrowseAppSystemAction {
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
}
