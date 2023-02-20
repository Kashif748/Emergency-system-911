/* tslint:disable */
/* eslint-disable */
import { ApiErrorCorrespondenceTo } from './api-error-correspondence-to';
import { CorrespondenceTo } from './correspondence-to';
export interface RestApiResponseCorrespondenceTo {
  error?: ApiErrorCorrespondenceTo;
  result?: CorrespondenceTo;
  status?: boolean;
}

