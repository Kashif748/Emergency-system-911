/* tslint:disable */
/* eslint-disable */
import { AdcdaAvailabilityReportResponse } from './adcda-availability-report-response';
import { ApiErrorListAdcdaAvailabilityReportResponse } from './api-error-list-adcda-availability-report-response';
export interface RestApiResponseListAdcdaAvailabilityReportResponse {
  error?: ApiErrorListAdcdaAvailabilityReportResponse;
  result?: Array<AdcdaAvailabilityReportResponse>;
  status?: boolean;
}

