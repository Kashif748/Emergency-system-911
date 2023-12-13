import { GroupContractRequest } from 'src/app/api/models/group-contract-request';
import { OrgMapGisLayer } from 'src/app/api/models/org-map-gis-layer';
import { Group } from '../../../api/models/group';
import { GroupUser } from '../../../api/models/group-user';
import { LocationGeoAndName } from '../../../api/models/location-geo-and-name';

export namespace GroupAction {
  export class LoadPage {
    static readonly type = '[Group] Load Page';
    /**
     *
     */
    constructor(
      public payload: {
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
      }
    ) {}
  }

  export class GetGroup {
    static readonly type = '[Group] Get Group';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class Export {
    static readonly type = '[Group] Export';
    /**
     *
     */
    constructor(
      public payload: {
        type: 'PDF' | 'EXCEL';
        filters?: { [key: string]: any };
      }
    ) {}
  }

  export class Activate {
    static readonly type = '[Group] Activate';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }

  export class Create {
    static readonly type = '[Group] Create';
    /**
     *
     */
    constructor(public payload: Group) {}
  }

  export class Delete {
    static readonly type = '[Group] Delete';
    /**
     *
     */
    constructor(public payload: Group) {}
  }

  export class CreateUser {
    static readonly type = '[Group] Create User';
    /**
     *
     */
    constructor(
      public payload: {
        groupId?: number;
        user: GroupUser[];
      }
    ) {}
  }

  export class GroupGeometryLocation {
    static readonly type = '[Group] Group Geometry Location';
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

  export class Update {
    static readonly type = '[Group] Update';
    /**
     *
     */
    constructor(public payload: Group) {}
  }

  export class UpdateUser {
    static readonly type = '[Group] Update user';
    /**
     *
     */
    constructor(
      public payload: {
        groupId: number;
        user: GroupUser[];
      }
    ) {}
  }

  export class UpdateManager {
    static readonly type = '[Group] Update Manager';
    /**
     *
     */
    constructor(
      public payload: {
        groupId: number;
        user: GroupUser;
      }
    ) {}
  }

  export class GetGeometryLocation {
    static readonly type = '[Group] Geometry Location';
    /**
     *
     */
    constructor(
      public payload: {
        id: number;
      }
    ) {}
  }

  export class LoadGroupMapUserPage {
    static readonly type = '[Group] Load User Page';
    /**
     *
     */
    constructor(
      public payload: {
        name: string;
        page: number;
        size: number;
        sort?: string[];
      }
    ) {}
  }

  export class AddContract {
    static readonly type = '[Group] Add Group Contract';
    /**
     *
     */
    constructor(public payload: GroupContractRequest) {}
  }
  export class GetContract {
    static readonly type = '[Group] Get Group Contract';
    /**
     *
     */
    constructor(public payload: { groupId: number }) {}
  }
}
