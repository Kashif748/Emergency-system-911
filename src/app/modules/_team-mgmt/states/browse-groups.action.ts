import { PageRequestModel } from '@core/models/page-request.model';
import {Group} from "../../../api/models/group";
import {GroupUser} from "../../../api/models/group-user";
export namespace BrowseGroupsAction {
  export class LoadGroups {
    static readonly type = '[BrowseGroups] Load Groups';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }

  export class SortGroups {
    static readonly type = '[BrowseGroups] Sort Groups';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }

  export class ChangeColumns {
    static readonly type = '[BrowseGroups] Change Columns';
    /**
     *
     */
    constructor(public payload: { columns: string[] }) {}
  }

  export class UpdateFilter {
    static readonly type = '[BrowseGroups] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }

  export class Export {
    static readonly type = '[BrowseGroups] Export';
    /**
     *
     */
    constructor(public payload: { type: 'PDF' | 'EXCEL' }) {}
  }

  export class ChangeView {
    static readonly type = '[BrowseGroups] Change View';
    constructor(public payload: { view: 'TABLE' | 'CARDS' }) {}
  }

  export class CreateGroup {
    static readonly type = '[BrowseGroups] Create Group';
    /**
     *
     */
    constructor(
      public payload: Group
    ) {}
  }

  export class UpdateGroup {
    static readonly type = '[BrowseGroups] Update Group';
    /**
     *
     */
    constructor(
      public payload: Group
    ) {}
  }

  export class DeletedGroup {
    static readonly type = '[BrowseGroups] Delete Group';
    /**
     *
     */
    constructor(
      public payload: Group
    ) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseGroups] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { id?: number }) {}
  }

  export class CreateUser {
    static readonly type = '[BrowseGroups] Create User';
    /**
     *
     */
    constructor(
      public payload: GroupUser[]
    ) {}
  }

  export class OpenView {
    static readonly type = '[BrowseGroups] Open View';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }
}
