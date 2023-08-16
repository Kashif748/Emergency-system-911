/* tslint:disable */
/* eslint-disable */
import { ApiErrorListBcActivityAnalysisWorkflow } from './api-error-list-bc-activity-analysis-workflow';
import { BcActivityAnalysisWorkflow } from './bc-activity-analysis-workflow';
export interface RestApiResponseListBcActivityAnalysisWorkflow {
  error?: ApiErrorListBcActivityAnalysisWorkflow;
  result?: Array<BcActivityAnalysisWorkflow>;
  status?: boolean;
}

