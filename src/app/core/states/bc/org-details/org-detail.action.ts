import { BcOrganizationDetails, BcOrgHierarchy } from 'src/app/api/models';

export namespace OrgDetailAction {
  export class CreateOrgHierarchy {
    static readonly type = '[OrgDetail] Create Org Hierarchy';
    /**
     *
     */
    constructor(public payload: BcOrgHierarchy) {}
  }
  export class UpdateOrgHierarchy {
    static readonly type = '[OrgDetail] Update Org Hierarchy';
    /**
     *
     */
    constructor(public payload: BcOrgHierarchy) {}
  }
  export class DeleteOrgHierarchy {
    static readonly type = '[OrgDetail] Delete Org Hierarchy';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }
  export class GetOrgHierarchy {
    static readonly type = '[OrgDetail] Get Org Hierarchy';
    /**
     *
     */
    constructor(
      public payload: {
        sort?: string[];
        page: number;
        size: number;
        name?: string;
        parentId?: number;
      }
    ) {}
  }

  export class GetOrgHierarchySearch {
    static readonly type = '[OrgDetail] Get Org Hierarchy Search';
    /**
     *
     */
    constructor(
      public payload: {
        sort?: string[];
        page: number;
        size: number;
        name?: string;
        parentId?: number;
      }
    ) {}
  }

  export class GetOrgHierarchyParent {
    static readonly type = '[OrgDetail] Get Org Hierarchy Parent';
    /**
     *
     */
    constructor(
      public payload: {
        sort?: string[];
        page: number;
        size: number;
        name?: string;
        id: number;
      }
    ) {}
  }

  export class GetOrgHierarchyNode {
    static readonly type = '[OrgDetail] Get Org Hierarchy Node';
    /**
     *
     */
    constructor(
      public payload: {
        id: number;
      }
    ) {}
  }
  export class GetOrgHierarchyTypes {
    static readonly type = '[OrgDetail] Get Org Hierarchy Types';
    /**
     *
     */
    constructor(
      public payload: {
        sort?: string[];
        page: number;
        size: number;
      }
    ) {}
  }
  export class Update {
    static readonly type = '[OrgDetail] Update';
    /**
     *
     */
    constructor(public payload: BcOrganizationDetails) {}
  }

  export class GetOrgDetail {
    static readonly type = '[OrgDetail] Get OrgDetail';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
}
