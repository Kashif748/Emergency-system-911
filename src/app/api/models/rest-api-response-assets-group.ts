/* tslint:disable */
/* eslint-disable */
import { ApiErrorAssetsGroup } from './api-error-assets-group';
import { AssetsGroup } from './assets-group';
export interface RestApiResponseAssetsGroup {
  error?: ApiErrorAssetsGroup;
  result?: AssetsGroup;
  status?: boolean;
}

