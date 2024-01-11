/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageObject } from './api-error-page-object';
import { PageObject } from './page-object';
export interface RestApiResponsePageObject {
  error?: ApiErrorPageObject;
  result?: PageObject;
  status?: boolean;
}

