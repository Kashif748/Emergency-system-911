import { PageRequestModel } from '@core/models/page-request.model';

export namespace BrowseSystemsReportAction {
  export class LoadSystemsReport {
    static readonly type = '[BrowseSystemsReportAction] Load systems report';

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
    static readonly type = '[BrowseSystemsReportAction] Change Columns';
    /**
     *
     */
    constructor(public payload: { columns: string[] }) {}
  }
  export class Export {
    static readonly type = '[BrowseSystemsReportAction] Export';
    /**
     *
     */
    constructor(public payload: { type: 'PDF' | 'EXCEL' }) {}
  }
  export class UpdateFilter {
    static readonly type = '[BrowseSystemsReportAction] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }
  export class Sort {
    static readonly type = '[BrowseAnalysisSummaryAction] Sort ';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }
}
