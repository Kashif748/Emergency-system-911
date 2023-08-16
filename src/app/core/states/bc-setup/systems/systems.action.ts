import { BcSystems } from 'src/app/api/models';

export namespace SystemsAction {
  export class LoadPage {
    static readonly type = '[Systems] Load Page';

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

  export class Create {
    static readonly type = '[Systems] Create';
    /**
     *
     */
    constructor(public payload: BcSystems) {}
  }

  export class Delete {
    static readonly type = '[Systems] Delete';
    /**
     *
     */
    constructor(public payload: { id?: number }) {}
  }

  export class Update {
    static readonly type = '[Systems] Update';
    /**
     *
     */
    constructor(public payload: BcSystems) {}
  }

  export class GetSystem {
    static readonly type = '[Systems] Get System';
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
