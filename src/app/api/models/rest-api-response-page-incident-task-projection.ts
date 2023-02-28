/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageIncidentTaskProjection } from './api-error-page-incident-task-projection';
import { PageIncidentTaskProjection } from './page-incident-task-projection';
export interface RestApiResponsePageIncidentTaskProjection {
  error?: ApiErrorPageIncidentTaskProjection;
  result?: PageIncidentTaskProjection;
  status?: boolean;
}

