/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageCorrespondenceTo } from './api-error-page-correspondence-to';
import { PageCorrespondenceTo } from './page-correspondence-to';
export interface RestApiResponsePageCorrespondenceTo {
  error?: ApiErrorPageCorrespondenceTo;
  result?: PageCorrespondenceTo;
  status?: boolean;
}

