/* tslint:disable */
/* eslint-disable */
import { ApiErrorListIncidentOrgProjection } from './api-error-list-incident-org-projection';
import { IncidentOrgProjection } from './incident-org-projection';
export interface RestApiResponseListIncidentOrgProjection {
  error?: ApiErrorListIncidentOrgProjection;
  result?: Array<IncidentOrgProjection>;
  status?: boolean;
}

