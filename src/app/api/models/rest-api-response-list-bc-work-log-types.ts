/* tslint:disable */
/* eslint-disable */
import { ApiErrorListBcWorkLogTypes } from './api-error-list-bc-work-log-types';
import { BcWorkLogTypes } from './bc-work-log-types';
export interface RestApiResponseListBcWorkLogTypes {
  error?: ApiErrorListBcWorkLogTypes;
  result?: Array<BcWorkLogTypes>;
  status?: boolean;
}

