/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageSla } from './api-error-page-sla';
import { PageSla } from './page-sla';
export interface RestApiResponsePageSla {
  error?: ApiErrorPageSla;
  result?: PageSla;
  status?: boolean;
}

