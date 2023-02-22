/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageScheduler } from './api-error-page-scheduler';
import { PageScheduler } from './page-scheduler';
export interface RestApiResponsePageScheduler {
  error?: ApiErrorPageScheduler;
  result?: PageScheduler;
  status?: boolean;
}

