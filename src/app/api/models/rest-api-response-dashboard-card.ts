/* tslint:disable */
/* eslint-disable */
import { ApiErrorDashboardCard } from './api-error-dashboard-card';
import { DashboardCard } from './dashboard-card';
export interface RestApiResponseDashboardCard {
  error?: ApiErrorDashboardCard;
  result?: DashboardCard;
  status?: boolean;
}

