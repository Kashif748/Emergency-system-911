import {PageRequestModel} from '@core/models/page-request.model';
import {BcActivities} from "../../../../api/models/bc-activities";

export namespace BrowseBiaAppAction {
  export class LoadBia{
    static readonly type = '[BrowseBiaApp] Load Bia';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }

  export class SortBia {
    static readonly type = '[BrowseBiaApp] Sort Bia';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
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

  export class ToggleDialog {
    static readonly type = '[BrowseBiaApp] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { BiaId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseBiaApp] Open View';
    /**
     *
     */
    constructor(public payload: { BiaId?: number }) {}
  }
}