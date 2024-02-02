/* tslint:disable */
/* eslint-disable */
import { ApiErrorListCenterData } from './api-error-list-center-data';
import { CenterData } from './center-data';
export interface RestApiResponseListCenterData {
  error?: ApiErrorListCenterData;
  result?: Array<CenterData>;
  status?: boolean;
}

