/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcAnalysisStatus } from './api-error-bc-analysis-status';
import { BcAnalysisStatus } from './bc-analysis-status';
export interface RestApiResponseBcAnalysisStatus {
  error?: ApiErrorBcAnalysisStatus;
  result?: BcAnalysisStatus;
  status?: boolean;
}

