/* tslint:disable */
/* eslint-disable */
import { ApiErrorHospital } from './api-error-hospital';
import { Hospital } from './hospital';
export interface RestApiResponseHospital {
  error?: ApiErrorHospital;
  result?: Hospital;
  status?: boolean;
}

