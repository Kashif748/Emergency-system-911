/* tslint:disable */
/* eslint-disable */
import { ApiErrorKpi } from './api-error-kpi';
import { Kpi } from './kpi';
export interface RestApiResponseKpi {
  error?: ApiErrorKpi;
  result?: Kpi;
  status?: boolean;
}

