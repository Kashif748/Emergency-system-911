/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcVersionsStatus } from './api-error-bc-versions-status';
import { BcVersionsStatus } from './bc-versions-status';
export interface RestApiResponseBcVersionsStatus {
  error?: ApiErrorBcVersionsStatus;
  result?: BcVersionsStatus;
  status?: boolean;
}

