import {BcResources} from "../../../api/models/bc-resources";
import {BcResourcesChangeStatusDto} from "../../../api/models/bc-resources-change-status-dto";

export namespace ResourceAnalysisAction {
  export class LoadPage {
    static readonly type = '[ResourceAnalysisAction] Load Page';

    /**
     *
     */
    constructor(
      public payload: {
        cycleId?: number,
        orgHierarchyId?: number,
        statusId?: number
        filters?: { [key: string]: any };
        page: number;
        size: number;
        sort?: string[];
      }
    ) {}
  }
  export class Create {
    static readonly type = '[ResourceAnalysisAction] Create';
    /**
     *
     */
    constructor(public payload: BcResources) {}
  }

  export class Update {
    static readonly type = '[ResourceAnalysisAction] Update';
    /**
     *
     */
    constructor(public payload: BcResources) {}
  }

  export class GetResourceAnalysis {
    static readonly type = '[ResourceAnalysisAction] Get ResourceAnalysis';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }

  export class GetCycle {
    static readonly type = '[ResourceAnalysisAction] Get Resource Cycle';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
  export class ChangeStatus {
    static readonly type = '[ResourceAnalysisAction]  Change Resource Status';
    /**
     *
     */
    constructor(public payload: BcResourcesChangeStatusDto) {}
  }
}
