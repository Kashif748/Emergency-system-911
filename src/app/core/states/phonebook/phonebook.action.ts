import { ExternalPhonebook } from 'src/app/api/models';

export namespace PhonebookAction {
  export class LoadPage {
    static readonly type = '[Phonebook] Load Page';
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

  export class LoadExternalOrgs {
    static readonly type = '[Phonebook] Load External Orgs';
    /**
     *
     */
    constructor(
      public payload: {
        orgName: string;
      }
    ) {}
  }
  export class LoadSidebarPage {
    static readonly type = '[Phonebook] Load Sidebar Page';
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
  export class GetPhonebook {
    static readonly type = '[Phonebook] Get Phonebook';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class Create {
    static readonly type = '[Phonebook] Create';
    /**
     *
     */
    constructor(public payload: ExternalPhonebook) {}
  }

  export class Update {
    static readonly type = '[Phonebook] Update';
    /**
     *
     */
    constructor(public payload: ExternalPhonebook) {}
  }
}
