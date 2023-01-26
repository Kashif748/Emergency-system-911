/* tslint:disable */
/* eslint-disable */
import { AdcdaAvailabilityReportProjection } from './adcda-availability-report-projection';
import { ApiErrorAdcdaAvailabilityReportProjection } from './api-error-adcda-availability-report-projection';
export interface RestApiResponseAdcdaAvailabilityReportProjection {
  error?: ApiErrorAdcdaAvailabilityReportProjection;
  result?: AdcdaAvailabilityReportProjection;
  status?: boolean;
}

