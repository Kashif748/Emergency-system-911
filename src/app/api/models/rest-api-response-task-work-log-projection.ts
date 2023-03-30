/* tslint:disable */
/* eslint-disable */
import { ApiErrorTaskWorkLogProjection } from './api-error-task-work-log-projection';
import { TaskWorkLogProjection } from './task-work-log-projection';
export interface RestApiResponseTaskWorkLogProjection {
  error?: ApiErrorTaskWorkLogProjection;
  result?: TaskWorkLogProjection;
  status?: boolean;
}

