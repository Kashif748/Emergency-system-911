/* tslint:disable */
/* eslint-disable */
import { AdcdaAvailabilityReport } from './adcda-availability-report';
import { ApiErrorAdcdaAvailabilityReport } from './api-error-adcda-availability-report';
export interface RestApiResponseAdcdaAvailabilityReport {
  error?: ApiErrorAdcdaAvailabilityReport;
  result?: AdcdaAvailabilityReport;
  status?: boolean;
}

