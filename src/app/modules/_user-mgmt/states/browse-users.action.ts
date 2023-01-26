import { PageRequestModel } from '@core/models/page-request.model';
import {
  User,
  UserInappAuthentication,
  UserMiddlewareAuth,
} from 'src/app/api/models';
export namespace BrowseUsersAction {
  export class LoadUsers {
    static readonly type = '[BrowseUsers] Load Users';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }

  export class SortUsers {
    static readonly type = '[BrowseUsers] Sort Users';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }

  export class ChangeColumns {
    static readonly type = '[BrowseUsers] Change Columns';
    /**
     *
     */
    constructor(public payload: { columns: string[] }) {}
  }

  export class UpdateFilter {
    static readonly type = '[BrowseUsers] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }

  export class Export {
    static readonly type = '[BrowseUsers] Export';
    /**
     *
     */
    constructor(public payload: { type: 'PDF' | 'EXCEL' }) {}
  }

  export class ChangeView {
    static readonly type = '[BrowseUsers] Change View';
    constructor(public payload: { view: 'TABLE' | 'CARDS' }) {}
  }

  export class CreateUser {
    static readonly type = '[BrowseUsers] Create User';
    /**
     *
     */
    constructor(
      public payload: User & UserInappAuthentication & UserMiddlewareAuth
    ) {}
  }

  export class UpdateUser {
    static readonly type = '[BrowseUsers] Update User';
    /**
     *
     */
    constructor(
      public payload: User & UserInappAuthentication & UserMiddlewareAuth
    ) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseUsers] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { userId?: number }) {}
  }

  export class UploadSignature {
    static readonly type = '[BrowseUsers] Upload Signature';
    /**
     *
     */
    constructor(public payload: { file: File }) {}
  }

  export class UploadProfilePhoto {
    static readonly type = '[BrowseUsers] Upload Profile Photo';
    /**
     *
     */
    constructor(public payload: { file: File }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseUsers] Open View';
    /**
     *
     */
    constructor(public payload: { userId: number }) {}
  }
}
