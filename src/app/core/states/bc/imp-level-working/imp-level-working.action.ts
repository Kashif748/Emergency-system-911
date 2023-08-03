import {BcWorkImportanceLevels} from "../../../../api/models/bc-work-importance-levels";
export namespace ImpLevelWorkingAction {
  export class LoadPage {
    static readonly type = '[ImpLevelWorking] Load Page';

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
    static readonly type = '[ImpLevelWorking] Create';
    /**
     *
     */
    constructor(
      public payload: BcWorkImportanceLevels
    ) {}
  }

  export class Update {
    static readonly type = '[ImpLevelWorking] Update';
    /**
     *
     */
    constructor(
      public payload: BcWorkImportanceLevels
    ) {}
  }

  export class GetImpLevelWorking {
    static readonly type = '[ImpLevelWorking] Get ImpLevelWorking';
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
