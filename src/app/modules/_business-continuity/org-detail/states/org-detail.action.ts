import { PageRequestModel } from '@core/models/page-request.model';
import {Bcrto} from "../../../../api/models/bcrto";


export namespace BrowseOrgDetailAction {
  export class LoadOrgDetail {
    static readonly type = '[BrowseOrgDetail] Load OrgDetail';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {
    }
  }

  export class CreateOrgDetail {
    static readonly type = '[BrowseOrgDetail] Create OrgDetail';
    /**
     *
     */
    constructor(
      public payload: Bcrto
    ) {}
  }

  export class UpdateOrgDetail {
    static readonly type = '[BrowseOrgDetail] Update OrgDetail';
    /**
     *
     */
    constructor(
      public payload: Bcrto
    ) {}
  }
}
