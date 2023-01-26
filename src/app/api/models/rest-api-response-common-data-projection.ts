/* tslint:disable */
/* eslint-disable */
import { ApiErrorCommonDataProjection } from './api-error-common-data-projection';
import { CommonDataProjection } from './common-data-projection';
export interface RestApiResponseCommonDataProjection {
  error?: ApiErrorCommonDataProjection;
  result?: CommonDataProjection;
  status?: boolean;
}

