/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcResourcesRecords } from './api-error-bc-resources-records';
import { BcResourcesRecords } from './bc-resources-records';
export interface RestApiResponseBcResourcesRecords {
  error?: ApiErrorBcResourcesRecords;
  result?: BcResourcesRecords;
  status?: boolean;
}

