/* tslint:disable */
/* eslint-disable */
import { ApiErrorSituationStatisticsResponse } from './api-error-situation-statistics-response';
import { SituationStatisticsResponse } from './situation-statistics-response';
export interface RestApiResponseSituationStatisticsResponse {
  error?: ApiErrorSituationStatisticsResponse;
  result?: SituationStatisticsResponse;
  status?: boolean;
}

