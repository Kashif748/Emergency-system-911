import { PageRequestModel } from '@core/models/page-request.model';
export namespace NewsBarAction {
  export class LoadNews {
    static readonly type = '[NewsBar] Load News';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }

  export class SortNews {
    static readonly type = '[NewsBar] Sort News';
    /**
     *
     */
    constructor(public payload: { field?: string; order?: 'asc' | 'desc' }) {}
  }

  export class UpdateFilter {
    static readonly type = '[NewsBar] Update Filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }
}
