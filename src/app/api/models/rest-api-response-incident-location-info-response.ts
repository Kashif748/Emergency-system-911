/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentLocationInfoResponse } from './api-error-incident-location-info-response';
import { IncidentLocationInfoResponse } from './incident-location-info-response';
export interface RestApiResponseIncidentLocationInfoResponse {
  error?: ApiErrorIncidentLocationInfoResponse;
  result?: IncidentLocationInfoResponse;
  status?: boolean;
}

