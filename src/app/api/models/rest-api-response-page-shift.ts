/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageShift } from './api-error-page-shift';
import { PageShift } from './page-shift';
export interface RestApiResponsePageShift {
  error?: ApiErrorPageShift;
  result?: PageShift;
  status?: boolean;
}

