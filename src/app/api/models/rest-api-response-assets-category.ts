/* tslint:disable */
/* eslint-disable */
import { ApiErrorAssetsCategory } from './api-error-assets-category';
import { AssetsCategory } from './assets-category';
export interface RestApiResponseAssetsCategory {
  error?: ApiErrorAssetsCategory;
  result?: AssetsCategory;
  status?: boolean;
}

