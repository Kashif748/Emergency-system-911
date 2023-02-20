/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageSlaDetails } from './api-error-page-sla-details';
import { PageSlaDetails } from './page-sla-details';
export interface RestApiResponsePageSlaDetails {
  error?: ApiErrorPageSlaDetails;
  result?: PageSlaDetails;
  status?: boolean;
}

