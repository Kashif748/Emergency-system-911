import { PageRequestModel } from '@core/models/page-request.model';
import { Incident } from 'src/app/api/models';

export namespace BrowseIncidentsAction {
  export class LoadPage {
    static readonly type = '[BrowseIncidents] Load Page';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }
}
