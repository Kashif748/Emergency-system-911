/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcActivityAnalysisDtoWithStatus } from './api-error-bc-activity-analysis-dto-with-status';
import { BcActivityAnalysisDtoWithStatus } from './bc-activity-analysis-dto-with-status';
export interface RestApiResponseBcActivityAnalysisDtoWithStatus {
  error?: ApiErrorBcActivityAnalysisDtoWithStatus;
  result?: BcActivityAnalysisDtoWithStatus;
  status?: boolean;
}

