import { PageRequestModel } from '@core/models/page-request.model';
import { BcSystems } from 'src/app/api/models';

export namespace BrowseSystemsAction {
  export class LoadSystems {
    static readonly type = '[BrowseSystems] Load Systems';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel }) {}
  }

  export class GetSystem {
    static readonly type = '[BrowseSystems] Get System';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
  export class CreateSystem {
    static readonly type = '[BrowseSystems] Create System';
    /**
     *
     */
    constructor(public payload: BcSystems) {}
  }

  export class DeleteSystem {
    static readonly type = '[BrowseSystems] Delete System';
    /**
     *
     */
    constructor(public payload: { id?: number }) {}
  }

  export class UpdateSystem {
    static readonly type = '[BrowseSystems] Update System';
    /**
     *
     */
    constructor(public payload: BcSystems) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseSystems] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { systemId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseSystems] Open View';
    /**
     *
     */
    constructor(public payload: { systemId: number }) {}
  }

  export class ChangeColumns {
    static readonly type = '[BrowseSystems] Change Columns';
    /**
     *
     */
    constructor(public payload: { columns: string[] }) {}
  }
  export class ChangeView {
    static readonly type = '[BrowseSystems] Change View';
    constructor(public payload: { view: 'TABLE' | 'CARDS' }) {}
  }
  export class UpdateFilter {
    static readonly type = '[BrowseSystems] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }

  export class SortSystems {
    static readonly type = '[BrowseSystems] Sort Systems';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }

}
