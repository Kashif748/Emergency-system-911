/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentReason } from './api-error-incident-reason';
import { IncidentReason } from './incident-reason';
export interface RestApiResponseIncidentReason {
  error?: ApiErrorIncidentReason;
  result?: IncidentReason;
  status?: boolean;
}

