export namespace BrowseOtherAction {
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
