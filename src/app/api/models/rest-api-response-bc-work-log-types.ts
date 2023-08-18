/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcWorkLogTypes } from './api-error-bc-work-log-types';
import { BcWorkLogTypes } from './bc-work-log-types';
export interface RestApiResponseBcWorkLogTypes {
  error?: ApiErrorBcWorkLogTypes;
  result?: BcWorkLogTypes;
  status?: boolean;
}

