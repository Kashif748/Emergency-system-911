import {ServiceCenterModel} from "@core/states/service-center-area/centers/center.state";

export namespace CenterAction {
  export class LoadServiceCenter {
    static readonly type = '[Service] Load Service Center';
    /**
     *
     */
    constructor() {}
  }

  export class LoadServiceCenterList {
    static readonly type = '[Service] Load Service Center List';
    /**
     *
     */
    constructor() {}
  }

  export class LoadDistrictList {
    static readonly type = '[Service] Load District List';
    /**
     *
     */
    constructor(
      public payload: {
        centerId?: number;
      }
    ) {}
  }
}
