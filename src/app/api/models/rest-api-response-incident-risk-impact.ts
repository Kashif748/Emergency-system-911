/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentRiskImpact } from './api-error-incident-risk-impact';
import { IncidentRiskImpact } from './incident-risk-impact';
export interface RestApiResponseIncidentRiskImpact {
  error?: ApiErrorIncidentRiskImpact;
  result?: IncidentRiskImpact;
  status?: boolean;
}

