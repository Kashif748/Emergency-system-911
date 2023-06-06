import { PageRequestModel } from '@core/models/page-request.model';


export namespace BrowseImpactLevelMatrixAction {
  export class LoadImpactLevel {
    static readonly type = '[BrowseImpactLevel] Load ImpactLevel Matrix';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {
    }
  }
}
