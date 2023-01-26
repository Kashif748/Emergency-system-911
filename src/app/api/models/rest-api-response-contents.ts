/* tslint:disable */
/* eslint-disable */
import { ApiErrorContents } from './api-error-contents';
import { Contents } from './contents';
export interface RestApiResponseContents {
  error?: ApiErrorContents;
  result?: Contents;
  status?: boolean;
}

