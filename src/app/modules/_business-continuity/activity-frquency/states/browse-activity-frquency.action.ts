import {PageRequestModel} from "@core/models/page-request.model";
import {BcActivityFrequencies} from "../../../../api/models/bc-activity-frequencies";


export namespace BrowseActivityFrquencyAction {
  export class LoadActivityFrquency {
    static readonly type = '[BrowseActivityFrquency] Load ActivityFrquency';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {
    }
  }

  export class CreateActivityFrquency {
    static readonly type = '[BrowseActivityFrquency] Create ActivityFrquency';
    /**
     *
     */
    constructor(
      public payload: BcActivityFrequencies
    ) {}
  }

  export class UpdateActivityFrquency {
    static readonly type = '[BrowseActivityFrquency] Update ActivityFrquency';
    /**
     *
     */
    constructor(
      public payload: BcActivityFrequencies
    ) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseActivityFrquency] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { id?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseActivityFrquency] Open View';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }
}
