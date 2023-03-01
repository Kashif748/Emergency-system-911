/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentLocationProjection } from './api-error-incident-location-projection';
import { IncidentLocationProjection } from './incident-location-projection';
export interface RestApiResponseIncidentLocationProjection {
  error?: ApiErrorIncidentLocationProjection;
  result?: IncidentLocationProjection;
  status?: boolean;
}

