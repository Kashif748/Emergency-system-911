import {BcActivityFrequencies} from "../../../../api/models/bc-activity-frequencies";
import {Bcrto} from "../../../../api/models/bcrto";

export namespace ActivityFrquencyAction {
  export class LoadPage {
    static readonly type = '[ActivityFrq] Load Page';

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
    static readonly type = '[ActivityFrq] Create';
    /**
     *
     */
    constructor(
      public payload: BcActivityFrequencies
    ) {}
  }

  export class Update {
    static readonly type = '[ActivityFrq] Update';
    /**
     *
     */
    constructor(
      public payload: BcActivityFrequencies
    ) {}
  }

  export class GetActivityFrq {
    static readonly type = '[ActivityFrq] Get ActivityFrq';
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
