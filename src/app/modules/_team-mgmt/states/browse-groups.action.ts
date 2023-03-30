import { PageRequestModel } from '@core/models/page-request.model';
import {
  User,
  UserInappAuthentication,
  UserMiddlewareAuth,
} from 'src/app/api/models';
import {Group} from "../../../api/models/group";
import {GroupUser} from "../../../api/models/group-user";
import {LocationGeoAndName} from "../../../api/models/location-geo-and-name";
import {CenterRequest} from "../../../api/models/center-request";
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

  export class AddGeometryLocation {
    static readonly type = '[BrowseGroups] Add Geometry Location';
    /**
     *
     */
    constructor(
      public payload: {
        categoryIds: number[];
        groupId: number;
        location?: LocationGeoAndName[];
      }

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
      public payload: {
        groupId?: number,
        user: GroupUser[]
      }
    ) {}
  }

  export class UpdateUser {
    static readonly type = '[BrowseGroups] update User';
    /**
     *
     */
    constructor(
      public payload: {
        groupId: number,
        user: GroupUser[]
      }
    ) {}
  }

  export class UpdateManager {
    static readonly type = '[BrowseGroups] update Manager';
    /**
     *
     */
    constructor(
      public payload: {
        groupId: number,
        user: GroupUser
      }
    ) {}
  }

  export class OpenView {
    static readonly type = '[BrowseGroups] Open View';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }

  export class AddIncidentLocInfo {
    static readonly type = '[BrowseGroups] Incident Loc Info';
    /**
     *
     */
    constructor(
      public payload: {
        centers: Array<CenterRequest>;
        groupId: number;
      }
    ) {}
  }

  export class UpdateIncidentLocInfo {
    static readonly type = '[BrowseGroups] update Incident Loc Info';
    /**
     *
     */
    constructor(
      public payload: {
        centers: Array<CenterRequest>;
        groupId: number;
      }
    ) {}
  }
}
