/* tslint:disable */
/* eslint-disable */
import { ApiErrorCircularMinimumProjection } from './api-error-circular-minimum-projection';
import { CircularMinimumProjection } from './circular-minimum-projection';
export interface RestApiResponseCircularMinimumProjection {
  error?: ApiErrorCircularMinimumProjection;
  result?: CircularMinimumProjection;
  status?: boolean;
}

