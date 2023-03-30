/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageTaskWorkLogProjection } from './api-error-page-task-work-log-projection';
import { PageTaskWorkLogProjection } from './page-task-work-log-projection';
export interface RestApiResponsePageTaskWorkLogProjection {
  error?: ApiErrorPageTaskWorkLogProjection;
  result?: PageTaskWorkLogProjection;
  status?: boolean;
}

