/* tslint:disable */
/* eslint-disable */
import { ApiErrorListIncidentsDataResponse } from './api-error-list-incidents-data-response';
import { IncidentsDataResponse } from './incidents-data-response';
export interface RestApiResponseListIncidentsDataResponse {
  error?: ApiErrorListIncidentsDataResponse;
  result?: Array<IncidentsDataResponse>;
  status?: boolean;
}

