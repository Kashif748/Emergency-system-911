/* tslint:disable */
/* eslint-disable */
import { ApiErrorCircularOrg } from './api-error-circular-org';
import { CircularOrg } from './circular-org';
export interface RestApiResponseCircularOrg {
  error?: ApiErrorCircularOrg;
  result?: CircularOrg;
  status?: boolean;
}

