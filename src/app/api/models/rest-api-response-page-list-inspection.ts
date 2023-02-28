/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageListInspection } from './api-error-page-list-inspection';
import { PageListInspection } from './page-list-inspection';
export interface RestApiResponsePageListInspection {
  error?: ApiErrorPageListInspection;
  result?: PageListInspection;
  status?: boolean;
}

