/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageKpi } from './api-error-page-kpi';
import { PageKpi } from './page-kpi';
export interface RestApiResponsePageKpi {
  error?: ApiErrorPageKpi;
  result?: PageKpi;
  status?: boolean;
}

