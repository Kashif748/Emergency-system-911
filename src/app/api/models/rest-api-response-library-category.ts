/* tslint:disable */
/* eslint-disable */
import { ApiErrorLibraryCategory } from './api-error-library-category';
import { LibraryCategory } from './library-category';
export interface RestApiResponseLibraryCategory {
  error?: ApiErrorLibraryCategory;
  result?: LibraryCategory;
  status?: boolean;
}

