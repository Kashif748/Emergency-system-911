/* tslint:disable */
/* eslint-disable */
import { ApiErrorShift } from './api-error-shift';
import { Shift } from './shift';
export interface RestApiResponseShift {
  error?: ApiErrorShift;
  result?: Shift;
  status?: boolean;
}

