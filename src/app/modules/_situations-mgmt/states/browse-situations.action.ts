import { PageRequestModel } from '@core/models/page-request.model';
import {Situation} from "../../../api/models";
export namespace BrowseSituationsAction {
  export class LoadSituations {
    static readonly type = '[BrowseSituations] Load Situations';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }
  export class LoadAttachmentSituations {
    static readonly type = '[BrowseSituations] Load Attachment Situations';
    /**
     *
     */
    constructor(
      public payload?: {
        situationId: number;
        orgId: number;
        withSub: boolean;
      }
    ) {}
  }

  export class SortSituations {
    static readonly type = '[BrowseSituations] Sort Situations';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }

  export class UpdateFilter {
    static readonly type = '[BrowseSituations] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }

  export class ChangeView {
    static readonly type = '[BrowseSituations] Change View';
    constructor(public payload: { view: 'TABLE' | 'CARDS' }) {}
  }

  export class Export {
    static readonly type = '[BrowseSituations] Export';
    /**
     *
     */
    constructor(
      public payload: { type: 'PDF' | 'EXCEL'; situationId: number; poi: string}
    ) {}
  }

  export class GetActiveSituation {
    static readonly type = '[BrowseSituations] Get Active Situations';
    /**
     *
     */
    constructor() {}
  }

  export class CreateSituations {
    static readonly type = '[BrowseSituations] Create Situations';
    /**
     *
     */
    constructor(public payload: Situation) {}
  }

  export class UpdateSituations {
    static readonly type = '[BrowseSituations] Update Situations';
    /**
     *
     */
    constructor(public payload: Situation) {}
  }

  export class DeleteSituations {
    static readonly type = '[Situations] Delete';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
  export class ToggleDialog {
    static readonly type = '[BrowseSituations] Toggle Dialog';
    /**
     *
     */
    constructor(
      public payload: {
        dialogName?: string;
        situationId?: number;
        type?: string;
      }
    ) {}
  }

  export class OpenView {
    static readonly type = '[BrowseSituations] Open View';
    /**
     *
     */
    constructor(public payload: { dialogName: string; situationId: number }) {}
  }

  export class GetStatistics {
    static readonly type = '[BrowseSituations] Get Statistics';
    /**
     *
     */
    constructor(
      public payload: {
        situationId: number;
        poi: string
      }
    ) {}
  }

  export class GetChartReport {
    static readonly type = '[BrowseSituations]  Get Chart Report';
    /**
     *
     */
    constructor(
      public payload: {
        situationId: number;
      }
    ) {}
  }
}
