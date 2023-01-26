/* tslint:disable */
/* eslint-disable */
import { ApiErrorListSla } from './api-error-list-sla';
import { Sla } from './sla';
export interface RestApiResponseListSla {
  error?: ApiErrorListSla;
  result?: Array<Sla>;
  status?: boolean;
}

