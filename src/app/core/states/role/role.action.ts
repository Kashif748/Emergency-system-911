import { Role } from 'src/app/api/models';

export namespace RoleAction {
  export class LoadRoles {
    static readonly type = '[Role] Load Roles';
    /**
     *
     */
    constructor(public payload: { orgId: number }) {}
  }

  export class LoadPage {
    static readonly type = '[Role] Load Page';
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

  export class GetRole {
    static readonly type = '[Role] Get Role';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class Activate {
    static readonly type = '[Role] Activate';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }

  export class Create {
    static readonly type = '[Role] Create';
    /**
     *
     */
    constructor(public payload: Role) {}
  }

  export class Update {
    static readonly type = '[Role] Update';
    /**
     *
     */
    constructor(public payload: Role) {}
  }
}
