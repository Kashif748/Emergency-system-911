import {
  User,
  UserInappAuthentication,
  UserMiddlewareAuth,
} from 'src/app/api/models';

export namespace UserAction {
  export class LoadPage {
    static readonly type = '[User] Load Page';
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


   export class LoadUsers {
    static readonly type = '[User] Load Users';
    /**
     *
     */
    constructor(
      public payload: {
        search?: string;
        code?: string;
        sort?: string[];
        page: number;
        size: number;
        isolatedKey?: string;
      }
    ) {}
  }

  export class GetUser {
    static readonly type = '[User] Get User';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class GetRanks {
    static readonly type = '[User] Get Ranks';
    /**
     *
     */
    constructor(public payload: {}) {}
  }

  export class Export {
    static readonly type = '[User] Export';
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
    static readonly type = '[User] Activate';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }

  export class Create {
    static readonly type = '[User] Create';
    /**
     *
     */
    constructor(
      public payload: User & UserInappAuthentication & UserMiddlewareAuth
    ) {}
  }

  export class Update {
    static readonly type = '[User] Update';
    /**
     *
     */
    constructor(
      public payload: User & UserInappAuthentication & UserMiddlewareAuth
    ) {}
  }

  export class UploadSignature {
    static readonly type = '[User] Upload Signature';
    /**
     *
     */
    constructor(public payload: { file: File }) {}
  }

  export class UploadProfilePhoto {
    static readonly type = '[User] Upload Profile Photo';
    /**
     *
     */
    constructor(public payload: { file: File }) {}
  }
}
