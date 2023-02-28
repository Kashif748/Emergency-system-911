/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageAssetsGroup } from './api-error-page-assets-group';
import { PageAssetsGroup } from './page-assets-group';
export interface RestApiResponsePageAssetsGroup {
  error?: ApiErrorPageAssetsGroup;
  result?: PageAssetsGroup;
  status?: boolean;
}

