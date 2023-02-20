/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageOperationalReportProjection } from './api-error-page-operational-report-projection';
import { PageOperationalReportProjection } from './page-operational-report-projection';
export interface RestApiResponsePageOperationalReportProjection {
  error?: ApiErrorPageOperationalReportProjection;
  result?: PageOperationalReportProjection;
  status?: boolean;
}

