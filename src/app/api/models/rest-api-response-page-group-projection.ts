/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageGroupProjection } from './api-error-page-group-projection';
import { PageGroupProjection } from './page-group-projection';
export interface RestApiResponsePageGroupProjection {
  error?: ApiErrorPageGroupProjection;
  result?: PageGroupProjection;
  status?: boolean;
}

