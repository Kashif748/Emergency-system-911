/* tslint:disable */
/* eslint-disable */
import { AdcdaDailyReport } from './adcda-daily-report';
import { ApiErrorAdcdaDailyReport } from './api-error-adcda-daily-report';
export interface RestApiResponseAdcdaDailyReport {
  error?: ApiErrorAdcdaDailyReport;
  result?: AdcdaDailyReport;
  status?: boolean;
}

