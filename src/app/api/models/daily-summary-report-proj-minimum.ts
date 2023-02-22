/* tslint:disable */
/* eslint-disable */
import { IdNameProjection } from './id-name-projection';
import { UserIdNameProjection } from './user-id-name-projection';
export interface DailySummaryReportProjMinimum {
  createdBy?: UserIdNameProjection;
  createdOn?: string;
  id?: number;
  status?: IdNameProjection;
}

