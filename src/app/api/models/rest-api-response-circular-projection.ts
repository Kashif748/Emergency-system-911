/* tslint:disable */
/* eslint-disable */
import { ApiErrorCircularProjection } from './api-error-circular-projection';
import { CircularProjection } from './circular-projection';
export interface RestApiResponseCircularProjection {
  error?: ApiErrorCircularProjection;
  result?: CircularProjection;
  status?: boolean;
}

