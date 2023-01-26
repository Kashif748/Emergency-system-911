/* tslint:disable */
/* eslint-disable */
import { ApiErrorOperationalReportStatus } from './api-error-operational-report-status';
import { OperationalReportStatus } from './operational-report-status';
export interface RestApiResponseOperationalReportStatus {
  error?: ApiErrorOperationalReportStatus;
  result?: OperationalReportStatus;
  status?: boolean;
}

