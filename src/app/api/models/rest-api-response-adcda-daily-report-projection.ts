/* tslint:disable */
/* eslint-disable */
import { AdcdaDailyReportProjection } from './adcda-daily-report-projection';
import { ApiErrorAdcdaDailyReportProjection } from './api-error-adcda-daily-report-projection';
export interface RestApiResponseAdcdaDailyReportProjection {
  error?: ApiErrorAdcdaDailyReportProjection;
  result?: AdcdaDailyReportProjection;
  status?: boolean;
}

