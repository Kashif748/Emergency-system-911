/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcAnalysisStatusDetails } from './api-error-bc-analysis-status-details';
import { BcAnalysisStatusDetails } from './bc-analysis-status-details';
export interface RestApiResponseBcAnalysisStatusDetails {
  error?: ApiErrorBcAnalysisStatusDetails;
  result?: BcAnalysisStatusDetails;
  status?: boolean;
}

