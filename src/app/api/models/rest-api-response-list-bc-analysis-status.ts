/* tslint:disable */
/* eslint-disable */
import { ApiErrorListBcAnalysisStatus } from './api-error-list-bc-analysis-status';
import { BcAnalysisStatus } from './bc-analysis-status';
export interface RestApiResponseListBcAnalysisStatus {
  error?: ApiErrorListBcAnalysisStatus;
  result?: Array<BcAnalysisStatus>;
  status?: boolean;
}

