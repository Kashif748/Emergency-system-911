/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentReportDetails } from './api-error-incident-report-details';
import { IncidentReportDetails } from './incident-report-details';
export interface RestApiResponseIncidentReportDetails {
  error?: ApiErrorIncidentReportDetails;
  result?: IncidentReportDetails;
  status?: boolean;
}

