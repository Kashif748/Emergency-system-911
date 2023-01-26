/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageEventsConfig } from './api-error-page-events-config';
import { PageEventsConfig } from './page-events-config';
export interface RestApiResponsePageEventsConfig {
  error?: ApiErrorPageEventsConfig;
  result?: PageEventsConfig;
  status?: boolean;
}

