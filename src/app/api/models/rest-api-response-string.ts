/* tslint:disable */
/* eslint-disable */
import { ApiErrorString } from './api-error-string';
export interface RestApiResponseString {
  error?: ApiErrorString;
  result?: string;
  status?: boolean;
}

