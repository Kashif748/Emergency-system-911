/* tslint:disable */
/* eslint-disable */
import { ApiErrorListLocalRisk } from './api-error-list-local-risk';
import { LocalRisk } from './local-risk';
export interface RestApiResponseListLocalRisk {
  error?: ApiErrorListLocalRisk;
  result?: Array<LocalRisk>;
  status?: boolean;
}

