import { PageRequestModel } from '@core/models/page-request.model';

export namespace BrowseAnalysisSummaryAction {
  export class LoadAnalysisSummary {
    static readonly type =
      '[BrowseAnalysisSummaryAction] Load analysis summary';

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
    static readonly type = '[BrowseAnalysisSummaryAction] Change Columns';
    /**
     *
     */
    constructor(public payload: { columns: string[] }) {}
  }
  export class Export {
    static readonly type = '[BrowseAnalysisSummaryAction] Export';
    /**
     *
     */
    constructor(public payload: { type: 'PDF' | 'EXCEL' }) {}
  }
  export class UpdateFilter {
    static readonly type = '[BrowseAnalysisSummaryAction] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }
}
