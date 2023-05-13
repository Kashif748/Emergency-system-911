import { PageRequestModel } from '@core/models/page-request.model';
import {BcRecoveryPriorities} from "../../../../api/models/bc-recovery-priorities";
import {BcLocationTypes} from "../../../../api/models/bc-location-types";


export namespace BrowseActivityPrioritySeqAction {
  export class LoadActivityPrioritySeq {
    static readonly type = '[BrowseActivityPrioritySeq] Load ActivityPrioritySeq';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {
    }
  }

  export class CreateActivityPrioritySeq {
    static readonly type = '[BrowseActivityPrioritySeq] Create ActivityPrioritySeq';
    /**
     *
     */
    constructor(
      public payload: BcRecoveryPriorities
    ) {}
  }

  export class UpdateActivityPrioritySeq {
    static readonly type = '[BrowseActivityPrioritySeq] Update ActivityPrioritySeq';
    /**
     *
     */
    constructor(
      public payload: BcRecoveryPriorities
    ) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseActivityPrioritySeq] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { id?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseActivityPrioritySeq] Open View';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }
}
