import { BcActivityLocations } from "src/app/api/models";

export namespace ActivityLocationsAction {
  export class LoadPage {
    static readonly type = '[BcActivityLocations] Load Page';

    /**
     *
     */
    constructor(
      public payload: {
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
        cycleId :number;
        activityId: number
      }
    ) {}
  }

  export class Create {
    static readonly type = '[BcActivityLocations] Create';
    /**
     *
     */
    constructor(public payload: BcActivityLocations) {}
  }
  export class Update {
    static readonly type = '[BcActivityLocations] Update';
    /**
     *
     */
    constructor(public payload: BcActivityLocations) {}
  }

  export class GetLocation {
    static readonly type = '[BcActivityLocations] Get Location';
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
