import {BcActivities} from "../../../api/models/bc-activities";

export namespace OrgActivityAction {
  export class LoadPage {
    static readonly type = '[OrganizationActivity] Load Page';
    /**
     *
     */
    constructor(
      public payload: {
        filters?: {
          orgHierarchyId?: number;
          name?: string;
          activityFrequencyId?: number;
          activityArea?: string;
          refrenceNumber?: string;
        };
        sort?: string[];
        page: number;
        size: number;
      }
    ) {}
  }

  export class GetOrgActivities {
    static readonly type = '[OrganizationActivity] Get OrganizationActivity';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class Create {
    static readonly type = '[OrganizationActivity] Create';
    /**
     *
     */
    constructor(public payload: BcActivities) {}
  }

  export class Update {
    static readonly type = '[OrganizationActivity] Update';
    /**
     *
     */
    constructor(public payload: BcActivities) {}
  }
}
