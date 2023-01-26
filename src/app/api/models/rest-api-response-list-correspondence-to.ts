/* tslint:disable */
/* eslint-disable */
import { ApiErrorListCorrespondenceTo } from './api-error-list-correspondence-to';
import { CorrespondenceTo } from './correspondence-to';
export interface RestApiResponseListCorrespondenceTo {
  error?: ApiErrorListCorrespondenceTo;
  result?: Array<CorrespondenceTo>;
  status?: boolean;
}

