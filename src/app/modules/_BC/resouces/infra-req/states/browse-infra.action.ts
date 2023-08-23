export namespace BrowseInfraAction {
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
