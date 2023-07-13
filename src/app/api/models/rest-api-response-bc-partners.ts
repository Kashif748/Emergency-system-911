/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcPartners } from './api-error-bc-partners';
import { BcPartners } from './bc-partners';
export interface RestApiResponseBcPartners {
  error?: ApiErrorBcPartners;
  result?: BcPartners;
  status?: boolean;
}

