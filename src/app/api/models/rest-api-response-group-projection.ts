/* tslint:disable */
/* eslint-disable */
import { ApiErrorGroupProjection } from './api-error-group-projection';
import { GroupProjection } from './group-projection';
export interface RestApiResponseGroupProjection {
  error?: ApiErrorGroupProjection;
  result?: GroupProjection;
  status?: boolean;
}

