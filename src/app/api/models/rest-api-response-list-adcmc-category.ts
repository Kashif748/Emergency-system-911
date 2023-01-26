/* tslint:disable */
/* eslint-disable */
import { AdcmcCategory } from './adcmc-category';
import { ApiErrorListAdcmcCategory } from './api-error-list-adcmc-category';
export interface RestApiResponseListAdcmcCategory {
  error?: ApiErrorListAdcmcCategory;
  result?: Array<AdcmcCategory>;
  status?: boolean;
}

