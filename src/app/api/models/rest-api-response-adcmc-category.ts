/* tslint:disable */
/* eslint-disable */
import { AdcmcCategory } from './adcmc-category';
import { ApiErrorAdcmcCategory } from './api-error-adcmc-category';
export interface RestApiResponseAdcmcCategory {
  error?: ApiErrorAdcmcCategory;
  result?: AdcmcCategory;
  status?: boolean;
}

