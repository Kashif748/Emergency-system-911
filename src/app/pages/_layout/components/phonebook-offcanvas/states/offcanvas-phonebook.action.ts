import { PageRequestModel } from '@core/models/page-request.model';
export namespace OffcanvasPhonebookAction {
  export class LoadPhonebook {
    static readonly type = '[OffcanvasPhonebook] Load Phonebook';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }

  export class UpdateFilter {
    static readonly type = '[OffcanvasPhonebook] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }

  export class ToggleDialog {
    static readonly type = '[OffcanvasPhonebook] Toggle Dialog';
    /**
     *
     */
    constructor() {}
  }

  export class OpenView {
    static readonly type = '[OffcanvasPhonebook] Open View';
    /**
     *
     */
    constructor(public payload: { phonebookId: number }) {}
  }
}
