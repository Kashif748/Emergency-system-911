import {BcImpactLevel} from "../../../../api/models/bc-impact-level";

export namespace ImpactLevelAction {
  export class LoadPage {
    static readonly type = '[ImpactLevel] Load Page';

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
    static readonly type = '[ImpactLevel] Create';
    /**
     *
     */
    constructor(
      public payload: BcImpactLevel
    ) {}
  }

  export class GetImpactLevel {
    static readonly type = '[ImpactLevel] Get Impact Level';
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
