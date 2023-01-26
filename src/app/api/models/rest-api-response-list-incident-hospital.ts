/* tslint:disable */
/* eslint-disable */
import { ApiErrorListIncidentHospital } from './api-error-list-incident-hospital';
import { IncidentHospital } from './incident-hospital';
export interface RestApiResponseListIncidentHospital {
  error?: ApiErrorListIncidentHospital;
  result?: Array<IncidentHospital>;
  status?: boolean;
}

