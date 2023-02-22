/* tslint:disable */
/* eslint-disable */
import { AdcdaAndUserRankProjection } from './adcda-and-user-rank-projection';
import { IdNameProjection } from './id-name-projection';
export interface AdcdaDailyReportProjection {
  approvedBy?: AdcdaAndUserRankProjection;
  approvedOn?: string;
  createdBy?: AdcdaAndUserRankProjection;
  createdOn?: string;
  id?: number;
  isActive?: boolean;
  status?: IdNameProjection;
}

