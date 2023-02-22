/* tslint:disable */
/* eslint-disable */
import { ApiErrorListDashboardData } from './api-error-list-dashboard-data';
import { DashboardData } from './dashboard-data';
export interface RestApiResponseListDashboardData {
  error?: ApiErrorListDashboardData;
  result?: Array<DashboardData>;
  status?: boolean;
}

