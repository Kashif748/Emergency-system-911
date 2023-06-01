import { PageRequestModel } from '@core/models/page-request.model';


export namespace BrowseImpactLevelAction {
  export class LoadImpactLevel {
    static readonly type = '[BrowseImpactLevel] Load ImpactLevel';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {
    }
  }
}
