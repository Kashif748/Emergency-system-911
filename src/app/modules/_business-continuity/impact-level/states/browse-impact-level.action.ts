import { PageRequestModel } from '@core/models/page-request.model';
import {BcImpactLevel} from "../../../../api/models/bc-impact-level";


export namespace BrowseImpactLevelAction {
  export class LoadImpactLevel {
    static readonly type = '[BrowseImpactLevel] Load ImpactLevel';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {
    }
  }

  export class CreateImpactLevel {
    static readonly type = '[BrowseImpactLevel] Create ImpactLevel';
    /**
     *
     */
    constructor(
      public payload: BcImpactLevel
    ) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseImpactLevel] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { id?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseImpactLevel] Open View';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }
}
