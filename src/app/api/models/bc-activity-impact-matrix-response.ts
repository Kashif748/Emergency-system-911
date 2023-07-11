/* tslint:disable */
/* eslint-disable */
import { BcImpactTypesResponse } from './bc-impact-types-response';
import { IdNameResponse } from './id-name-response';
export interface BcActivityImpactMatrixResponse {
  activity?: IdNameResponse;
  bcImpactTypes?: Array<BcImpactTypesResponse>;
  cycle?: IdNameResponse;
}

