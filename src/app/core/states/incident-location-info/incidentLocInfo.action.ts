import {CenterRequest} from "../../../api/models/center-request";

export namespace IncicentLocationInfoAction {
  export class IncidentLocationInfo {
    static readonly type = '[Location] Load incident Location';
    /**
     *
     */
    constructor(
      public payload: {
      centers: Array<CenterRequest>;
      groupId: number;
    }
    ) {}
  }

  export class UpdateIncidentLocationInfo {
    static readonly type = '[Location] Update incident Location';
    /**
     *
     */
    constructor(
      public payload: {
        centers: Array<CenterRequest>;
        groupId: number;
      }
    ) {}
  }

  export class GetIncidentLocationInfo {
    static readonly type = '[Location] Get incident Location';
    /**
     *
     */
    constructor(
      public payload: {
        id: number;
      }
    ) {}
  }
}
