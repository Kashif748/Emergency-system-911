/* tslint:disable */
/* eslint-disable */
import { ApiErrorListIncidentStatistics } from './api-error-list-incident-statistics';
import { IncidentStatistics } from './incident-statistics';
export interface RestApiResponseListIncidentStatistics {
  error?: ApiErrorListIncidentStatistics;
  result?: Array<IncidentStatistics>;
  status?: boolean;
}

