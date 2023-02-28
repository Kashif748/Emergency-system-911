/* tslint:disable */
/* eslint-disable */
import { ApiErrorTaskDashboard } from './api-error-task-dashboard';
import { TaskDashboard } from './task-dashboard';
export interface RestApiResponseTaskDashboard {
  error?: ApiErrorTaskDashboard;
  result?: TaskDashboard;
  status?: boolean;
}

