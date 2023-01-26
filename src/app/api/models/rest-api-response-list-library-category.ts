/* tslint:disable */
/* eslint-disable */
import { ApiErrorListLibraryCategory } from './api-error-list-library-category';
import { LibraryCategory } from './library-category';
export interface RestApiResponseListLibraryCategory {
  error?: ApiErrorListLibraryCategory;
  result?: Array<LibraryCategory>;
  status?: boolean;
}

