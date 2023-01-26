/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageReportingVia } from './api-error-page-reporting-via';
import { PageReportingVia } from './page-reporting-via';
export interface RestApiResponsePageReportingVia {
  error?: ApiErrorPageReportingVia;
  result?: PageReportingVia;
  status?: boolean;
}

