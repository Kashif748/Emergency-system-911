import { PageRequestModel } from '@core/models/page-request.model';
import { DEPENDENCIES_TYPES } from '@core/states/activity-analysis/dependencies/dependencies.state';
import { BcActivityDependencyExternal } from 'src/app/api/models/bc-activity-dependency-external';
import { BcActivityDependencyInternal } from 'src/app/api/models/bc-activity-dependency-internal';
import { BcActivityDependencyOrg } from 'src/app/api/models/bc-activity-dependency-org';

export namespace BrowseActivityDependenciesAction {
  export class LoadDependencyInternal {
    static readonly type =
      '[BrowseActivityDependenciesAction] Load Internal Dependencies ';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel }) {}
  }
  export class CreateInternal {
    static readonly type = '[BrowseActivityDependenciesAction] Create Internal';
    /**
     *
     */
    constructor(public payload: BcActivityDependencyInternal) {}
  }
  export class LoadDependencyExternal {
    static readonly type =
      '[BrowseActivityDependenciesAction] Load External Dependencies ';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel }) {}
  }
  export class CreateExternal {
    static readonly type = '[BrowseActivityDependenciesAction] Create External';
    /**
     *
     */
    constructor(public payload: BcActivityDependencyExternal) {}
  }
  export class LoadDependencyOrg {
    static readonly type =
      '[BrowseActivityDependenciesAction] Load Org Dependencies ';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel }) {}
  }
  export class CreateOrg {
    static readonly type = '[BrowseActivityDependenciesAction] Create Org ';
    /**
     *
     */
    constructor(public payload: BcActivityDependencyOrg) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseActivityDependenciesAction] Toggle Dialog';
    /**
     *
     */
    constructor(
      public payload: { id?: number; _dependType?: DEPENDENCIES_TYPES }
    ) {}
  }

  export class OpenView {
    static readonly type = '[BrowseActivityDependenciesAction] Open View';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }
}
