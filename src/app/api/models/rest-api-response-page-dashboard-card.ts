/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageDashboardCard } from './api-error-page-dashboard-card';
import { PageDashboardCard } from './page-dashboard-card';
export interface RestApiResponsePageDashboardCard {
  error?: ApiErrorPageDashboardCard;
  result?: PageDashboardCard;
  status?: boolean;
}

