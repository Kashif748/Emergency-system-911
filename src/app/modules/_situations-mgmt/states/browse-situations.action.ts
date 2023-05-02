import { PageRequestModel } from '@core/models/page-request.model';
import { Situation } from 'src/app/api/models/situation';
export namespace BrowseSituationsAction {
  export class LoadSituations {
    static readonly type = '[BrowseSituations] Load Situations';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
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

  export class ToggleDialog {
    static readonly type = '[BrowseSituations] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { situationId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseSituations] Open View';
    /**
     *
     */
    constructor(public payload: { situationId: number }) {}
  }

  export class GetStatistics {
    static readonly type = '[BrowseSituations] Get Statistics';
    /**
     *
     */
    constructor(
      public payload: {
        situationId :number;
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
        situationId :number;
      }
    ) {}
  }
}
