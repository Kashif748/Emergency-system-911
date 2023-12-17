export namespace GisAction {
  // GIS MAP ACTIONS
  export class LoadLayers {
    static readonly type = '[GIS] Load Gis Layers Page';
    /**
     *
     */
    constructor(
      public payload: {
        page: number;
        size: number;
      }
    ) {}
  }

  export class GetContractor {
    static readonly type = '[GIS] Get Contractor By No';
    /**
     *
     */
    constructor(
      public payload: {
        contractorNO: string;
        mapGisLayer: string;
      }
    ) {}
  }
}
