/* tslint:disable */
/* eslint-disable */
import { AdcmcDailyReport } from './adcmc-daily-report';
import { ApiErrorListAdcmcDailyReport } from './api-error-list-adcmc-daily-report';
export interface RestApiResponseListAdcmcDailyReport {
  error?: ApiErrorListAdcmcDailyReport;
  result?: Array<AdcmcDailyReport>;
  status?: boolean;
}

