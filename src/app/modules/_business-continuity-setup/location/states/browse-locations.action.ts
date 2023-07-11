import { PageRequestModel } from '@core/models/page-request.model';
import { BcLocations } from 'src/app/api/models';

export namespace BrowseLocationsAction {
  export class LoadLocations {
    static readonly type = '[BrowseLocations] Load Locations';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel }) {}
  }

  export class GetLocation {
    static readonly type = '[BrowseLocations] Get Location';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
  export class CreateLocation {
    static readonly type = '[BrowseLocations] Create Location';
    /**
     *
     */
    constructor(public payload: BcLocations) {}
  }

  export class UpdateLocation {
    static readonly type = '[BrowseLocations] Update Location';
    /**
     *
     */
    constructor(public payload: BcLocations) {}
  }


  export class UpdateFilter {
    static readonly type = '[BrowseLocations] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }
  export class ToggleDialog {
    static readonly type = '[BrowseLocations] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { locationId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseLocations] Open View';
    /**
     *
     */
    constructor(public payload: { locationId: number }) {}
  }

  export class ChangeColumns {
    static readonly type = '[BrowseLocations] Change Columns';
    /**
     *
     */
    constructor(public payload: { columns: string[] }) {}
  }
}
