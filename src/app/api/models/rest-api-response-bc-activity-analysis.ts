/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcActivityAnalysis } from './api-error-bc-activity-analysis';
import { BcActivityAnalysis } from './bc-activity-analysis';
export interface RestApiResponseBcActivityAnalysis {
  error?: ApiErrorBcActivityAnalysis;
  result?: BcActivityAnalysis;
  status?: boolean;
}

