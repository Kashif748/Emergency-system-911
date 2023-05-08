/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcVersions } from './api-error-bc-versions';
import { BcVersions } from './bc-versions';
export interface RestApiResponseBcVersions {
  error?: ApiErrorBcVersions;
  result?: BcVersions;
  status?: boolean;
}

