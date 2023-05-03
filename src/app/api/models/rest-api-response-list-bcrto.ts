/* tslint:disable */
/* eslint-disable */
import { ApiErrorListBcrto } from './api-error-list-bcrto';
import { Bcrto } from './bcrto';
export interface RestApiResponseListBcrto {
  error?: ApiErrorListBcrto;
  result?: Array<Bcrto>;
  status?: boolean;
}

