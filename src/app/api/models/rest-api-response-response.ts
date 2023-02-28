/* tslint:disable */
/* eslint-disable */
import { ApiErrorResponse } from './api-error-response';
import { Response } from './response';
export interface RestApiResponseResponse {
  error?: ApiErrorResponse;
  result?: Response;
  status?: boolean;
}

