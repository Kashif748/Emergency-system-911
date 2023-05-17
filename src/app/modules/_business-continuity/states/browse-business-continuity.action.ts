import { PageRequestModel } from '@core/models/page-request.model';
import {BcVersions} from "../../../api/models/bc-versions";



export namespace BrowseBusinessContinuityAction {
  export class LoadBusinessContinuity {
    static readonly type = '[BrowseBusinessContinuity] Load BusinessContinuity';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {
    }
  }

  export class CreateBusinessContinuity {
    static readonly type = '[BrowseBusinessContinuity] Create BusinessContinuity';
    /**
     *
     */
    constructor(
      public payload: BcVersions
    ) {}
  }

  export class UpdateBusinessContinuity {
    static readonly type = '[BrowseRto] Update BusinessContinuity';
    /**
     *
     */
    constructor(
      public payload: BcVersions
    ) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseBusinessContinuity] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { Id?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseBusinessContinuity] Open View';
    /**
     *
     */
    constructor(public payload: { Id: number }) {}
  }

  export class SetGlobalVersion {
    static readonly type = '[BrowseBusinessContinuity] Set Version';
    /**
     *
     */
    constructor(public payload: { id?: number, currentTab: string }) {}
  }
}
