/* tslint:disable */
/* eslint-disable */
import { ApiErrorShiftConfiguration } from './api-error-shift-configuration';
import { ShiftConfiguration } from './shift-configuration';
export interface RestApiResponseShiftConfiguration {
  error?: ApiErrorShiftConfiguration;
  result?: ShiftConfiguration;
  status?: boolean;
}

