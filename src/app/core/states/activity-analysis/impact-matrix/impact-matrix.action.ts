import { BcActivityImpactMatrix, BcActivityImpactMatrixDetailsDto } from "src/app/api/models";

export namespace ActivityImapctMatrixAction {
  export class LoadPage {
    static readonly type = '[BcActivityImpactMatrix] Load Page';

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
    static readonly type = '[BcActivityImpactMatrix] Create';
    /**
     *
     */
    constructor(public payload: BcActivityImpactMatrix) {}
  }
  export class Update {
    static readonly type = '[BcActivityImpactMatrix] Update';
    /**
     *
     */
    constructor(public payload: BcActivityImpactMatrixDetailsDto) {}
  }

  export class GetImpactMatrix {
    static readonly type = '[BcActivityImpactMatrix] Get ImpactMatrix';
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
