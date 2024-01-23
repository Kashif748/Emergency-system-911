import { PageRequestModel } from '@core/models/page-request.model';
import { VERSION_STATUSES } from '@core/states/bc/bc/bc.state';
import { BcVersions } from '../../../api/models/bc-versions';

export namespace BrowseBCAction {
  export class LoadPage {
    static readonly type = '[BrowseBusinessContinuity] Load Page';

    /**
     *
     */
    constructor(
      public payload?: { pageRequest?: PageRequestModel; statusId?: number }
    ) {}
  }
  export class GetVersion {
    static readonly type = '[BrowseBusinessContinuity] Get One';

    /**
     *
     */
    constructor(public payload?: { versionId: number }) {}
  }

  export class ChangeStatus {
    static readonly type = '[BrowseBusinessContinuity] Change Status';

    /**
     *
     */
    constructor(
      public payload?: { versionId: number; statusId: VERSION_STATUSES }
    ) {}
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

  export class SetVersionId {
    static readonly type = '[BrowseBusinessContinuity] Set Version ID';
    /**
     *
     */
    constructor(public payload: { versionId: number }) {}
  }
  export class Sort {
    static readonly type =
      '[BrowseBusinessContinuity] Sort version List';

    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }
  export class Delete {
    static readonly type = '[BrowseBusinessContinuity] Delete Version';
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
