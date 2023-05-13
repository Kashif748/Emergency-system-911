import { PageRequestModel } from '@core/models/page-request.model';
import {Bcrto} from "../../../../api/models/bcrto";


export namespace BrowseRtoAction {
  export class LoadRto {
    static readonly type = '[BrowseRto] Load Rto';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {
    }
  }

  export class CreateRto {
    static readonly type = '[BrowseRto] Create Rto';
    /**
     *
     */
    constructor(
      public payload: Bcrto
    ) {}
  }

  export class UpdateRto {
    static readonly type = '[BrowseRto] Update Rto';
    /**
     *
     */
    constructor(
      public payload: Bcrto
    ) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseRto] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { rtoId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseRto] Open View';
    /**
     *
     */
    constructor(public payload: { rtoId: number }) {}
  }
}
