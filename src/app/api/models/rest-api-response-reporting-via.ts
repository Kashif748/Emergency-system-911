/* tslint:disable */
/* eslint-disable */
import { ApiErrorReportingVia } from './api-error-reporting-via';
import { ReportingVia } from './reporting-via';
export interface RestApiResponseReportingVia {
  error?: ApiErrorReportingVia;
  result?: ReportingVia;
  status?: boolean;
}

