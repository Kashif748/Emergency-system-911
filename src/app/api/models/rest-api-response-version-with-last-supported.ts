/* tslint:disable */
/* eslint-disable */
import { ApiErrorVersionWithLastSupported } from './api-error-version-with-last-supported';
import { VersionWithLastSupported } from './version-with-last-supported';
export interface RestApiResponseVersionWithLastSupported {
  error?: ApiErrorVersionWithLastSupported;
  result?: VersionWithLastSupported;
  status?: boolean;
}

