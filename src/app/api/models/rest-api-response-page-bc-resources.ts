/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageBcResources } from './api-error-page-bc-resources';
import { PageBcResources } from './page-bc-resources';
export interface RestApiResponsePageBcResources {
  error?: ApiErrorPageBcResources;
  result?: PageBcResources;
  status?: boolean;
}

