/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageBaseLibraryProjection } from './api-error-page-base-library-projection';
import { PageBaseLibraryProjection } from './page-base-library-projection';
export interface RestApiResponsePageBaseLibraryProjection {
  error?: ApiErrorPageBaseLibraryProjection;
  result?: PageBaseLibraryProjection;
  status?: boolean;
}

