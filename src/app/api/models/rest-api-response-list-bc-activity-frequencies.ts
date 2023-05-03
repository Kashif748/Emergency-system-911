/* tslint:disable */
/* eslint-disable */
import { ApiErrorListBcActivityFrequencies } from './api-error-list-bc-activity-frequencies';
import { BcActivityFrequencies } from './bc-activity-frequencies';
export interface RestApiResponseListBcActivityFrequencies {
  error?: ApiErrorListBcActivityFrequencies;
  result?: Array<BcActivityFrequencies>;
  status?: boolean;
}

