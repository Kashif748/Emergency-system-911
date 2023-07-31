import { PageRequestModel } from '@core/models/page-request.model';
import { BcActivityAnalysisDto, BcCycles } from 'src/app/api/models';

export namespace BrowseImpactAnalysisAction {
  export class LoadPage {
    static readonly type =
      '[BrowseImpactAnalysisAction] Load Activity Analysis';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }

  export class LoadActivitiesStatuses {
    static readonly type =
      '[BrowseImpactAnalysisAction] Load Activities Statuses';

    /**
     *
     */
    constructor() {}
  }

  export class LoadCycles {
    static readonly type = '[BrowseImpactAnalysisAction] Load Cycles';

    /**
     *
     */
    constructor(
      public payload: {
        page: number;
        size: number;
      }
    ) {}
  }
  export class CreateCycle {
    static readonly type = '[BrowseImpactAnalysisAction] Create Cycle';
    /**
     *
     */
    constructor(public payload: BcCycles) {}
  }

  export class SetCycleActivities {
    static readonly type = '[BrowseImpactAnalysisAction] Set Cycle Activites';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysisDto[]) {}
  }

  export class Sort {
    static readonly type =
      '[BrowseImpactAnalysisAction] Sort Activity Analysis';

    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }

  export class ChangeColumns {
    static readonly type = '[BrowseImpactAnalysisAction] Change Columns';

    /**
     *
     */
    constructor(public payload: { columns: string[] }) {}
  }

  export class UpdateFilter {
    static readonly type = '[BrowseImpactAnalysisAction] Update Filter';

    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }

  export class ChangeView {
    static readonly type = '[BrowseImpactAnalysisAction] Change View';

    constructor(public payload: { view: 'TABLE' | 'CARDS' }) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseImpactAnalysisAction] Toggle Dialog';

    /**
     *
     */
    constructor(public payload: { dialog?: string; id?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseImpactAnalysisAction] Open View';

    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }
}
