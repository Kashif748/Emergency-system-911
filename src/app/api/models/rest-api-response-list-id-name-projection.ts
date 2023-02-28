/* tslint:disable */
/* eslint-disable */
import { ApiErrorListIdNameProjection } from './api-error-list-id-name-projection';
import { IdNameProjection } from './id-name-projection';
export interface RestApiResponseListIdNameProjection {
  error?: ApiErrorListIdNameProjection;
  result?: Array<IdNameProjection>;
  status?: boolean;
}

