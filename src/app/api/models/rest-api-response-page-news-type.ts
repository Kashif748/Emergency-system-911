/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageNewsType } from './api-error-page-news-type';
import { PageNewsType } from './page-news-type';
export interface RestApiResponsePageNewsType {
  error?: ApiErrorPageNewsType;
  result?: PageNewsType;
  status?: boolean;
}

