/* tslint:disable */
/* eslint-disable */
import { AlertnessLevel } from './alertness-level';
import { ApiErrorAlertnessLevel } from './api-error-alertness-level';
export interface RestApiResponseAlertnessLevel {
  error?: ApiErrorAlertnessLevel;
  result?: AlertnessLevel;
  status?: boolean;
}

