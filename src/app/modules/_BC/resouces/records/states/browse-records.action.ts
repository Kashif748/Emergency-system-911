export namespace BrowseRecordAction {
  export class ToggleDialog {
    static readonly type = '[BrowseRecord] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { recordId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseRecord] Open View';
    /**
     *
     */
    constructor(public payload: { recordId: number }) {}
  }
}
