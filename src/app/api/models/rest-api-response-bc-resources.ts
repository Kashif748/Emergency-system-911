/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcResources } from './api-error-bc-resources';
import { BcResources } from './bc-resources';
export interface RestApiResponseBcResources {
  error?: ApiErrorBcResources;
  result?: BcResources;
  status?: boolean;
}

