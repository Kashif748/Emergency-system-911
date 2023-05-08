import {BcActivityFrequencies} from "../../../../api/models/bc-activity-frequencies";

export namespace ActivityPrioritySeqAction {
  export class LoadPage {
    static readonly type = '[ActivityPrioritySeq] Load Page';

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
    ) {
    }
  }

  export class Create {
    static readonly type = '[ActivityPrioritySeq] Create';
    /**
     *
     */
    constructor(
      public payload: BcActivityFrequencies
    ) {}
  }

  export class GetActivityPrioritySeq {
    static readonly type = '[ActivityPrioritySeq] Get ActivityPrioritySeq';
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
