import { PageRequestModel } from '@core/models/page-request.model';
import { BcImpactLevel } from 'src/app/api/models';

export namespace BrowseImpactLevelAction {
  export class LoadImpactLevel {
    static readonly type = '[BrowseImpactLevel] Load ImpactLevel';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel , versionId: number }) {}
  }

  export class CreateImpactLevel {
    static readonly type = '[BrowseImpactLevel] Create ImpactLevel';
    /**
     *
     */
    constructor(public payload: BcImpactLevel) {}
  }
  export class UpdateImpactLevel {
    static readonly type = '[BrowseImpactLevel] Update ImpactLevel';
    /**
     *
     */
    constructor(public payload: BcImpactLevel) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseImpactLevel] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { id?: number }) {}
  }
}
