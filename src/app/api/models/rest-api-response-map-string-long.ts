/* tslint:disable */
/* eslint-disable */
import { ApiErrorMapStringLong } from './api-error-map-string-long';
export interface RestApiResponseMapStringLong {
  error?: ApiErrorMapStringLong;
  result?: { [key: string]: number };
  status?: boolean;
}

