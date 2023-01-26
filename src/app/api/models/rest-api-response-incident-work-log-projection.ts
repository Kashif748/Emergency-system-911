/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentWorkLogProjection } from './api-error-incident-work-log-projection';
import { IncidentWorkLogProjection } from './incident-work-log-projection';
export interface RestApiResponseIncidentWorkLogProjection {
  error?: ApiErrorIncidentWorkLogProjection;
  result?: IncidentWorkLogProjection;
  status?: boolean;
}

