import {PageRequestModel} from "@core/models/page-request.model";
import {BcResourcesRecords} from "../../../../../api/models/bc-resources-records";

export namespace BrowseRecordAction {
  export class LoadRecords {
    static readonly type = '[BrowseRecords] Load Records';

    /**
     *
     */
    constructor(public payload?: { pageRequest?: PageRequestModel , resourceId: number } ) {
    }
  }
  export class CreateRecord {
    static readonly type = '[BrowseRecords] Create Records';
    /**
     *
     */
    constructor(
      public payload: BcResourcesRecords
    ) {}
  }
  export class UpdateRecord {
    static readonly type = '[BrowseRecords] Update Records';
    /**
     *
     */
    constructor(
      public payload: BcResourcesRecords
    ) {}
  }
  export class ToggleDialog {
    static readonly type = '[BrowseRecord] Toggle Dialog';
    /**
     *
     */
    constructor(public payload: { recordId?: number }) {}
  }

  export class OpenView {
    static readonly type = '[BrowseRecord] Open View';
    /**
     *
     */
    constructor(public payload: { recordId: number }) {}
  }

  export class Delete {
    static readonly type = '[BrowseRecord] Delete Record';
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
