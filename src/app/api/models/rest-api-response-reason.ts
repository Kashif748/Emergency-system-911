/* tslint:disable */
/* eslint-disable */
import { ApiErrorReason } from './api-error-reason';
import { Reason } from './reason';
export interface RestApiResponseReason {
  error?: ApiErrorReason;
  result?: Reason;
  status?: boolean;
}

