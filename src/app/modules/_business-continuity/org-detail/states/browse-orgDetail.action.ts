import { PageRequestModel } from '@core/models/page-request.model';
import { TreeNode } from 'primeng/api';
import { BcOrganizationDetails, BcOrgHir } from 'src/app/api/models';

export namespace BrowseOrgDetailAction {
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
    constructor(public payload: BcOrganizationDetails) {}
  }
  export class GetOrgHierarchy {
    static readonly type = '[BrowseOrgDetail] Get Org Hierarchy';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }
  export class CreateOrgHierarchy {
    static readonly type = '[BrowseOrgDetail] Create Org Hierarchy';
    /**
     *
     */
    constructor(public payload: BcOrgHir) {}
  }
  export class UpdateOrgHierarchy {
    static readonly type = '[BrowseOrgDetail] Update Org Hierarchy';
    /**
     *
     */
    constructor(public payload: BcOrgHir) {}
  }
  export class DeleteOrgHierarchy {
    static readonly type = '[BrowseOrgDetail] Delete Org Hierarchy';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }
  export class GetOrgHierarchyTypes {
    static readonly type = '[BrowseOrgDetail] Get Org Hierarchy Types';
    /**
     *
     */
    constructor(public payload?: { page: number; size: number }) {}
  }
  export class SelectNode {
    static readonly type = '[BrowseOrgDetail] Select Node';
    /**
     *
     */
    constructor(public payload: TreeNode) {}
  }
}
