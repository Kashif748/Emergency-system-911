export namespace EmployeesReportAction {
  export class LoadPage {
    static readonly type = '[EmployeesReportAction] Load Page';

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
    static readonly type = '[EmployeesReportAction] Export';
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
