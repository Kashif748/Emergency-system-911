/* tslint:disable */
/* eslint-disable */
import { ApiErrorListKpiV2Response } from './api-error-list-kpi-v-2-response';
import { KpiV2Response } from './kpi-v-2-response';
export interface RestApiResponseListKpiV2Response {
  error?: ApiErrorListKpiV2Response;
  result?: Array<KpiV2Response>;
  status?: boolean;
}

