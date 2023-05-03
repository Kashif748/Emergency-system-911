/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcLocationTypes } from './api-error-bc-location-types';
import { BcLocationTypes } from './bc-location-types';
export interface RestApiResponseBcLocationTypes {
  error?: ApiErrorBcLocationTypes;
  result?: BcLocationTypes;
  status?: boolean;
}

