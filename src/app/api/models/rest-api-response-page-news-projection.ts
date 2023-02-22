/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageNewsProjection } from './api-error-page-news-projection';
import { PageNewsProjection } from './page-news-projection';
export interface RestApiResponsePageNewsProjection {
  error?: ApiErrorPageNewsProjection;
  result?: PageNewsProjection;
  status?: boolean;
}

