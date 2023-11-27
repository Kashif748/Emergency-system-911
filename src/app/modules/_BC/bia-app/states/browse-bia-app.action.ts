import {PageRequestModel} from '@core/models/page-request.model';
import {BcActivities} from "../../../../api/models/bc-activities";
import {BcActivityAnalysisDto, BcCycles} from "../../../../api/models";
import {BcResources} from "../../../../api/models/bc-resources";
import {VERSION_STATUSES} from "@core/states/bc/bc/bc.state";

export namespace BrowseBiaAppAction {
  export class LoadBia{
    static readonly type = '[BrowseBiaApp] Load Bia';
    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel, cycleId?: number }) {}
  }

  export class SortBia {
    static readonly type = '[BrowseBiaApp] Sort Bia';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc', cycle?: number }) {}
  }

  export class ChangeColumns {
    static readonly type = '[BrowseBiaApp] Change Columns';
    /**
     *
     */
    constructor(public payload: { columns: string[] }) {}
  }

  export class UpdateFilter {
    static readonly type = '[BrowseBiaApp] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }

  export class Export {
    static readonly type = '[BrowseBiaApp] Export';
    /**
     *
     */
    constructor(public payload: { type: 'PDF' | 'EXCEL' }) {}
  }

  export class ChangeView {
    static readonly type = '[BrowseBiaApp] Change View';
    constructor(public payload: { view: 'TABLE' | 'CARDS' }) {}
  }

  export class CreateBia {
    static readonly type = '[BrowseBiaApp] Create Bia';
    /**
     *
     */
    constructor(public payload: BcActivities) {}
  }

  export class UpdateBia {
    static readonly type = '[BrowseBiaApp] Update Bia';
    /**
     *
     */
    constructor(public payload: BcActivities) {}
  }
  export class LoadCycles {
    static readonly type = '[BrowseBiaApp] Load Cycles';

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

  export class LoadActivitiesStatuses {
    static readonly type =
      '[BrowseBiaApp] Load Activities Statuses';

    /**
     *
     */
    constructor() {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseBiaApp] Toggle Dialog';

    /**
     *
     */
    constructor(public payload: { dialog?: string; id?: number; cycle?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseBiaApp] Open View';
    /**
     *
     */
    constructor(public payload: { BiaId?: number }) {}
  }
  export class CreateCycle {
    static readonly type = '[BrowseBiaApp] Create Cycle';
    /**
     *
     */
    constructor(public payload: {form: BcCycles, cycle: number}) {}
  }
  export class UpdateCycle {
    static readonly type = '[BrowseBiaApp] Update Cycle';

    /**
     *
     */
    constructor(public payload: { [key: string]: any }) {}
  }

  export class SetCycleActivities {
    static readonly type = '[BrowseBiaApp] Set Cycle Activites';
    /**
     *
     */
    constructor(public payload: BcActivityAnalysisDto[]) {}
  }
  export class Delete {
    static readonly type = '[BrowseBiaApp] Delete Cycle';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class ChangeCycleStatus {
    static readonly type = '[BrowseBiaApp] Change Cycle Status';

    /**
     *
     */
    constructor(
      public payload?: { cycleId: number; statusId: VERSION_STATUSES }
    ) {}
  }
  export class SortCycle {
    static readonly type = '[BrowseBiaApp] Sort Cycle';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc', cycle?: number }) {}
  }
}
