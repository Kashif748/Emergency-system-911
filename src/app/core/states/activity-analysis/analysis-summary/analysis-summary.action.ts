export namespace ActivitySummaryAction {
  export class LoadPage {
    static readonly type = '[ActivitySummaryAction] Load Page';

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

  export class Export {
    static readonly type = '[ActivitySummaryAction] Export';
    /**
     *
     */
    constructor(
      public payload: {
        type: 'PDF' | 'EXCEL';
        filters?: { [key: string]: any };
      }
    ) {}
  }
}
