/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentsDashboard } from './api-error-incidents-dashboard';
import { IncidentsDashboard } from './incidents-dashboard';
export interface RestApiResponseIncidentsDashboard {
  error?: ApiErrorIncidentsDashboard;
  result?: IncidentsDashboard;
  status?: boolean;
}

