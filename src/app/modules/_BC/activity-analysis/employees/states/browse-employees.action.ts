import { PageRequestModel } from '@core/models/page-request.model';
import { BcActivityEmployees } from 'src/app/api/models';

export namespace BrowseActivityEmployeesAction {
  export class LoadEmployees {
    static readonly type = '[BrowseActivityEmployeesAction] Load Employees ';

    /**
     *
     */
    constructor(
      public payload: {
        pageRequest?: PageRequestModel;
        cycleId: number;
        activityId: number;
      }
    ) {}
  }

  export class Create {
    static readonly type = '[BrowseActivityEmployeesAction] Create';
    /**
     *
     */
    constructor(
      public payload: BcActivityEmployees
    ) {}
  }
  export class Update {
    static readonly type = '[BrowseActivityEmployeesAction] Update';
    /**
     *
     */
    constructor(
      public payload:  BcActivityEmployees
    ) {}
  }

  export class GetEmployee {
    static readonly type = '[BrowseActivityEmployeesAction] Get Employee';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class ToggleDialog {
    static readonly type = '[BrowseActivityEmployeesAction] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { id?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseActivityEmployeesAction] Open View';
    /**
     *
     */
    constructor(public payload: { id: number }) {}
  }
  export class Delete {
    static readonly type = '[BrowseStaff] Delete Employee';
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
