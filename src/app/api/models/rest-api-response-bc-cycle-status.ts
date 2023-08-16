/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcCycleStatus } from './api-error-bc-cycle-status';
import { BcCycleStatus } from './bc-cycle-status';
export interface RestApiResponseBcCycleStatus {
  error?: ApiErrorBcCycleStatus;
  result?: BcCycleStatus;
  status?: boolean;
}

