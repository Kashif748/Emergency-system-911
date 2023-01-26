/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentGroup } from './api-error-incident-group';
import { IncidentGroup } from './incident-group';
export interface RestApiResponseIncidentGroup {
  error?: ApiErrorIncidentGroup;
  result?: IncidentGroup;
  status?: boolean;
}

