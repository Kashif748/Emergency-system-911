import {Group} from "../../../api/models/group";
import {GroupUser} from "../../../api/models/group-user";

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
    constructor(
      public payload: Group
    ) {}
  }

  export class Delete {
    static readonly type = '[Group] Delete';
    /**
     *
     */
    constructor(
      public payload: Group
    ) {}
  }

  export class CreateUser {
    static readonly type = '[Group] Create User';
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

 /* export class CreateGroupMapUser {
    static readonly type = '[Group] Create Group Map User';
    /!**
     *
     *!/
    constructor(
      public payload: {
        groupId: number,
        user: GroupUser[]
      }

    ) {}
  }*/

  export class Update {
    static readonly type = '[Group] Update';
    /**
     *
     */
    constructor(
      public payload: Group
    ) {}
  }
}
