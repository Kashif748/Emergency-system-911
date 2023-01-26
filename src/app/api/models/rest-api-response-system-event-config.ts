/* tslint:disable */
/* eslint-disable */
import { ApiErrorSystemEventConfig } from './api-error-system-event-config';
import { SystemEventConfig } from './system-event-config';
export interface RestApiResponseSystemEventConfig {
  error?: ApiErrorSystemEventConfig;
  result?: SystemEventConfig;
  status?: boolean;
}

