/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcLocations } from './api-error-bc-locations';
import { BcLocations } from './bc-locations';
export interface RestApiResponseBcLocations {
  error?: ApiErrorBcLocations;
  result?: BcLocations;
  status?: boolean;
}

