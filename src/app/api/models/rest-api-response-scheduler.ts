/* tslint:disable */
/* eslint-disable */
import { ApiErrorScheduler } from './api-error-scheduler';
import { Scheduler } from './scheduler';
export interface RestApiResponseScheduler {
  error?: ApiErrorScheduler;
  result?: Scheduler;
  status?: boolean;
}

