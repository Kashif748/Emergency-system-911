import {PageRequestModel} from '@core/models/page-request.model';
import {BcActivityLocations} from 'src/app/api/models';

export namespace BrowseActivityLocationsAction {
  export class LoadLocations {
    static readonly type = '[BrowseActivityLocationsAction] Load Locations ';

    /**
     *
     */
    constructor(
      public payload: {
        pageRequest?: PageRequestModel;
        cycleId: number;
        activityId: number;
      }
    ) {}
  }
  export class LoadBCLocations {
    static readonly type = '[BrowseLocations] Load BC Locations';

    /**
     *
     */
    constructor(
      public payload: { pageRequest?: PageRequestModel; name?: string }
    ) {}
  }

  export class Create {
    static readonly type = '[BrowseActivityLocationsAction] Create activity location';
    /**
     *
     */
    constructor(public payload: BcActivityLocations) {}
  }
  export class Update {
    static readonly type = '[BrowseActivityLocationsAction] Update activity location';
    /**
     *
     */
    constructor(public payload: BcActivityLocations) {}
  }

  export class GetLocation {
    static readonly type = '[BrowseActivityLocationsAction] Get System';
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
    static readonly type = '[BrowseActivityLocationsAction] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { id?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseActivityLocationsAction] Open View';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }
  export class Delete {
    static readonly type = '[BrowseActivityLocationsAction] Delete Employee';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
}
