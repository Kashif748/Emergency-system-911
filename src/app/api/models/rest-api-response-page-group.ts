/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageGroup } from './api-error-page-group';
import { PageGroup } from './page-group';
export interface RestApiResponsePageGroup {
  error?: ApiErrorPageGroup;
  result?: PageGroup;
  status?: boolean;
}

