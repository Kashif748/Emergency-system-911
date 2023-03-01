/* tslint:disable */
/* eslint-disable */
import { ApiErrorCity } from './api-error-city';
import { City } from './city';
export interface RestApiResponseCity {
  error?: ApiErrorCity;
  result?: City;
  status?: boolean;
}

