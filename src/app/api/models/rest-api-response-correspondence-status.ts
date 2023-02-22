/* tslint:disable */
/* eslint-disable */
import { ApiErrorCorrespondenceStatus } from './api-error-correspondence-status';
import { CorrespondenceStatus } from './correspondence-status';
export interface RestApiResponseCorrespondenceStatus {
  error?: ApiErrorCorrespondenceStatus;
  result?: CorrespondenceStatus;
  status?: boolean;
}

