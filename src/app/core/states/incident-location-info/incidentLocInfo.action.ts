import {ServiceCenterModel} from "@core/states/service-center-area/centers/center.state";
import {IncidentLocationInfo} from "../../../api/models";
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
}
