/* tslint:disable */
/* eslint-disable */
import { ApiErrorListLibraryAccessType } from './api-error-list-library-access-type';
import { LibraryAccessType } from './library-access-type';
export interface RestApiResponseListLibraryAccessType {
  error?: ApiErrorListLibraryAccessType;
  result?: Array<LibraryAccessType>;
  status?: boolean;
}

