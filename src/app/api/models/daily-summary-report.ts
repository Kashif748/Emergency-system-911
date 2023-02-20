/* tslint:disable */
/* eslint-disable */
import { DailySumaryReportNews } from './daily-sumary-report-news';
import { DailySummaryReportCitySecurity } from './daily-summary-report-city-security';
import { DailySummaryReportOpt } from './daily-summary-report-opt';
import { DailySummaryReportStatus } from './daily-summary-report-status';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface DailySummaryReport {
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdOn?: string;
  dailySumariesReportCitySecurity?: Array<DailySummaryReportCitySecurity>;
  dailySumariesReportOpt?: Array<DailySummaryReportOpt>;
  dailySummariesReportNews?: Array<DailySumaryReportNews>;
  id?: number;
  status?: DailySummaryReportStatus;
}

