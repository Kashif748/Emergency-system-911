/* tslint:disable */
/* eslint-disable */
import { ApiErrorDailySummaryReportProjection } from './api-error-daily-summary-report-projection';
import { DailySummaryReportProjection } from './daily-summary-report-projection';
export interface RestApiResponseDailySummaryReportProjection {
  error?: ApiErrorDailySummaryReportProjection;
  result?: DailySummaryReportProjection;
  status?: boolean;
}

