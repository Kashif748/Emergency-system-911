/* tslint:disable */
/* eslint-disable */
import { IdNameResponse } from './id-name-response';
import { NameResponse } from './name-response';
export interface BcAnalysisByOrgHierarchyResponse {
  cycle?: IdNameResponse;
  orgHierarchy?: IdNameResponse;
  percentage?: string;
  rowNumber?: number;
  status?: NameResponse;
}

