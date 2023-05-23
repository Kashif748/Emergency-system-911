import { PageRequestModel } from '@core/models/page-request.model';
import {Bcrto} from "../../../../api/models/bcrto";
import {OrgStructureDetails} from "../../../../api/models/org-structure-details";
import {OrgStructure} from "../../../../api/models/org-structure";


export namespace BrowseOrgDetailAction {
  export class LoadOrgDetail {
    static readonly type = '[BrowseOrgDetail] Load OrgDetail';

    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {
    }
  }

  export class GetOrgDetail {
    static readonly type = '[BrowseOrgDetail] Get OrgDetail';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }

  export class UpdateOrgDetail {
    static readonly type = '[BrowseOrgDetail] Update OrgDetail';
    /**
     *
     */
    constructor(
      public payload: OrgStructure
    ) {}
  }
}
