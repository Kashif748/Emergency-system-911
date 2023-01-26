/* tslint:disable */
/* eslint-disable */
import { ApiErrorPriorityProjection } from './api-error-priority-projection';
import { PriorityProjection } from './priority-projection';
export interface RestApiResponsePriorityProjection {
  error?: ApiErrorPriorityProjection;
  result?: PriorityProjection;
  status?: boolean;
}

