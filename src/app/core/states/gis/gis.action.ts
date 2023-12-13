export namespace GisAction {
  // GIS MAP ACTIONS
  export class loadContractorsPage {
    static readonly type = '[GIS] Load Gis Contractors Page';
    /**
     *
     */
    constructor(
      public payload: {
        mapGisLayer: string;
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
