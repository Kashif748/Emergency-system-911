import { Situation } from 'src/app/api/models/situation';

export namespace SituationsAction {
  export class LoadPage {
    static readonly type = '[Situations] Load Page';
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

  export class GetSituation {
    static readonly type = '[Situations] Get Situation';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
  export class GetActiveSituation {
    static readonly type = '[Situations] Get Active Situation';
    /**
     *
     */
    constructor() {}
  }

  export class Create {
    static readonly type = '[Situations] Create';
    /**
     *
     */
    constructor(public payload: Situation) {}
  }

  export class Update {
    static readonly type = '[Situations] Update';
    /**
     *
     */
    constructor(public payload: Situation) {}
  }
  export class Delete {
    static readonly type = '[Situations] Delete Situation';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class GetStatistics {
    static readonly type = '[Situations] Get Statistics';
    /**
     *
     */
    constructor(
      public payload: {
        situationId: number;
      }
    ) {}
  }
  export class GetChartReport {
    static readonly type = '[Situations] Get Chart Report';
    /**
     *
     */
    constructor(
      public payload: {
        situationId: number;
      }
    ) {}
  }

  export class Export {
    static readonly type = '[Situations] Export';
    /**
     *
     */
    constructor(
      public payload: {
        type: 'PDF' | 'EXCEL';
        situationId: number;
      }
    ) {}
  }
}
