/* tslint:disable */
/* eslint-disable */
import { ApiErrorClosedIncidentResponse } from './api-error-closed-incident-response';
import { ClosedIncidentResponse } from './closed-incident-response';
export interface RestApiResponseClosedIncidentResponse {
  error?: ApiErrorClosedIncidentResponse;
  result?: ClosedIncidentResponse;
  status?: boolean;
}

