/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageIncidentStatus } from './api-error-page-incident-status';
import { PageIncidentStatus } from './page-incident-status';
export interface RestApiResponsePageIncidentStatus {
  error?: ApiErrorPageIncidentStatus;
  result?: PageIncidentStatus;
  status?: boolean;
}

