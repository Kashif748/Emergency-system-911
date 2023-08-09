import { PageRequestModel } from '@core/models/page-request.model';
import { BcActivitySystems } from 'src/app/api/models';

export namespace BrowseActivitySystemsAction {
  export class LoadActivitySystems {
    static readonly type = '[BrowseActivitySystemsAction] Load ActivitySystems';

    /**
     *
     */
    constructor(
      public payload?: {
        pageRequest?: PageRequestModel;
        cycleId: number;
        activityId: number;
      }
    ) {}
  }

  export class Create {
    static readonly type = '[BrowseActivitySystemsAction] Create';
    /**
     *
     */
    constructor(public payload: BcActivitySystems) {}
  }
  export class Update {
    static readonly type = '[BrowseActivitySystemsAction] Update';
    /**
     *
     */
    constructor(public payload: BcActivitySystems) {}
  }

  export class GetSystem {
    static readonly type = '[BrowseActivitySystemsAction] Get System';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
  export class Delete {
    static readonly type = '[BrowseActivitySystemsAction] Delete System';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseActivitySystemsAction] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { id?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseActivitySystemsAction] Open View';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }
}
