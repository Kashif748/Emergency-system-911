/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageCorrespondenceStatus } from './api-error-page-correspondence-status';
import { PageCorrespondenceStatus } from './page-correspondence-status';
export interface RestApiResponsePageCorrespondenceStatus {
  error?: ApiErrorPageCorrespondenceStatus;
  result?: PageCorrespondenceStatus;
  status?: boolean;
}

