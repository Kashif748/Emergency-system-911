/* tslint:disable */
/* eslint-disable */
import { AdcdaAvailabilityReportDetails } from './adcda-availability-report-details';
export interface AdcdaAvailabilityReportResponse {
  area?: string;
  sectors?: { [key: string]: Array<AdcdaAvailabilityReportDetails> };
}

