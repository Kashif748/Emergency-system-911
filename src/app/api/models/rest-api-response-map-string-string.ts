/* tslint:disable */
/* eslint-disable */
import { ApiErrorMapStringString } from './api-error-map-string-string';
export interface RestApiResponseMapStringString {
  error?: ApiErrorMapStringString;
  result?: { [key: string]: string };
  status?: boolean;
}

