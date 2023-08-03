import { PageRequestModel } from '@core/models/page-request.model';
import {
  BcActivityImpactMatrixDetailsDto,
  BcImpactMatrixDto,
} from 'src/app/api/models';

export namespace BrowseActivityImpactMatrixAction {
  export class LoadPage {
    static readonly type = '[BrowseImpactMatrix] Load Page';

    /**
     *
     */
    constructor(
      public payload: {
        pageRequest?: PageRequestModel;
        cycleId: number;
        activityId: number;
      }
    ) {}
  }
  export class LoadImpactLevel {
    static readonly type = '[BrowseImpactMatrix] Load ImpactLevel Matrix';

    /**
     *
     */
    constructor(
      public payload: { pageRequest: PageRequestModel; versionId: number }
    ) {}
  }
  export class LoadImpactMatrix {
    static readonly type = '[BrowseImpactMatrix] Load ImpactMatrix';

    /**
     *
     */
    constructor(
      public payload: { pageRequest?: PageRequestModel; versionId: number }
    ) {}
  }

  export class CreateImpactMatrix {
    static readonly type = '[BrowseImpactMatrix] Create ImpactMatrix';
    /**
     *
     */
    constructor(public payload: BcImpactMatrixDto) {}
  }

  export class UpdateImpactMatrix {
    static readonly type = '[BrowseImpactMatrix] Update ImpactMatrix';
    /**
     *
     */
    constructor(public payload: BcActivityImpactMatrixDetailsDto) {}
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
    constructor(
      public payload?: { pageRequest?: PageRequestModel; versionId: number }
    ) {}
  }
}
