/* tslint:disable */
/* eslint-disable */
import { ApiErrorListKpi } from './api-error-list-kpi';
import { Kpi } from './kpi';
export interface RestApiResponseListKpi {
  error?: ApiErrorListKpi;
  result?: Array<Kpi>;
  status?: boolean;
}

