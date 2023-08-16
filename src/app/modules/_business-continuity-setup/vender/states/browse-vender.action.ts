import {PageRequestModel} from '@core/models/page-request.model';
import {BcActivities} from "../../../../api/models/bc-activities";

export namespace BrowseVenderAction {
  export class LoadVender {
    static readonly type = '[BrowseVender] Load Vender';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }

  export class SortVender {
    static readonly type = '[BrowseVender] Sort Vender';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }

  export class ChangeColumns {
    static readonly type = '[BrowseVender] Change Columns';
    /**
     *
     */
    constructor(public payload: { columns: string[] }) {}
  }

  export class UpdateFilter {
    static readonly type = '[BrowseVender] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }

  export class Export {
    static readonly type = '[BrowseVender] Export';
    /**
     *
     */
    constructor(public payload: { type: 'PDF' | 'EXCEL' }) {}
  }

  export class ChangeView {
    static readonly type = '[BrowseVender] Change View';
    constructor(public payload: { view: 'TABLE' | 'CARDS' }) {}
  }

  export class CreateVender {
    static readonly type = '[BrowseVender] Create Vender';
    /**
     *
     */
    constructor(public payload: BcActivities) {}
  }

  export class UpdateVender {
    static readonly type = '[BrowseVender] Update Vender';
    /**
     *
     */
    constructor(public payload: BcActivities) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseVender] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { venderId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseVender] Open View';
    /**
     *
     */
    constructor(public payload: { venderId?: number }) {}
  }
}
