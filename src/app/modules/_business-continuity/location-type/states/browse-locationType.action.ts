import { PageRequestModel } from '@core/models/page-request.model';
import {BcLocationTypes} from "../../../../api/models/bc-location-types";


export namespace BrowseLocationTypeAction {
  export class LoadLocationType {
    static readonly type = '[BrowseLocationType] Load LocationType';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {
    }
  }

  export class CreateLocationType {
    static readonly type = '[BrowseLocationType] Create LocationType';
    /**
     *
     */
    constructor(
      public payload: BcLocationTypes
    ) {}
  }

  export class UpdateLocationType {
    static readonly type = '[BrowseRto] Update LocationType';
    /**
     *
     */
    constructor(
      public payload: BcLocationTypes
    ) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseLocationType] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { id?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseLocationType] Open View';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }
}
