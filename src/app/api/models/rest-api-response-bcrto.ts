/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcrto } from './api-error-bcrto';
import { Bcrto } from './bcrto';
export interface RestApiResponseBcrto {
  error?: ApiErrorBcrto;
  result?: Bcrto;
  status?: boolean;
}

