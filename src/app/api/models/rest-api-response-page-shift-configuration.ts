/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageShiftConfiguration } from './api-error-page-shift-configuration';
import { PageShiftConfiguration } from './page-shift-configuration';
export interface RestApiResponsePageShiftConfiguration {
  error?: ApiErrorPageShiftConfiguration;
  result?: PageShiftConfiguration;
  status?: boolean;
}

