/* tslint:disable */
/* eslint-disable */
import { ApiErrorTaskMetricsDetails } from './api-error-task-metrics-details';
import { TaskMetricsDetails } from './task-metrics-details';
export interface RestApiResponseTaskMetricsDetails {
  error?: ApiErrorTaskMetricsDetails;
  result?: TaskMetricsDetails;
  status?: boolean;
}

