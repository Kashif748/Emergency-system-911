export namespace SystemsReportAction {
  export class LoadPage {
    static readonly type = '[SystemsReportAction] Load Page';

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
    static readonly type = '[SystemsReportAction] Export';
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
