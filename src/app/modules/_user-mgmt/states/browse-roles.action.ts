import { PageRequestModel } from '@core/models/page-request.model';
import { Role } from 'src/app/api/models';

export namespace BrowseRolesAction {
  export class LoadRoles {
    static readonly type = '[BrowseRoles] Load Roles';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }

  export class SortRoles {
    static readonly type = '[BrowseRoles] Sort Roles';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }

  export class ChangeColumns {
    static readonly type = '[BrowseRoles] Change Columns';
    /**
     *
     */
    constructor(public payload: { columns: string[] }) {}
  }

  export class UpdateFilter {
    static readonly type = '[BrowseRoles] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }

  export class Export {
    static readonly type = '[BrowseRoles] Export';
    /**
     *
     */
    constructor(public payload: { type: 'PDF' | 'EXCEL' }) {}
  }

  export class ChangeView {
    static readonly type = '[BrowseRoles] Change View';
    constructor(public payload: { view: 'TABLE' | 'CARDS' }) {}
  }

  export class CreateRole {
    static readonly type = '[BrowseRoles] Create Role';
    /**
     *
     */
    constructor(public payload: Role) {}
  }

  export class UpdateRole {
    static readonly type = '[BrowseRoles] Update Role';
    /**
     *
     */
    constructor(public payload: Role) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseRoles] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { roleId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseRoles] Open View';
    /**
     *
     */
    constructor(public payload: { roleId?: number }) {}
  }
}
