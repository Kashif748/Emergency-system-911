/* tslint:disable */
/* eslint-disable */
import { ApiErrorLibraryAccessType } from './api-error-library-access-type';
import { LibraryAccessType } from './library-access-type';
export interface RestApiResponseLibraryAccessType {
  error?: ApiErrorLibraryAccessType;
  result?: LibraryAccessType;
  status?: boolean;
}

