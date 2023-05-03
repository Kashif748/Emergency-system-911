/* tslint:disable */
/* eslint-disable */
import { ApiErrorListBcVersions } from './api-error-list-bc-versions';
import { BcVersions } from './bc-versions';
export interface RestApiResponseListBcVersions {
  error?: ApiErrorListBcVersions;
  result?: Array<BcVersions>;
  status?: boolean;
}

