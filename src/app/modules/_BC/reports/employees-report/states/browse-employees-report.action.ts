import { PageRequestModel } from '@core/models/page-request.model';

export namespace BrowseEmployeesReportAction {
  export class LoadEmployeesReport {
    static readonly type = '[BrowseEmployeesReportAction] Load employees report';

    /**
     *
     */
    constructor(
      public payload?: {
        pageRequest?: PageRequestModel;
      }
    ) {}
  }

  export class ChangeColumns {
    static readonly type = '[BrowseEmployeesReportAction] Change Columns';
    /**
     *
     */
    constructor(public payload: { columns: string[] }) {}
  }
  export class Export {
    static readonly type = '[BrowseEmployeesReportAction] Export';
    /**
     *
     */
    constructor(public payload: { type: 'PDF' | 'EXCEL' }) {}
  }
  export class UpdateFilter {
    static readonly type = '[BrowseEmployeesReportAction] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }
  export class Sort {
    static readonly type = '[BrowseEmployeesReportAction] Sort ';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }
}
