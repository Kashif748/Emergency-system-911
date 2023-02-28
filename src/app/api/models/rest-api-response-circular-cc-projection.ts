/* tslint:disable */
/* eslint-disable */
import { ApiErrorCircularCcProjection } from './api-error-circular-cc-projection';
import { CircularCcProjection } from './circular-cc-projection';
export interface RestApiResponseCircularCcProjection {
  error?: ApiErrorCircularCcProjection;
  result?: CircularCcProjection;
  status?: boolean;
}

