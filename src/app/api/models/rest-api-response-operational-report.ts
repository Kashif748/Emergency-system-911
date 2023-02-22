/* tslint:disable */
/* eslint-disable */
import { ApiErrorOperationalReport } from './api-error-operational-report';
import { OperationalReport } from './operational-report';
export interface RestApiResponseOperationalReport {
  error?: ApiErrorOperationalReport;
  result?: OperationalReport;
  status?: boolean;
}

