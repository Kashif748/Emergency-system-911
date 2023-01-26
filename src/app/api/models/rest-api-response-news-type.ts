/* tslint:disable */
/* eslint-disable */
import { ApiErrorNewsType } from './api-error-news-type';
import { NewsType } from './news-type';
export interface RestApiResponseNewsType {
  error?: ApiErrorNewsType;
  result?: NewsType;
  status?: boolean;
}

