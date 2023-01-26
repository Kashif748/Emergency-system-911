export interface AddressSearchResultModel {
  Address?: string;
  Lat?: number;
  Lng?: number;
  type?: string;
  polygonRings?: number[][];
  polylinePaths?: number[][];
  AddType?: 'POI';
  QR_Code?: string;
  Flag?: number;
  PlotAddress?: string;
  Guid?: string;
  PostalCode?: string;
  GISID?: string;
  zoom?: number;
}

export interface LocationInfoModel {
  MUNICIPALITY: string;
  MUNICIPALITYARA: string;
  COMMUNITYID: string;
  COMMUNITYNAMEARA: string;
  COMMUNITYNAMEENG: string;
  DISTRICTID: string;
  DISTRICTARA: string;
  DISTRICTNAMEENG: string;
}

// MY LAND
// export const DZSP_ID_PLOT = 0;
// export const DZSP_ID_DISTRICT = 1;
// export const DZSP_ID_COMMUNITY = 2;
// export const DZSP_ID_MUNICIPALITY = 3;

// ONWANI
export const DZSP_ID_PLOT = 5;
export const DZSP_ID_DISTRICT = 2;
export const DZSP_ID_COMMUNITY = 1;
export const DZSP_ID_MUNICIPALITY = 3;

export const DZSP_SEARCH_URL = '/gateway/OnwaniMapServices/1.0/';
