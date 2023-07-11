/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcActivityLocations } from './api-error-bc-activity-locations';
import { BcActivityLocations } from './bc-activity-locations';
export interface RestApiResponseBcActivityLocations {
  error?: ApiErrorBcActivityLocations;
  result?: BcActivityLocations;
  status?: boolean;
}

