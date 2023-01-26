/* tslint:disable */
/* eslint-disable */
import { ApiErrorNews } from './api-error-news';
import { News } from './news';
export interface RestApiResponseNews {
  error?: ApiErrorNews;
  result?: News;
  status?: boolean;
}

