import {PageRequestModel} from '@core/models/page-request.model';
import {BcActivities} from "../../../../api/models/bc-activities";

export namespace BrowseOrganizationAction {
  export class LoadOrganization {
    static readonly type = '[BrowseOrganization] Load Organization';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }

  export class SortOrganization {
    static readonly type = '[BrowseOrganization] Sort Organization';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }

  export class ChangeColumns {
    static readonly type = '[BrowseOrganization] Change Columns';
    /**
     *
     */
    constructor(public payload: { columns: string[] }) {}
  }

  export class UpdateFilter {
    static readonly type = '[BrowseOrganization] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }

  export class Export {
    static readonly type = '[BrowseOrganization] Export';
    /**
     *
     */
    constructor(public payload: { type: 'PDF' | 'EXCEL' }) {}
  }

  export class ChangeView {
    static readonly type = '[BrowseOrganization] Change View';
    constructor(public payload: { view: 'TABLE' | 'CARDS' }) {}
  }

  export class CreateOrganization {
    static readonly type = '[BrowseOrganization] Create Organization';
    /**
     *
     */
    constructor(public payload: BcActivities) {}
  }

  export class UpdateOrganization {
    static readonly type = '[BrowseOrganization] Update Organization';
    /**
     *
     */
    constructor(public payload: BcActivities) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseOrganization] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { organizationId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseOrganization] Open View';
    /**
     *
     */
    constructor(public payload: { organizationId?: number }) {}
  }
}
