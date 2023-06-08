import {PageRequestModel} from "@core/models/page-request.model";
import {User, UserInappAuthentication, UserMiddlewareAuth} from "../../../api/models";


export namespace BrowseBusinessImpactAnalysisAction {
  export class LoadBusinessImpactAnalysis {
    static readonly type = '[BrowseBusinessImpactAnalysis] Load BusinessImpactAnalysis';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {
    }
  }

  export class SortUsers {
    static readonly type = '[BrowseBusinessImpactAnalysis] Sort BusinessImpactAnalysis';

    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {
    }
  }

  export class ChangeColumns {
    static readonly type = '[BrowseBusinessImpactAnalysis] Change Columns';

    /**
     *
     */
    constructor(public payload: { columns: string[] }) {
    }
  }

  export class UpdateFilter {
    static readonly type = '[BrowseBusinessImpactAnalysis] Update Filter';

    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {
    }
  }

  export class Export {
    static readonly type = '[BrowseBusinessImpactAnalysis] Export';

    /**
     *
     */
    constructor(public payload: { type: 'PDF' | 'EXCEL' }) {
    }
  }

  export class ChangeView {
    static readonly type = '[BrowseBusinessImpactAnalysis] Change View';

    constructor(public payload: { view: 'TABLE' | 'CARDS' }) {
    }
  }

  export class CreateBusinessImpactAnalysis {
    static readonly type = '[BrowseBusinessImpactAnalysis] Create BusinessImpactAnalysis';

    /**
     *
     */
    constructor(
      public payload: User & UserInappAuthentication & UserMiddlewareAuth
    ) {
    }
  }

  export class UpdateBusinessImpactAnalysis {
    static readonly type = '[BrowseBusinessImpactAnalysis] Update BusinessImpactAnalysis';

    /**
     *
     */
    constructor(
      public payload: User & UserInappAuthentication & UserMiddlewareAuth
    ) {
    }
  }

  export class ToggleDialog {
    static readonly type = '[BrowseBusinessImpactAnalysis] Toggle Dialog';

    /**
     *
     */
    constructor(public payload: { userId?: number }) {
    }
  }

  export class OpenView {
    static readonly type = '[BrowseBusinessImpactAnalysis] Open View';

    /**
     *
     */
    constructor(public payload: { userId: number }) {
    }
  }
}
