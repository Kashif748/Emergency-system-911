import { PageRequestModel } from '@core/models/page-request.model';
import {BcWorkImportanceLevels} from "../../../../../api/models/bc-work-importance-levels";


export namespace BrowseImpLevelWorkingAction {
  export class LoadImpLevelWorking {
    static readonly type = '[BrowseImpLevelWorking] Load ImpLevelWorking';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel }) {
    }
  }

  export class CreateImpLevelWorking {
    static readonly type = '[BrowseImpLevelWorking] Create ImpLevelWorking';
    /**
     *
     */
    constructor(
      public payload: BcWorkImportanceLevels
    ) {}
  }

  export class UpdateImpLevelWorking {
    static readonly type = '[BrowseImpLevelWorking] Update ImpLevelWorking';
    /**
     *
     */
    constructor(
      public payload: BcWorkImportanceLevels
    ) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseImpLevelWorking] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { id?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseImpLevelWorking] Open View';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }
}
