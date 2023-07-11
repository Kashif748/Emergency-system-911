/* tslint:disable */
/* eslint-disable */
import { ApiErrorListBcActivityAnalysis } from './api-error-list-bc-activity-analysis';
import { BcActivityAnalysis } from './bc-activity-analysis';
export interface RestApiResponseListBcActivityAnalysis {
  error?: ApiErrorListBcActivityAnalysis;
  result?: Array<BcActivityAnalysis>;
  status?: boolean;
}

