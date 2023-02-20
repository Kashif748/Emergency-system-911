import { PageRequestModel } from '@core/models/page-request.model';
import {
  User,
  UserInappAuthentication,
  UserMiddlewareAuth,
} from 'src/app/api/models';
export namespace BrowsePhonebookAction {
  export class LoadPhonebook {
    static readonly type = '[BrowsePhonebook] Load Phonebook';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }

  export class LoadUsers {
    static readonly type = '[BrowseUsers] Load Users';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }

  export class SortPhonebook {
    static readonly type = '[BrowsePhonebook] Sort Phonebook';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }


  export class UpdateFilter {
    static readonly type = '[BrowsePhonebook] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }

  export class ChangeView {
    static readonly type = '[BrowsePhonebook] Change View';
    constructor(public payload: { view: 'TABLE' | 'CARDS' }) {}
  }

  export class CreateUser {
    static readonly type = '[BrowsePhonebook] Create Phonebook';
    /**
     *
     */
    constructor(
      public payload: User & UserInappAuthentication & UserMiddlewareAuth
    ) {}
  }

  export class UpdatePhonebook {
    static readonly type = '[BrowsePhonebook] Update Phonebook';
    /**
     *
     */
    constructor(
      public payload: User & UserInappAuthentication & UserMiddlewareAuth
    ) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowsePhonebook] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { userId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowsePhonebook] Open View';
    /**
     *
     */
    constructor(public payload: { userId: number }) {}
  }
}
