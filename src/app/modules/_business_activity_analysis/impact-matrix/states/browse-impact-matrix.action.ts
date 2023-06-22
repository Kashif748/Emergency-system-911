import {PageRequestModel} from '@core/models/page-request.model';
import {BcImpactMatrixDto} from "../../../../api/models";


export namespace BrowseImpactMatrixAction {
  export class LoadImpactLevel {
    static readonly type = '[BrowseImpactMatrix] Load ImpactLevel Matrix';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {
    }
  }
  export class LoadImpactMatrix {
    static readonly type = '[BrowseImpactMatrix] Load ImpactMatrix';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel }) {
    }
  }

  export class CreateImpactMatrix {
    static readonly type = '[BrowseImpactMatrix] Create ImpactMatrix';
    /**
     *
     */
    constructor(
      public payload: BcImpactMatrixDto
    ) {}
  }

  export class UpdateImpactMatrix {
    static readonly type = '[BrowseImpactMatrix] Update ImpactMatrix';
    /**
     *
     */
    constructor(
      public payload: BcImpactMatrixDto
    ) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseImpactMatrix] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { id?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseImpactMatrix] Open View';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }
  export class LoadRto {
    static readonly type = '[BrowseImpactMatrix] Load Rto';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel }) {
    }
  }
}
