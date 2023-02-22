/* tslint:disable */
/* eslint-disable */
import { ApiErrorListIncidentMainOrgStatistics } from './api-error-list-incident-main-org-statistics';
import { IncidentMainOrgStatistics } from './incident-main-org-statistics';
export interface RestApiResponseListIncidentMainOrgStatistics {
  error?: ApiErrorListIncidentMainOrgStatistics;
  result?: Array<IncidentMainOrgStatistics>;
  status?: boolean;
}

