export namespace BrowseStaffAction {
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
}
