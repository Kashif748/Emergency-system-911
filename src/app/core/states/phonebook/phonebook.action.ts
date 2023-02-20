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
}
