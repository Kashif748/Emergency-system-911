import { BcActivityFrequencies } from "src/app/api/models";


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
        versionId: number

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

  export class Update {
    static readonly type = '[ActivityPrioritySeq] Update';
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
