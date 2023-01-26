/* tslint:disable */
/* eslint-disable */
import { AdcdReportResponse } from './adcd-report-response';
import { ApiErrorListAdcdReportResponse } from './api-error-list-adcd-report-response';
export interface RestApiResponseListAdcdReportResponse {
  error?: ApiErrorListAdcdReportResponse;
  result?: Array<AdcdReportResponse>;
  status?: boolean;
}

