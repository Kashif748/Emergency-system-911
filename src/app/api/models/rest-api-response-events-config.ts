/* tslint:disable */
/* eslint-disable */
import { ApiErrorEventsConfig } from './api-error-events-config';
import { EventsConfig } from './events-config';
export interface RestApiResponseEventsConfig {
  error?: ApiErrorEventsConfig;
  result?: EventsConfig;
  status?: boolean;
}

