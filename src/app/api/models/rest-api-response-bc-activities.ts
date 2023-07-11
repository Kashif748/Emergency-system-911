/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcActivities } from './api-error-bc-activities';
import { BcActivities } from './bc-activities';
export interface RestApiResponseBcActivities {
  error?: ApiErrorBcActivities;
  result?: BcActivities;
  status?: boolean;
}

