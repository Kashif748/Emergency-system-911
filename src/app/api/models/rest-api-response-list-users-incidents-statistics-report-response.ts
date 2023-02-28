/* tslint:disable */
/* eslint-disable */
import { ApiErrorListUsersIncidentsStatisticsReportResponse } from './api-error-list-users-incidents-statistics-report-response';
import { UsersIncidentsStatisticsReportResponse } from './users-incidents-statistics-report-response';
export interface RestApiResponseListUsersIncidentsStatisticsReportResponse {
  error?: ApiErrorListUsersIncidentsStatisticsReportResponse;
  result?: Array<UsersIncidentsStatisticsReportResponse>;
  status?: boolean;
}

