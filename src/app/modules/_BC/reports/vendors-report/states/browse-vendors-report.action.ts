import { PageRequestModel } from '@core/models/page-request.model';

export namespace BrowseVendorsReportAction {
  export class LoadVendorsReport {
    static readonly type = '[BrowseVendorsReportAction] Load vendors report';

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
    static readonly type = '[BrowseVendorsReportAction] Change Columns';
    /**
     *
     */
    constructor(public payload: { columns: string[] }) {}
  }
  export class Export {
    static readonly type = '[BrowseVendorsReportAction] Export';
    /**
     *
     */
    constructor(public payload: { type: 'PDF' | 'EXCEL' }) {}
  }
  export class UpdateFilter {
    static readonly type = '[BrowseVendorsReportAction] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }
  export class Sort {
    static readonly type = '[BrowseVendorsReportAction] Sort ';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }
}
