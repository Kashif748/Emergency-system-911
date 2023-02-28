/* tslint:disable */
/* eslint-disable */
import { ApiErrorListMapStringObject } from './api-error-list-map-string-object';
export interface RestApiResponseListMapStringObject {
  error?: ApiErrorListMapStringObject;
  result?: Array<{ [key: string]: {  } }>;
  status?: boolean;
}

