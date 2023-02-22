/* tslint:disable */
/* eslint-disable */
import { AdcdaAndUserRankProjection } from './adcda-and-user-rank-projection';
import { IdNameProjection } from './id-name-projection';
export interface AdcdaAvailabilityReportProjection {
  body?: string;
  createdBy?: AdcdaAndUserRankProjection;
  createdOn?: string;
  id?: number;
  isActive?: boolean;
  status?: IdNameProjection;
}

