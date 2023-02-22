/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageHospital } from './api-error-page-hospital';
import { PageHospital } from './page-hospital';
export interface RestApiResponsePageHospital {
  error?: ApiErrorPageHospital;
  result?: PageHospital;
  status?: boolean;
}

