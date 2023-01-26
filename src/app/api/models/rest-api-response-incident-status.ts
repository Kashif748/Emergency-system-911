/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentStatus } from './api-error-incident-status';
import { IncidentStatus } from './incident-status';
export interface RestApiResponseIncidentStatus {
  error?: ApiErrorIncidentStatus;
  result?: IncidentStatus;
  status?: boolean;
}

