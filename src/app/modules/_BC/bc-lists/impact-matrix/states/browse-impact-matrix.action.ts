import {PageRequestModel} from '@core/models/page-request.model';
import { BcImpactMatrixDto } from 'src/app/api/models';


export namespace BrowseImpactMatrixAction {
  export class LoadImpactMatrix {
    static readonly type = '[BrowseImpactMatrix] Load ImpactMatrix';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel , versionId: number}) {
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

  export class Export {
    static readonly type = '[BrowseImpactMatrix] Export';
    /**
     *
     */
    constructor(public payload: { type: 'PDF' | 'EXCEL', versionId: number }) {}
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
  export class LoadImpactLevel {
    static readonly type = '[BrowseImpactLevel] Load ImpactLevel Matrix';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel  , versionId: number }) {
    }
  }

}
