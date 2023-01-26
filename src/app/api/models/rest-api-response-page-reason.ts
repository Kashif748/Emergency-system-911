/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageReason } from './api-error-page-reason';
import { PageReason } from './page-reason';
export interface RestApiResponsePageReason {
  error?: ApiErrorPageReason;
  result?: PageReason;
  status?: boolean;
}

