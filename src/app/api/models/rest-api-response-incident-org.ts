/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentOrg } from './api-error-incident-org';
import { IncidentOrg } from './incident-org';
export interface RestApiResponseIncidentOrg {
  error?: ApiErrorIncidentOrg;
  result?: IncidentOrg;
  status?: boolean;
}

