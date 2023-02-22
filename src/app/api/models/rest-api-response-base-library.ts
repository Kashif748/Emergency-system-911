/* tslint:disable */
/* eslint-disable */
import { ApiErrorBaseLibrary } from './api-error-base-library';
import { BaseLibrary } from './base-library';
export interface RestApiResponseBaseLibrary {
  error?: ApiErrorBaseLibrary;
  result?: BaseLibrary;
  status?: boolean;
}

