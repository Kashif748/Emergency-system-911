/* tslint:disable */
/* eslint-disable */
import { ApiErrorKpiV2Response } from './api-error-kpi-v-2-response';
import { KpiV2Response } from './kpi-v-2-response';
export interface RestApiResponseKpiV2Response {
  error?: ApiErrorKpiV2Response;
  result?: KpiV2Response;
  status?: boolean;
}

