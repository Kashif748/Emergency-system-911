import { BcActivityFrequencies } from "src/app/api/models";

export namespace ActivityFrquencyAction {
  export class LoadPage {
    static readonly type = '[ActivityFrquency] Load Page';

    /**
     *
     */
    constructor(
      public payload: {
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
        search?: string;
      }
    ) {
    }
  }

  export class Create {
    static readonly type = '[ActivityFrquency] Create';
    /**
     *
     */
    constructor(
      public payload: BcActivityFrequencies
    ) {}
  }

  export class Update {
    static readonly type = '[ActivityFrquency] Update';
    /**
     *
     */
    constructor(
      public payload: BcActivityFrequencies
    ) {}
  }

  export class GetActivityFrq {
    static readonly type = '[ActivityFrquency] Get ActivityFrq';
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
