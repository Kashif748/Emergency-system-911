/* tslint:disable */
/* eslint-disable */
import { ApiErrorListIncidentHospitalProjection } from './api-error-list-incident-hospital-projection';
import { IncidentHospitalProjection } from './incident-hospital-projection';
export interface RestApiResponseListIncidentHospitalProjection {
  error?: ApiErrorListIncidentHospitalProjection;
  result?: Array<IncidentHospitalProjection>;
  status?: boolean;
}

