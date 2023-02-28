/* tslint:disable */
/* eslint-disable */
import { ApiErrorVersion } from './api-error-version';
import { Version } from './version';
export interface RestApiResponseVersion {
  error?: ApiErrorVersion;
  result?: Version;
  status?: boolean;
}

