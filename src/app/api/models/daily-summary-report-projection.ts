/* tslint:disable */
/* eslint-disable */
import { DailySumRepCitySecurityProjection } from './daily-sum-rep-city-security-projection';
import { DailySumRepNewsProjection } from './daily-sum-rep-news-projection';
import { DailySumRepOptProjection } from './daily-sum-rep-opt-projection';
import { IdNameProjection } from './id-name-projection';
import { UserIdNameProjection } from './user-id-name-projection';
export interface DailySummaryReportProjection {
  createdBy?: UserIdNameProjection;
  createdOn?: string;
  dailySumariesReportCitySecurity?: Array<DailySumRepCitySecurityProjection>;
  dailySumariesReportOpt?: Array<DailySumRepOptProjection>;
  dailySummariesReportNews?: Array<DailySumRepNewsProjection>;
  id?: number;
  status?: IdNameProjection;
}

