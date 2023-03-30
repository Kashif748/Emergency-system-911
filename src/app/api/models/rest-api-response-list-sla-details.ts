/* tslint:disable */
/* eslint-disable */
import { ApiErrorListSlaDetails } from './api-error-list-sla-details';
import { SlaDetails } from './sla-details';
export interface RestApiResponseListSlaDetails {
  error?: ApiErrorListSlaDetails;
  result?: Array<SlaDetails>;
  status?: boolean;
}

