/* tslint:disable */
/* eslint-disable */
import { ApiErrorSlaDetails } from './api-error-sla-details';
import { SlaDetails } from './sla-details';
export interface RestApiResponseSlaDetails {
  error?: ApiErrorSlaDetails;
  result?: SlaDetails;
  status?: boolean;
}

