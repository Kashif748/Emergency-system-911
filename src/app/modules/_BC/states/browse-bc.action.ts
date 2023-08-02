import { PageRequestModel } from '@core/models/page-request.model';
import { BcVersions } from '../../../api/models/bc-versions';

export namespace BrowseBCAction {
  export class LoadBusinessContinuity {
    static readonly type = '[BrowseBusinessContinuity] Load BusinessContinuity';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }
  export class GetVersion {
    static readonly type = '[BrowseBusinessContinuity] Get One';

    /**
     *
     */
    constructor(public payload?: { versionId: number }) {}
  }

  export class GetStatus {
    static readonly type = '[BrowseBusinessContinuity] Get Status';

    /**
     *
     */
    constructor(public payload?: { versionId: number; statusId: number }) {}
  }

  export class CreateBusinessContinuity {
    static readonly type =
      '[BrowseBusinessContinuity] Create BusinessContinuity';
    /**
     *
     */
    constructor(public payload: BcVersions) {}
  }

  export class UpdateBusinessContinuity {
    static readonly type = '[BrowseRto] Update BusinessContinuity';
    /**
     *
     */
    constructor(public payload: BcVersions) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseBusinessContinuity] Toggle Dialog';
    /**
     *
     */
    constructor() {}
  }
}
