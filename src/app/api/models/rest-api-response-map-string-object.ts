/* tslint:disable */
/* eslint-disable */
import { ApiErrorMapStringObject } from './api-error-map-string-object';
export interface RestApiResponseMapStringObject {
  error?: ApiErrorMapStringObject;
  result?: { [key: string]: {  } };
  status?: boolean;
}

