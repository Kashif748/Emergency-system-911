import { BcActivityDependencyExternal } from 'src/app/api/models/bc-activity-dependency-external';
import { BcActivityDependencyInternal } from 'src/app/api/models/bc-activity-dependency-internal';
import { BcActivityDependencyOrg } from 'src/app/api/models/bc-activity-dependency-org';

export namespace ActivityDependenciesAction {
  export class LoadDependencyInternal {
    static readonly type = '[BcActivityDependencies] Load Internal Page';

    /**
     *
     */
    constructor(
      public payload: {
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
        cycleId: number;
        activityId: number;
      }
    ) {}
  }
  export class CreateInternal {
    static readonly type = '[BcActivityLocations] Create Internal';
    /**
     *
     */
    constructor(public payload: BcActivityDependencyInternal) {}
  }
  export class LoadDependencyOrg {
    static readonly type = '[BcActivityDependencies] Load Org Page';

    /**
     *
     */
    constructor(
      public payload: {
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
        cycleId: number;
        activityId: number;
      }
    ) {}
  }
  export class CreateOrg {
    static readonly type = '[BcActivityLocations] Create Org';
    /**
     *
     */
    constructor(public payload: BcActivityDependencyOrg) {}
  }
  export class LoadDependencyExternal {
    static readonly type = '[BcActivityDependencies] Load External Page';

    /**
     *
     */
    constructor(
      public payload: {
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
        cycleId: number;
        activityId: number;
      }
    ) {}
  }

  export class CreateExternal {
    static readonly type = '[BcActivityLocations] Create External';
    /**
     *
     */
    constructor(public payload: BcActivityDependencyExternal) {}
  }
}
