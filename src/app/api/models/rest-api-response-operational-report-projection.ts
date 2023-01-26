/* tslint:disable */
/* eslint-disable */
import { ApiErrorOperationalReportProjection } from './api-error-operational-report-projection';
import { OperationalReportProjection } from './operational-report-projection';
export interface RestApiResponseOperationalReportProjection {
  error?: ApiErrorOperationalReportProjection;
  result?: OperationalReportProjection;
  status?: boolean;
}

