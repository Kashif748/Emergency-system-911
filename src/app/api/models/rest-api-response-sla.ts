/* tslint:disable */
/* eslint-disable */
import { ApiErrorSla } from './api-error-sla';
import { Sla } from './sla';
export interface RestApiResponseSla {
  error?: ApiErrorSla;
  result?: Sla;
  status?: boolean;
}

