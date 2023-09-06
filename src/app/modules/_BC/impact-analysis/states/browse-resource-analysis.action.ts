import {PageRequestModel} from '@core/models/page-request.model';
import {BcResources} from "../../../../api/models/bc-resources";

export namespace BrowseResourceAnalysisAction {
  export class LoadPage {
    static readonly type =
      '[BrowseResourceAnalysisAction] Load ResourceAnalysis';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }

  export class UpdateResourceAnalysis {
    static readonly type = '[BrowseResourceAnalysisAction] Update ResourceAnalysis';
    /**
     *
     */
    constructor(
      public payload: BcResources
    ) {}
  }

  export class CreateResourceAnalysis {
    static readonly type = '[BrowseResourceAnalysisAction] Create ResourceAnalysis';
    /**
     *
     */
    constructor(public payload: BcResources) {}
  }

  export class Sort {
    static readonly type =
      '[BrowseResourceAnalysisAction] Sort ResourceAnalysis';

    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }

  export class ChangeColumns {
    static readonly type = '[BrowseResourceAnalysisAction] Change Columns';

    /**
     *
     */
    constructor(public payload: { columns: string[] }) {}
  }

  export class UpdateFilter {
    static readonly type = '[BrowseResourceAnalysisAction] Update Filter';

    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }

  export class ChangeView {
    static readonly type = '[BrowseResourceAnalysisAction] Change View';

    constructor(public payload: { view: 'TABLE' | 'CARDS' }) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseResourceAnalysisAction] Toggle Dialog';

    /**
     *
     */
    constructor(public payload: { resourceId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseResourceAnalysisAction] Open View';

    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }
}
