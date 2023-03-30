/* tslint:disable */
/* eslint-disable */
import { ApiErrorListUsersTaskStaticsReportResponse } from './api-error-list-users-task-statics-report-response';
import { UsersTaskStaticsReportResponse } from './users-task-statics-report-response';
export interface RestApiResponseListUsersTaskStaticsReportResponse {
  error?: ApiErrorListUsersTaskStaticsReportResponse;
  result?: Array<UsersTaskStaticsReportResponse>;
  status?: boolean;
}

