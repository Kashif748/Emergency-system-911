/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentProjection } from './api-error-incident-projection';
import { IncidentProjection } from './incident-projection';
export interface RestApiResponseIncidentProjection {
  error?: ApiErrorIncidentProjection;
  result?: IncidentProjection;
  status?: boolean;
}

