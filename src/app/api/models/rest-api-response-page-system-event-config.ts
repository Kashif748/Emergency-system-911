/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageSystemEventConfig } from './api-error-page-system-event-config';
import { PageSystemEventConfig } from './page-system-event-config';
export interface RestApiResponsePageSystemEventConfig {
  error?: ApiErrorPageSystemEventConfig;
  result?: PageSystemEventConfig;
  status?: boolean;
}

