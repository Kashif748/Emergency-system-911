/* tslint:disable */
/* eslint-disable */
import { ApiErrorLocalRisk } from './api-error-local-risk';
import { LocalRisk } from './local-risk';
export interface RestApiResponseLocalRisk {
  error?: ApiErrorLocalRisk;
  result?: LocalRisk;
  status?: boolean;
}

