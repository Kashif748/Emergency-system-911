/* tslint:disable */
/* eslint-disable */
import { ApiErrorEmergencyLevel } from './api-error-emergency-level';
import { EmergencyLevel } from './emergency-level';
export interface RestApiResponseEmergencyLevel {
  error?: ApiErrorEmergencyLevel;
  result?: EmergencyLevel;
  status?: boolean;
}

