/* tslint:disable */
/* eslint-disable */
import { ApiErrorInterimIncident } from './api-error-interim-incident';
import { InterimIncident } from './interim-incident';
export interface RestApiResponseInterimIncident {
  error?: ApiErrorInterimIncident;
  result?: InterimIncident;
  status?: boolean;
}

