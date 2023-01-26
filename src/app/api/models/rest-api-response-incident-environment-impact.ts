/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentEnvironmentImpact } from './api-error-incident-environment-impact';
import { IncidentEnvironmentImpact } from './incident-environment-impact';
export interface RestApiResponseIncidentEnvironmentImpact {
  error?: ApiErrorIncidentEnvironmentImpact;
  result?: IncidentEnvironmentImpact;
  status?: boolean;
}

