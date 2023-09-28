import { BcLocations } from 'src/app/api/models';

export namespace LocationsAction {
  export class LoadPage {
    static readonly type = '[Locations] Load Page';

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
    static readonly type = '[Locations] Create';
    /**
     *
     */
    constructor(public payload: BcLocations) {}
  }

  export class Update {
    static readonly type = '[Locations] Update';
    /**
     *
     */
    constructor(public payload: BcLocations) {}
  }

  export class GetLocation {
    static readonly type = '[Locations] Get Location';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
  export class Delete {
    static readonly type = '[Locations] Delete';
    /**
     *
     */
    constructor(public payload: { id?: number }) {}
  }
}
