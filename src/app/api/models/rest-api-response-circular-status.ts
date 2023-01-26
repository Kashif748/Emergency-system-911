/* tslint:disable */
/* eslint-disable */
import { ApiErrorCircularStatus } from './api-error-circular-status';
import { CircularStatus } from './circular-status';
export interface RestApiResponseCircularStatus {
  error?: ApiErrorCircularStatus;
  result?: CircularStatus;
  status?: boolean;
}

