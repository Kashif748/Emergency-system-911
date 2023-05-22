import {PageRequestModel} from '@core/models/page-request.model';
import {BcImpactTypesMatrix} from "../../../../api/models/bc-impact-types-matrix";
import {BcImpactMatrixDto} from "../../../../api/models";


export namespace BrowseImpactMatrixAction {
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
      public payload: BcImpactTypesMatrix
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
}
